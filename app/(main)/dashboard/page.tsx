import { getGithubStats } from "./actions";
import { Suspense } from "react";
import {
  ContributionActivity,
  ContributionActivitySkeleton,
} from "@/components/contribution-activity";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { Icon } from "@iconify/react";
import { authClient } from "@/lib/auth-client";

export default async function DashboardPage() {
  return (
    <div className="flex flex-1 flex-col pb-10">
      <div className="flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-8 py-4 md:gap-10 md:py-6">
          <Suspense fallback={<DashboardSkeleton />}>
            <GithubDashboardContent />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

async function GithubDashboardContent() {
  const githubStats = await getGithubStats();

  if (!githubStats) {
    return (
      <div className="mx-4 lg:mx-6 flex flex-col items-center justify-center p-12 text-center">
        <div className="bg-muted mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border-2 border-border shadow-sm">
          <Icon icon="mdi:github" className="h-8 w-8 text-foreground" />
        </div>
        <h3 className="text-2xl font-bold tracking-tight text-foreground">
          Connect GitHub to see your stats
        </h3>
        <p className="text-muted-foreground mt-2 mb-8 max-w-sm font-medium">
          Linking your GitHub account allows us to display your repository
          statistics and contribution activity.
        </p>
        <Button asChild className="gap-2 px-8 py-6 text-lg font-bold bg-primary text-primary-foreground hover:bg-primary/90 transition-all hover:scale-105 active:scale-95 shadow-xl">
          <a href="/sign-in">
            <Icon icon="mdi:github" className="h-6 w-6" />
            Connect GitHub Account
          </a>
        </Button>
      </div>
    );
  }

  return (
    <ContributionActivity
      calendar={githubStats.calendar}
      totalContributions={githubStats.totalContributions}
    />
  );
}

function DashboardSkeleton() {
  return (
    <div className="flex flex-col gap-8">
      <ContributionActivitySkeleton />
    </div>
  );
}
