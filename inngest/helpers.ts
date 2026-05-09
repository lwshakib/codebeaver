import { env } from "@/lib/env";
import { Octokit } from "@octokit/rest";
import { App } from "octokit";
import { Pinecone as PineconeClient } from "@pinecone-database/pinecone";
import { generateEmbeddings } from "@/llm";
import prisma from "@/lib/prisma";
import { inngest } from "./client";

export const pinecone = new PineconeClient({
  apiKey: env.PINECONE_API_KEY!,
});

export const pineconeIndex = pinecone.Index(env.PINECONE_INDEX!);

/**
 * Gets a GitHub App installation token for the given installation ID.
 */
export async function getGitHubInstallationToken(installationId: string) {
  const app = new App({
    appId: env.GITHUB_APP_ID!,
    privateKey: env.GITHUB_APP_PRIVATE_KEY!,
  });

  const octokit = await app.getInstallationOctokit(Number(installationId));
  const { data } = await octokit.request("POST /app/installations/{installation_id}/access_tokens", {
    installation_id: Number(installationId),
  });

  return data.token;
}

/**
 * Generates an embedding vector for the given text.
 */
export async function generateEmbedding(text: string): Promise<number[]> {
  return generateEmbeddings(text);
}

/**
 * Recursively fetches all file contents from a GitHub repository.
 */
export const getRepoFileContents = async (
  token: string,
  owner: string,
  repo: string,
  path: string = ""
) => {
  const octokit = new Octokit({
    auth: token,
  });

  const { data } = await octokit.repos.getContent({
    owner,
    repo,
    path,
  });

  if (!Array.isArray(data)) {
    if (data.type === "file" && data.content) {
      return [
        {
          path: data.path,
          content: Buffer.from(data.content, "base64").toString("utf-8"),
        },
      ];
    }
    return [];
  }

  let files: { path: string; content: string }[] = [];

  for (const item of data) {
    if (item.type === "file") {
      const { data: fileData } = await octokit.repos.getContent({
        owner,
        repo,
        path: item.path,
      });
      if (
        !Array.isArray(fileData) &&
        fileData.type === "file" &&
        fileData.content
      ) {
        const BINARY_FILE_REGEX = /\.(png|jpe?g|gif|svg|ico|pdf|zip|tar|gz)$/i;

        if (!BINARY_FILE_REGEX.test(item.path)) {
          files.push({
            path: item.path,
            content: Buffer.from(fileData.content, "base64").toString("utf-8"),
          });
        }
      }
    } else if (item.type === "dir") {
      const subFiles = await getRepoFileContents(token, owner, repo, item.path);
      files = files.concat(subFiles);
    }
  }

  return files;
};

export type CodeFile = {
  path: string;
  content: string;
};

/**
 * Indexes a codebase in Pinecone.
 */
export async function indexCodebase(
  repoId: string,
  files: CodeFile[]
): Promise<void> {
  console.log(`Starting indexing for ${repoId} with ${files.length} files`);

  const vectors: any[] = [];

  const preparedFiles = files.map((file) => {
    const contentWithHeader = `File: ${file.path}\n\n${file.content}`;
    const truncatedContent = contentWithHeader.slice(0, 8000);
    return {
      path: file.path,
      truncatedContent,
    };
  });

  try {
    const allContents = preparedFiles.map((f) => f.truncatedContent);
    const results = await Promise.all(allContents.map(text => generateEmbeddings(text, "document")));

    results.forEach((embedding, index) => {
      const file = preparedFiles[index];
      vectors.push({
        id: `${repoId}-${file.path.replace(/\//g, "_")}`,
        values: embedding,
        metadata: {
          repoId,
          path: file.path,
          content: file.truncatedContent,
        },
      });
    });
  } catch (error) {
    console.error(`Failed to generate embeddings for codebase: ${repoId}`, error);
  }

  if (vectors.length > 0) {
    const batchSize = 100;

    for (let i = 0; i < vectors.length; i += batchSize) {
      const batch = vectors.slice(i, i + batchSize);
      try {
        await pineconeIndex.upsert({ records: batch });
      } catch (error) {
        console.error(`Failed to upsert batch starting at index ${i}`, error);
        throw error;
      }
    }

    console.log(`Successfully indexed ${vectors.length} files for ${repoId}`);
  }
}

/**
 * Retrieves relevant code context from Pinecone.
 */
export async function retrieveContext(
  query: string,
  repoId: string,
  topK: number = 5
): Promise<string[]> {
  const embedding = await generateEmbedding(query);

  const results = await pineconeIndex.query({
    vector: embedding,
    filter: { repoId },
    topK,
    includeMetadata: true,
  });

  return results.matches
    .map((match) => match.metadata?.content as string | undefined)
    .filter((content): content is string => Boolean(content));
}

