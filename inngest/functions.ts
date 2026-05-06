import prisma from "@/lib/prisma";
import { inngest } from "./client";
import {
  getPullRequestDiff,
  getRepoFileContents,
  indexCodebase,
  postPullRequestComment,
  createPullRequestReview,
  retrieveContext,
  updatePullRequestDescription,
} from "./helpers";
import { 
  generateText, 
  generateObject, 
  PR_REVIEW_PROMPT, 
  PR_SUMMARY_PROMPT,
  PR_DESCRIPTION_PROMPT
} from "@/llm";
import { z } from "zod";

/**
 * Inngest function that indexes a GitHub repository when connected.
 */
export const indexRepoTask = inngest.createFunction(
  { 
    id: "index-repo",
    triggers: { event: "repository.connected" }
  },
  async ({ event, step }) => {
    const { repository, owner, userId } = event.data;

    const token = await step.run("get-token", async () => {
      const user = await prisma.user.findUnique({
        where: { id: userId },
      });

      let token: string | undefined;

      if (user?.githubInstallationId) {
        const { getGitHubInstallationToken } = await import("./helpers");
        token = await getGitHubInstallationToken(user.githubInstallationId);
      } else {
        const account = await prisma.account.findFirst({
          where: {
            userId,
            providerId: "github",
          },
        });
        token = account?.accessToken || undefined;
      }

      if (!token) {
        throw new Error("No GitHub access token or installation ID found");
      }

      return token;
    });

    // Webhooks are managed at the GitHub App level, no need to create them per-repo.
    return {
      success: true,
      repoId: `${owner}/${repository}`,
    };
  }
);

/**
 * Inngest function that generates an AI review for a pull request.
 */
