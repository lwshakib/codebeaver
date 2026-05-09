import { reviewPullRequest } from "@/inngest/helpers";
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

      // Trigger review when PR is opened or updated
      if (action === "opened" || action === "synchronize") {
        console.log(`Triggering review for ${repoFullName} #${prNumber}`);
        
        const installationId = body.installation?.id;
        
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
