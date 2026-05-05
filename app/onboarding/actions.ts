"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import prisma from "@/lib/prisma";
import { Octokit } from "octokit";

export async function completeOnboarding(installationId?: string | null) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) throw new Error("Unauthorized");

  await prisma.user.update({
    where: { id: session.user.id },
    data: { 
      onboardingCompleted: true,
      githubInstallationId: installationId || undefined,
    },
  });

  return { success: true };
}
