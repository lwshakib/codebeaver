"use client"

import { Icon } from "@iconify/react"
import Link from "next/link"
import { authClient } from "@/lib/auth-client"

export default function SignUpPage() {
  return (
    <div className="space-y-10">
      <div className="text-center">
        <h2 className="text-2xl font-semibold tracking-tight text-white">
          Join CodeBeaver
        </h2>
        <p className="mt-2 text-sm font-medium text-zinc-500">
          Ship higher-quality code with automated reviews.
        </p>
      </div>

      <div className="space-y-4">
        {/* Social Grid */}
        <div className="grid grid-cols-2 gap-4">
          {/* GitHub */}
          <div className="relative">
            <button 
              onClick={async () => {
                await authClient.signIn.social({
                  provider: "github",
                  callbackURL: "/repositories",
                });
              }}
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900/50 px-4 py-3 text-xs font-semibold text-zinc-300 transition hover:bg-zinc-800 hover:text-white"
            >
              <Icon icon="logos:github-icon" className="h-4 w-4 invert" />
              GitHub
            </button>
          </div>
          
          {/* GitLab */}
          <div className="relative opacity-40 cursor-not-allowed">
            <button disabled className="flex w-full items-center justify-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900/20 px-4 py-3 text-xs font-semibold text-zinc-500">
              <Icon icon="logos:gitlab" className="h-4 w-4 grayscale" />
              GitLab
            </button>
          </div>

          {/* Bitbucket */}
          <div className="relative opacity-40 cursor-not-allowed">
            <button disabled className="flex w-full items-center justify-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900/20 px-4 py-3 text-xs font-semibold text-zinc-500">
              <Icon icon="logos:bitbucket" className="h-4 w-4 grayscale" />
              Bitbucket
            </button>
          </div>

          {/* AzureDevOps */}
          <div className="relative opacity-40 cursor-not-allowed">
            <button disabled className="flex w-full items-center justify-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900/20 px-4 py-3 text-xs font-semibold text-zinc-500">
              <Icon icon="logos:azure-icon" className="h-4 w-4 grayscale" />
              AzureDevOps
            </button>
          </div>
        </div>

        {/* SSO Button */}
        <button disabled className="flex w-full items-center justify-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900/20 px-4 py-3 text-xs font-semibold text-zinc-600 opacity-40 cursor-not-allowed">
          <Icon icon="lucide:key-round" className="h-4 w-4" />
          Single Sign-On
        </button>
      </div>

      <div className="text-center text-sm font-medium text-zinc-500">
        Already have an account?{" "}
        <Link 
          href="/sign-in" 
          className="text-zinc-100 underline underline-offset-4 transition hover:text-white"
        >
          Sign In
        </Link>
      </div>

      <div className="text-center text-[10px] font-medium leading-relaxed text-zinc-600">
        By signing up, you agree to the <a href="#" className="text-zinc-500 underline underline-offset-2">Terms of Use</a> and <a href="#" className="text-zinc-500 underline underline-offset-2">Privacy Policy</a> applicable to CodeBeaver.
      </div>
    </div>
  )
}
