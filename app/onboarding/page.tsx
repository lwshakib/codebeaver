"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import { toast } from "sonner";
import { Loader2, Check, ArrowRight } from "lucide-react";
import Image from "next/image";
import { completeOnboarding } from "./actions";

export default function OnboardingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session, isPending, refetch } = authClient.useSession();
  
  const [isInstalling, setIsInstalling] = useState(false);
  
  const user = session?.user as any;
  const installationId = searchParams.get("installation_id");

  // If we have an installation_id, it means the user just came back from GitHub
  useEffect(() => {
    const finishSetup = async () => {
      if (installationId && user && !user.onboardingCompleted) {
        try {
          await completeOnboarding(installationId);
          await refetch();
          toast.success("GitHub connected successfully!");
          router.push("/dashboard");
        } catch (error) {
          console.error("Failed to finish onboarding:", error);
          toast.error("Failed to complete setup.");
        }
      }
    };
    finishSetup();
  }, [installationId, user, router, refetch]);

  // Redirect if already onboarded
  useEffect(() => {
    if (!isPending && user?.onboardingCompleted) {
      router.push("/dashboard");
    }
  }, [session, isPending, router, user]);

  const handleConnectApp = () => {
    setIsInstalling(true);
    // GitHub App installation URL
    const githubAppUrl = `https://github.com/apps/code-beaver-ai/installations/new`;
    window.location.href = githubAppUrl;
  };

  if (isPending || (installationId && !user?.onboardingCompleted)) {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center bg-background gap-4">
        <Loader2 className="size-8 animate-spin text-primary" />
        <p className="text-sm font-medium text-muted-foreground animate-pulse">Completing setup...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md space-y-8 text-center">
        {/* Logo */}
        <div className="mx-auto w-16 h-16 rounded-2xl flex items-center justify-center mb-8 border border-border bg-white shadow-sm overflow-hidden p-3 relative">
          <Image 
            src="/logo.webp" 
            alt="CodeBeaver Logo" 
            fill
            className="object-contain p-2"
          />
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Welcome to CodeBeaver</h1>
          <p className="text-muted-foreground">The AI Senior Engineer for your development team.</p>
        </div>

        <div className="bg-card border border-border p-8 rounded-3xl shadow-sm space-y-8 text-left">
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Get started in seconds</h2>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="bg-primary/10 text-primary size-8 rounded-xl flex items-center justify-center font-bold shrink-0">1</div>
                <div className="space-y-1">
                    <p className="text-sm font-semibold">Install GitHub App</p>
                    <p className="text-xs text-muted-foreground">Authorize CodeBeaver to access your repositories.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="bg-primary/10 text-primary size-8 rounded-xl flex items-center justify-center font-bold shrink-0">2</div>
                <div className="space-y-1">
                    <p className="text-sm font-semibold">That&apos;s it!</p>
                    <p className="text-xs text-muted-foreground">We&apos;ll automatically index and review every new PR.</p>
                </div>
              </div>
            </div>
          </div>

          <Button 
            onClick={handleConnectApp} 
            disabled={isInstalling}
            className="w-full h-14 rounded-2xl text-lg font-bold shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            {isInstalling ? <Loader2 className="mr-2 size-5 animate-spin" /> : <Icon icon="mdi:github" className="mr-2 size-6" />}
            Connect GitHub
          </Button>
        </div>

        <div className="flex items-center justify-center gap-6 text-xs text-muted-foreground pt-8 font-medium">
          <div className="flex items-center gap-1.5">
            <Check className="size-3 text-primary" />
            AI-Powered
          </div>
          <div className="flex items-center gap-1.5">
            <Check className="size-3 text-primary" />
            Zero Configuration
          </div>
          <div className="flex items-center gap-1.5">
            <Check className="size-3 text-primary" />
            Secure
          </div>
        </div>
      </div>
    </div>
  );
}