export const generateReviewTask = inngest.createFunction(
  { 
    id: "generate-review", 
    concurrency: {
      limit: 5
    },
    triggers: { event: "pr.review.requested" }
  },
  async ({ event, step }) => {
    const { repository, owner, userId, prNumber } = event.data;
    
    const token = await step.run("get-token", async () => {
      const user = await prisma.user.findUnique({
        where: { id: userId },
      });

      let token: string | undefined;

      if (user?.githubInstallationId) {
        const { getGitHubInstallationToken } = await import("./helpers");
        token = await getGitHubInstallationToken(user.githubInstallationId);
      } else {
        const account = await prisma.account.findFirst({
          where: {
            userId,
            providerId: "github",
          },
        });
        token = account?.accessToken || undefined;
      }

      if (!token) {
        throw new Error("No GitHub access token or installation ID found");
      }

      return token;
    });

    await step.run("ensure-indexed", async () => {
      let dbRepo = await prisma.repository.findFirst({
        where: { owner, name: repository },
      });

      // 1. If repo doesn't exist in DB, we create it (Auto-Discovery)
      if (!dbRepo) {
        const repoResponse = await fetch(`https://api.github.com/repos/${owner}/${repository}`, {
          headers: { 
            Authorization: `Bearer ${token}`,
            "Accept": "application/vnd.github.v3+json",
            "User-Agent": "CodeBeaver-AI"
          }
        });
        
        if (!repoResponse.ok) {
          throw new Error(`Failed to fetch repo info: ${repoResponse.statusText}`);
        }
        
        const repoData = await repoResponse.json();
        
        dbRepo = await prisma.repository.create({
          data: {
            githubId: BigInt(repoData.id),
            name: repository,
            owner: owner,
            fullName: repoData.full_name,
            url: repoData.html_url,
            userId: userId,
            indexingStatus: "not_indexed",
          }
        });
      }

      // 2. Handle Indexing Status
      if (dbRepo.indexingStatus === "not_indexed") {
        // Mark as indexing immediately to prevent race conditions
        await prisma.repository.update({
          where: { id: dbRepo.id },
          data: { indexingStatus: "indexing" }
        });

        try {
          const files = await getRepoFileContents(token, owner, repository);
          await indexCodebase(`${owner}/${repository}`, files);
          
          await prisma.repository.update({
            where: { id: dbRepo.id },
            data: { indexingStatus: "indexed" }
          });
        } catch (error) {
          // Reset to not_indexed on failure so we can try again later
          await prisma.repository.update({
            where: { id: dbRepo.id },
            data: { indexingStatus: "not_indexed" }
          });
          throw error;
        }
      } else if (dbRepo.indexingStatus === "indexing") {
        // If it's already indexing, we throw an error to trigger a retry in Inngest
        // Inngest will automatically back off and retry later when it's likely finished
        throw new Error("Repository is currently being indexed. Retrying later...");
      }
    });

    const { diff, title, description, sha } = await step.run(
      "fetch-pr-data",
      async () => {
        return await getPullRequestDiff(
          token,
          owner,
          repository,
          prNumber
        );
      }
    );

    // If description is empty, generate and update it
    if (!description || description.trim() === "") {
      await step.run("generate-and-update-description", async () => {
        const { text: generatedDescription } = await generateText({
          systemInstruction: PR_DESCRIPTION_PROMPT,
          messages: [
            { 
              role: "user", 
              parts: [{ text: `PR Title: ${title}\n\nDiff:\n${diff}` }] 
            },
          ],
        });

        await updatePullRequestDescription(
          token,
          owner,
          repository,
          prNumber,
          generatedDescription
        );
      });
    }

    const context = await step.run("retrieve-context", async () => {
      const query = `${title}\n${description}`;
      return retrieveContext(query, `${owner}/${repository}`);
    });

    const finalContext = context.join("\n\n");

    const userPrompt = `
### PR Title
${title}

### PR Description
${description || "No description provided"}

---

### Context from Codebase (Main technical interactions)
${finalContext}

---

### Code Changes
${diff}
`;

    const summary = await step.run("generate-summary", async () => {
      const { text } = await generateText({
        systemInstruction: PR_SUMMARY_PROMPT,
        messages: [
          { role: "user", parts: [{ text: userPrompt }] },
        ],
      });
      return text;
    });

    await step.run("post-summary-comment", async () => {
      await postPullRequestComment(token, owner, repository, prNumber, summary);
    });

    const review = await step.run("generate-review-findings", async () => {
      const { object } = await generateObject({
        outputSchema: z.object({
          overview: z.string().describe("Concise high-level summary of the review findings."),
          findings: z.array(z.object({
            path: z.string().describe("File path."),
            line: z.number().describe("Line number in the final file version."),
            priority: z.enum(["High Priority", "Medium Priority", "Low Priority"]),
            explanation: z.string().describe("Description of the issue and its impact."),
            suggestion: z.string().describe("Recommended fix or solution.")
          }))
        }),
        systemInstruction: PR_REVIEW_PROMPT,
        messages: [
          { role: "user", parts: [{ text: userPrompt }] },
        ],
      });
      return object;
    });

    await step.run("post-review-feedback", async () => {
      const reviewBody = `# Code Review\n\n${review.overview}`;
      
      // Filter out findings that are missing required fields (path or line) to avoid 422 errors
      const validFindings = review.findings.filter((f: any) => f.path && f.line);

      const inlineComments = validFindings.map((f: any) => ({
        path: f.path,
        line: f.line,
        body: `**${f.priority}**\n\n${f.explanation}\n\n**Recommendation:**\n${f.suggestion}`,
      }));

      await createPullRequestReview(
        token,
        owner,
        repository,
        prNumber,
        sha,
        reviewBody,
        inlineComments
      );
    });

    await step.run("save-review-to-db", async () => {
      const dbRepo = await prisma.repository.findFirst({
        where: { owner, name: repository },
      });

      if (dbRepo) {
        await prisma.review.create({
          data: {
            repositoryId: dbRepo.id,
            prNumber,
            prTitle: title,
            prUrl: `https://github.com/${owner}/${repository}/pull/${prNumber}`,
            review: JSON.stringify(review),
            status: "completed",
          },
        });
      }
    });

    return { success: true };
  }
);