export async function reviewPullRequest(
  owner: string,
  repo: string,
  prNumber: number,
  installationId?: number
) {
  try {
    const repository = await prisma.repository.findFirst({
      where: {
        owner,
        name: repo,
      },
      include: {
        user: {
          include: {
            accounts: {
              where: {
                providerId: "github",
              },
            },
          },
        },
      },
    });

    let userId: string;
    let githubInstallationId: string | null = null;
    let githubAccount: any = null;

    if (!repository) {
      // Auto-discovery: find user by installation ID if repo is not in DB
      if (!installationId) {
        throw new Error(`Repository ${owner}/${repo} not found in database and no installation ID provided.`);
      }

      const user = await prisma.user.findFirst({
        where: {
          githubInstallationId: String(installationId),
        },
        include: {
          accounts: {
            where: {
              providerId: "github",
            },
          },
        },
      });

      if (!user) {
        throw new Error(`No user found for installation ID ${installationId}. Please ensure you have signed up.`);
      }

      userId = user.id;
      githubInstallationId = user.githubInstallationId;
      githubAccount = user.accounts[0];
    } else {
      userId = repository.userId;
      githubInstallationId = repository.user.githubInstallationId;
      githubAccount = repository.user.accounts[0];
    }

    let token: string | undefined;

    if (githubInstallationId) {
      token = await getGitHubInstallationToken(githubInstallationId);
    } else {
      token = githubAccount?.accessToken || undefined;
    }

    if (!token) {
      throw new Error("No GitHub access token or installation ID found");
    }

    await inngest.send({
      name: "pr.review.requested",
      data: {
        owner,
        repository: repo,
        prNumber,
        userId,
      },
    });

    return {
      success: true,
      message: "Review queued",
    };
  } catch (error) {
    console.error("Error in reviewPullRequest helper:", error);
    throw error;
  }
}

export async function getPullRequestDiff(
  token: string,
  owner: string,
  repo: string,
  prNumber: number
) {
  const octokit = new Octokit({
    auth: token,
  });

  const { data: pullRequest } = await octokit.pulls.get({
    owner,
    repo,
    pull_number: prNumber,
  });

  const { data: diff } = await octokit.request(
    "GET /repos/{owner}/{repo}/pulls/{pull_number}",
    {
      owner,
      repo,
      pull_number: prNumber,
      headers: {
        accept: "application/vnd.github.v3.diff",
      },
    }
  );

  return {
    title: pullRequest.title,
    diff: diff as unknown as string,
    description: pullRequest.body ?? "",
    sha: pullRequest.head.sha,
  };
}

export async function postPullRequestComment(
  token: string,
  owner: string,
  repo: string,
  prNumber: number,
  comment: string
) {
  const octokit = new Octokit({
    auth: token,
  });

  await octokit.issues.createComment({
    owner,
    repo,
    issue_number: prNumber,
    body: comment,
  });
}

export async function createPullRequestReview(
  token: string,
  owner: string,
  repo: string,
  prNumber: number,
  commitId: string,
  body: string,
  comments: { path: string; line: number; start_line?: number; start_side?: string; body: string }[]
) {
  const octokit = new Octokit({
    auth: token,
  });

  try {
    await octokit.rest.pulls.createReview({
      owner,
      repo,
      pull_number: prNumber,
      commit_id: commitId,
      body,
      event: "COMMENT",
      comments: comments.map((c) => {
        const payload: any = {
          path: c.path,
          line: c.line,
          body: c.body,
          side: "RIGHT",
        };
        if (c.start_line) {
          payload.start_line = c.start_line;
          payload.start_side = c.start_side || "RIGHT";
        }
        return payload;
      }),
    });
  } catch (error) {
    console.error("Failed to create batched review. Falling back to summary only.", error);
    // If the batched review fails (likely due to line number mismatches), post the summary as a comment at least.
    await postPullRequestComment(token, owner, repo, prNumber, `${body}\n\n*(Note: Some inline comments could not be posted due to line mapping issues)*`);
  }
}

export async function updatePullRequestDescription(
  token: string,
  owner: string,
  repo: string,
  prNumber: number,
  body: string
) {
  const octokit = new Octokit({
    auth: token,
  });

  await octokit.pulls.update({
    owner,
    repo,
    pull_number: prNumber,
    body,
  });
}

/**
 * Injects explicit line numbers into a raw unified diff.
 * This helps the LLM accurately target lines for inline comments and code suggestions.
 */
export function injectLineNumbersIntoDiff(rawDiff: string): string {
  const lines = rawDiff.split("\n");
  let currentLineNumber = 0;
  let result: string[] = [];

  for (const line of lines) {
    if (line.startsWith("@@ ")) {
      const match = line.match(/@@ -\d+(?:,\d+)? \+(\d+)(?:,\d+)? @@/);
      if (match) {
        currentLineNumber = parseInt(match[1], 10);
      }
      result.push(line);
    } else if (line.startsWith("---") || line.startsWith("+++")) {
      result.push(line);
    } else if (line.startsWith("+")) {
      result.push(`[Line ${currentLineNumber}] ${line}`);
      currentLineNumber++;
    } else if (line.startsWith("-")) {
      result.push(line);
    } else if (line.startsWith(" ") || line === "") {
      result.push(`[Line ${currentLineNumber}] ${line}`);
      currentLineNumber++;
    } else {
      result.push(line);
    }
  }

  return result.join("\n");
}

