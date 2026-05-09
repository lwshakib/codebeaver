import { reviewPullRequest, getGitHubInstallationToken } from "@/inngest/helpers";
import { Octokit } from "@octokit/rest";
import { NextRequest, NextResponse } from "next/server";

/**
 * GitHub Webhook Handler.
 * Listens for events from GitHub and triggers the appropriate Inngest functions.
 */
export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const body = await req.json();
    const event = req.headers.get("x-github-event");
    const deliveryId = req.headers.get("x-github-delivery") || undefined;

    console.log(`Received GitHub event: ${event} (Delivery ID: ${deliveryId})`);

    // Handle initial handshake
    if (event === "ping") {
      return NextResponse.json({ message: "Pong" }, { status: 200 });
    }

    // Handle Pull Request events
    if (event === "pull_request") {
      const action = body.action;
      const repoFullName: string = body.repository.full_name;
      const prNumber: number = body.number;

      const [owner, repoName] = repoFullName.split("/");

      // Trigger review ONLY when PR is opened or reopened (Ensures "once per PR" flow)
      if (action === "opened" || action === "reopened") {
        console.log(`Triggering initial review for ${repoFullName} #${prNumber}`);
        
        const installationId = body.installation?.id;

        // Skip triggering Inngest if the latest commit was made by any bot
        if (installationId) {
          try {
            const token = await getGitHubInstallationToken(String(installationId));
            const octokit = new Octokit({ auth: token });
            const { data: commit } = await octokit.repos.getCommit({
              owner,
              repo: repoName,
              ref: body.pull_request.head.sha,
            });

            const authorLogin = commit.author?.login?.toLowerCase() || "";
            const authorType = commit.author?.type;
            const committerName = commit.commit.author?.name?.toLowerCase() || "";

            const isBot = authorType === "Bot" || 
                          authorLogin.endsWith("[bot]") || 
                          committerName.includes("[bot]");

            if (isBot) {
              console.log(`Skipping review for bot-authored commit on ${repoFullName} #${prNumber}`);
              return NextResponse.json({ message: "Skipping bot commit" }, { status: 200 });
            }
          } catch (error) {
            console.error("Error checking bot author in webhook:", error);
            // If check fails, we proceed with the review to be safe
          }
        }
        
        // We use the helper which sends an Inngest event
        await reviewPullRequest(owner, repoName, prNumber, installationId, deliveryId);
      }
    }

    // TODO: Handle 'push' events for incremental indexing if needed

    return NextResponse.json({ message: "Event processed" }, { status: 200 });
  } catch (error) {
    console.error("Error processing GitHub webhook:", error);

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
