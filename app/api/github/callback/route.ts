import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const installationId = searchParams.get("installation_id");
  const setupAction = searchParams.get("setup_action");

  if (!installationId) {
    return NextResponse.redirect(new URL("/onboarding?error=no_installation", req.url));
  }

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    // If no session, we might be in the middle of a flow. 
    // In a real app, we'd store the installationId in a cookie or state
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  // Update user with the installation ID
  await prisma.user.update({
    where: { id: session.user.id },
    data: { githubInstallationId: installationId },
  });

  // Redirect back to onboarding, moving to the next step
  return NextResponse.redirect(new URL("/onboarding?step=select-repo", req.url));
}
