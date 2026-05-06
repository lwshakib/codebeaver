"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { authClient } from "@/lib/auth-client"
import { Button } from "@/components/ui/button"
import { Icon } from "@iconify/react"
import { toast } from "sonner"
import { Loader2, Check, ArrowRight } from "lucide-react"
import Image from "next/image"
import { completeOnboarding } from "./actions"

export default function OnboardingPage() {
  const router = useRouter()
  const { data: session, isPending, refetch } = authClient.useSession()

  const [isInstalling, setIsInstalling] = useState(false)
  const [installationId, setInstallationId] = useState<string | null>(null)

  const user = session?.user as any

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    setInstallationId(params.get("installation_id"))
  }, [])

  // If we have an installation_id, it means the user just came back from GitHub
  useEffect(() => {
    const finishSetup = async () => {
      if (installationId && user && !user.onboardingCompleted) {
        try {
          await completeOnboarding(installationId)
          await refetch()
          toast.success("GitHub connected successfully!")
          router.push("/dashboard")
        } catch (error) {
          console.error("Failed to finish onboarding:", error)
          toast.error("Failed to complete setup.")
        }
      }
    }
    finishSetup()
  }, [installationId, user, router, refetch])

  // Redirect if already onboarded
  useEffect(() => {
    if (!isPending && user?.onboardingCompleted) {
      router.push("/dashboard")
    }
  }, [session, isPending, router, user])

  const handleConnectApp = () => {
    setIsInstalling(true)
    // GitHub App installation URL
    const githubAppUrl = `https://github.com/apps/code-beaver-ai/installations/new`
    window.location.href = githubAppUrl
  }

  if (isPending || (installationId && !user?.onboardingCompleted)) {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center gap-4 bg-background">
        <Loader2 className="size-8 animate-spin text-primary" />
        <p className="animate-pulse text-sm font-medium text-muted-foreground">
          Completing setup...
        </p>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-6">
      <div className="w-full max-w-md space-y-8 text-center">
        {/* Logo */}
        <div className="relative mx-auto mb-8 flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl border border-border bg-white p-3 shadow-sm">
          <Image
            src="/logo.webp"
            alt="CodeBeaver Logo"
            fill
            className="object-contain p-2"
          />
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">
            Welcome to CodeBeaver
          </h1>
          <p className="text-muted-foreground">
            The AI Senior Engineer for your development team.
          </p>
        </div>

        <div className="space-y-8 rounded-3xl border border-border bg-card p-8 text-left shadow-sm">
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Get started in seconds</h2>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-primary/10 font-bold text-primary">
                  1
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-semibold">Install GitHub App</p>
                  <p className="text-xs text-muted-foreground">
                    Authorize CodeBeaver to access your repositories.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-primary/10 font-bold text-primary">
                  2
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-semibold">That&apos;s it!</p>
                  <p className="text-xs text-muted-foreground">
                    We&apos;ll automatically index and review every new PR.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <Button
            onClick={handleConnectApp}
            disabled={isInstalling}
            className="h-14 w-full rounded-2xl text-lg font-bold shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            {isInstalling ? (
              <Loader2 className="mr-2 size-5 animate-spin" />
            ) : (
              <Icon icon="mdi:github" className="mr-2 size-6" />
            )}
            Connect GitHub
          </Button>
        </div>

        <div className="flex items-center justify-center gap-6 pt-8 text-xs font-medium text-muted-foreground">
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
  )
}
