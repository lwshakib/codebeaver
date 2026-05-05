'use client'

import { 
  Sparkles, 
  LayoutGrid, 
  FolderOpen, 
  MessageSquareMore, 
  Clock3, 
  Layers3, 
  FileText, 
  WandSparkles, 
  MessageCircleMore, 
  Rocket, 
  Sparkle, 
  MessageSquareQuote, 
  Send, 
  PenTool, 
  Image as ImageIcon, 
  Type, 
  FilePlus2, 
  ScanSearch, 
  MessageSquareHeart, 
  BadgeCheck, 
  Wand2, 
  Users, 
  Inbox, 
  ClipboardList, 
  Bot, 
  ImagePlus, 
  MessageSquareCode, 
  Plus,
  Bell,
  PlugZap,
  CalendarDays,
  Sun,
  Moon,
  Zap,
  Terminal,
  Cpu,
  GitPullRequest
} from "lucide-react"
import { Icon } from "@iconify/react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import Image from "next/image"

export default function LandingPage() {
  const { setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch
  useEffect(() => setMounted(true), [])

  return (
    <div className="bg-white dark:bg-zinc-950 text-zinc-950 dark:text-zinc-50 antialiased min-h-screen selection:bg-zinc-900 dark:selection:bg-zinc-100 selection:text-white dark:selection:text-zinc-950">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          <a href="#" className="flex items-center gap-3">
            <div className="relative size-7 overflow-hidden rounded-full bg-white dark:bg-zinc-900 shadow-sm">
              <Image 
                src="/logo.webp" 
                alt="CodeBeaver Logo" 
                fill 
                className="object-contain"
              />
            </div>
            <span className="text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-50">CodeBeaver</span>
          </a>

          <nav className="hidden items-center gap-8 md:flex">
            <a href="#product" className="text-sm font-medium text-zinc-500 dark:text-zinc-400 transition hover:text-zinc-900 dark:hover:text-zinc-50">Product</a>
            <a href="#workflow" className="text-sm font-medium text-zinc-500 dark:text-zinc-400 transition hover:text-zinc-900 dark:hover:text-zinc-50">Workflow</a>
            <a href="#features" className="text-sm font-medium text-zinc-500 dark:text-zinc-400 transition hover:text-zinc-900 dark:hover:text-zinc-50">Features</a>
            <a href="#faq" className="text-sm font-medium text-zinc-500 dark:text-zinc-400 transition hover:text-zinc-900 dark:hover:text-zinc-50">FAQ</a>
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-500 dark:text-zinc-400 shadow-sm transition hover:bg-zinc-50 dark:hover:bg-zinc-800"
              aria-label="Toggle theme"
            >
              {mounted && (resolvedTheme === "dark" ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              ))}
            </button>
            <a href="/sign-in" className="hidden rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-4 py-2 text-sm font-medium text-zinc-700 dark:text-zinc-300 shadow-sm transition hover:bg-zinc-50 dark:hover:bg-zinc-800 sm:inline-flex">Log in</a>
            <a href="/repositories" className="inline-flex rounded-full bg-zinc-950 dark:bg-zinc-50 px-4 py-2 text-sm font-medium text-white dark:text-zinc-950 shadow-sm transition hover:bg-zinc-800 dark:hover:bg-zinc-200">Start free</a>
          </div>
        </div>
      </header>

      <div className="relative overflow-hidden">

        <main className="relative z-10">
          {/* Hero Section */}
          <section className="mx-auto max-w-7xl px-6 pb-14 pt-10 lg:px-8 lg:pt-16">
            <div className="mx-auto max-w-4xl text-center">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white/90 dark:bg-zinc-900/90 px-3 py-1.5 shadow-sm backdrop-blur">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">Senior-Level AI Code Reviews</span>
              </div>
              <h1 className="text-5xl font-semibold tracking-tight text-zinc-950 dark:text-white sm:text-6xl lg:text-7xl">
                Reviews that feel
                <br className="hidden sm:block" />
                <span className="text-zinc-400">human-authored.</span>
              </h1>
              <p className="mx-auto mt-5 max-w-2xl text-lg font-normal leading-8 text-zinc-600 dark:text-zinc-400">
                CodeBeaver is your AI Senior Engineer. It indexes your codebase to understand complex interactions and provides precise, actionable feedback on every PR.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <a href="/repositories" className="inline-flex rounded-full bg-zinc-950 dark:bg-zinc-50 px-6 py-3 text-sm font-bold text-white dark:text-zinc-950 shadow-lg shadow-zinc-950/20 dark:shadow-zinc-50/10 transition hover:scale-105 active:scale-95">Get Started Free</a>
                <a href="#workflow" className="inline-flex rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-6 py-3 text-sm font-medium text-zinc-700 dark:text-zinc-300 shadow-sm transition hover:bg-zinc-50 dark:hover:bg-zinc-800">See how it works</a>
              </div>

              {/* Integrations Chips */}
              <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
                <div className="flex items-center gap-2 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white/90 dark:bg-zinc-900/90 px-3 py-2 shadow-sm">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800">
                    <Icon icon="logos:github-icon" className="h-4 w-4" />
                  </div>
                  <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">GitHub</span>
                </div>
                <div className="flex items-center gap-2 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white/90 dark:bg-zinc-900/90 px-3 py-2 shadow-sm">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800">
                    <Icon icon="logos:linear-icon" className="h-3.5 w-3.5" />
                  </div>
                  <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">Linear</span>
                </div>
                <div className="flex items-center gap-2 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white/90 dark:bg-zinc-900/90 px-3 py-2 shadow-sm">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800">
                    <Icon icon="logos:slack-icon" className="h-3.5 w-3.5" />
                  </div>
                  <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">Slack</span>
                </div>
                <div className="flex items-center gap-2 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white/90 dark:bg-zinc-900/90 px-3 py-2 shadow-sm">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800">
                    <Icon icon="logos:jira" className="h-3.5 w-3.5" />
                  </div>
                  <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">Jira</span>
                </div>
              </div>
            </div>

            {/* Mockup Dashboard */}
            <div className="relative mx-auto mt-14 max-w-6xl">
              <div className="absolute inset-x-10 -top-8 h-40 rounded-full bg-gradient-to-r from-emerald-200/50 via-sky-200/40 to-violet-200/50 blur-3xl opacity-50 dark:opacity-20"></div>
              <div className="relative overflow-hidden rounded-[2rem] border border-zinc-200 dark:border-zinc-800 bg-white/95 dark:bg-zinc-900/95 p-3 shadow-[0_20px_80px_-20px_rgba(0,0,0,0.15)] dark:shadow-[0_20px_80px_-20px_rgba(0,0,0,0.5)] backdrop-blur">
                <div className="overflow-hidden rounded-[1.5rem] border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950">
                  <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        <span className="h-2.5 w-2.5 rounded-full bg-rose-300"></span>
                        <span className="h-2.5 w-2.5 rounded-full bg-amber-300"></span>
                        <span className="h-2.5 w-2.5 rounded-full bg-emerald-300"></span>
                      </div>
                      <div className="hidden rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 px-3 py-1.5 text-sm font-medium text-zinc-500 dark:text-zinc-400 sm:block">CodeBeaver / codebeaver-main</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="hidden rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-3 py-1.5 text-sm font-medium text-zinc-500 dark:text-zinc-400 md:block">Search files...</div>
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
                        <Icon icon="mdi:bell-outline" className="h-4 w-4 text-zinc-500 dark:text-zinc-400" />
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-3 p-3 lg:grid-cols-[16rem_minmax(0,1fr)]">
                    {/* Sidebar Mockup */}
                    <aside className="rounded-[1.25rem] border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4">
                      <div className="mb-4 flex items-center gap-3">
                        <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-blue-400 to-indigo-400 p-0.5 shadow-sm overflow-hidden">
                          <Image src="/logo.webp" alt="Logo" width={40} height={40} className="object-cover" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-zinc-900 dark:text-white">Repo Index</div>
                          <div className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Synced 2m ago</div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between rounded-xl bg-zinc-950 dark:bg-zinc-50 px-3 py-2.5 text-white dark:text-zinc-950">
                          <div className="flex items-center gap-2">
                            <Icon icon="mdi:source-branch" className="h-4 w-4" />
                            <span className="text-sm font-medium">Pull Requests</span>
                          </div>
                          <span className="rounded-full bg-white/10 dark:bg-black/10 px-2 py-0.5 text-xs font-medium">12</span>
                        </div>
                        <div className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-zinc-600 dark:text-zinc-400 transition hover:bg-zinc-50 dark:hover:bg-zinc-800 cursor-pointer">
                          <Icon icon="mdi:code-tags" className="h-4 w-4" />
                          <span className="text-sm font-medium">Code Reviews</span>
                        </div>
                        <div className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-zinc-600 dark:text-zinc-400 transition hover:bg-zinc-50 dark:hover:bg-zinc-800 cursor-pointer">
                          <Icon icon="mdi:security" className="h-4 w-4" />
                          <span className="text-sm font-medium">Security</span>
                        </div>
                        <div className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-zinc-600 dark:text-zinc-400 transition hover:bg-zinc-50 dark:hover:bg-zinc-800 cursor-pointer">
                          <Icon icon="mdi:chart-timeline-variant" className="h-4 w-4" />
                          <span className="text-sm font-medium">Insights</span>
                        </div>
                      </div>

                      <div className="mt-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-gradient-to-br from-zinc-50 to-white dark:from-zinc-800 dark:to-zinc-900 p-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Indexing depth</span>
                          <span className="text-sm font-medium text-blue-600 dark:text-blue-400">98%</span>
                        </div>
                        <div className="mt-3 h-2 rounded-full bg-zinc-100 dark:bg-zinc-800">
                          <div className="h-2 w-[98%] rounded-full bg-gradient-to-r from-blue-400 to-indigo-400"></div>
                        </div>
                        <div className="mt-3 text-xs font-medium text-zinc-500 dark:text-zinc-400">Full semantic mapping complete</div>
                      </div>
                    </aside>

                    {/* Content Mockup */}
                    <div className="grid gap-3">
                      <div className="grid gap-3 lg:grid-cols-3">
                        <div className="rounded-[1.25rem] border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4">
                          <div className="flex items-start justify-between">
                            <div>
                              <div className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Reviews completed</div>
                              <div className="mt-1 text-3xl font-semibold tracking-tight text-zinc-950 dark:text-white">1,284</div>
                            </div>
                            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-50 dark:bg-blue-950/30">
                              <Icon icon="mdi:check-decagram" className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                            </div>
                          </div>
                          <div className="mt-5 flex items-end gap-1">
                            <span className="h-8 w-3 rounded-full bg-zinc-100 dark:bg-zinc-800"></span>
                            <span className="h-12 w-3 rounded-full bg-zinc-200 dark:bg-zinc-700"></span>
                            <span className="h-10 w-3 rounded-full bg-blue-300 dark:bg-blue-700"></span>
                            <span className="h-16 w-3 rounded-full bg-indigo-300 dark:bg-indigo-700"></span>
                            <span className="h-20 w-3 rounded-full bg-zinc-950 dark:bg-zinc-50"></span>
                            <span className="h-14 w-3 rounded-full bg-emerald-300 dark:bg-emerald-700"></span>
                          </div>
                        </div>

                        <div className="rounded-[1.25rem] border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4 lg:col-span-2">
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Review Pipeline</div>
                              <div className="mt-1 text-base font-medium text-zinc-900 dark:text-white">AI-driven analysis in real-time</div>
                            </div>
                            <div className="rounded-full border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 px-3 py-1 text-xs font-medium text-zinc-500 dark:text-zinc-400">Live</div>
                          </div>

                          <div className="relative mt-6 h-28 overflow-hidden rounded-2xl bg-[radial-gradient(circle_at_20%_50%,rgba(59,130,246,0.10),transparent_30%),radial-gradient(circle_at_80%_50%,rgba(168,85,247,0.10),transparent_30%),linear-gradient(to_right,rgba(24,24,27,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(24,24,27,0.05)_1px,transparent_1px)] dark:bg-[radial-gradient(circle_at_20%_50%,rgba(59,130,246,0.05),transparent_30%),radial-gradient(circle_at_80%_50%,rgba(168,85,247,0.05),transparent_30%),linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:auto,auto,2rem_2rem,2rem_2rem]">
                            <div className="absolute left-6 top-1/2 h-px w-20 -translate-y-1/2 bg-zinc-300 dark:bg-zinc-700"></div>
                            <div className="absolute left-24 top-1/2 h-px w-24 -translate-y-1/2 bg-blue-300 dark:bg-blue-800"></div>
                            <div className="absolute left-48 top-1/2 h-px w-24 -translate-y-1/2 bg-indigo-300 dark:bg-indigo-800"></div>
                            <div className="absolute right-8 top-1/2 h-px w-20 -translate-y-1/2 bg-emerald-300 dark:bg-emerald-800"></div>

                            <div className="absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm">
                              <Icon icon="mdi:git" className="h-4 w-4 text-zinc-700 dark:text-zinc-300" />
                            </div>
                            <div className="absolute left-24 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-2xl border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950 shadow-sm">
                              <Icon icon="mdi:robot-outline" className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div className="absolute left-52 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-2xl border border-indigo-200 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-950 shadow-sm">
                              <Icon icon="mdi:comment-quote-outline" className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                            </div>
                            <div className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-2xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950 shadow-sm">
                              <Icon icon="mdi:rocket-launch-outline" className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="grid gap-3 lg:grid-cols-[1.3fr_0.9fr]">
                        <div className="rounded-[1.25rem] border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Weekly Performance</div>
                              <div className="mt-1 text-base font-medium text-zinc-900 dark:text-white">Bug detection vs. False positives</div>
                            </div>
                            <div className="flex -space-x-2">
                              <div className="h-8 w-8 rounded-full border-2 border-white dark:border-zinc-900 bg-blue-300"></div>
                              <div className="h-8 w-8 rounded-full border-2 border-white dark:border-zinc-900 bg-indigo-300"></div>
                              <div className="h-8 w-8 rounded-full border-2 border-white dark:border-zinc-900 bg-emerald-300"></div>
                            </div>
                          </div>

                          <div className="mt-5 grid grid-cols-7 gap-2">
                            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
                              <div key={day} className={`rounded-2xl bg-zinc-50 dark:bg-zinc-950 p-2 text-center ${i === 3 ? 'ring-1 ring-zinc-950/5 dark:ring-white/5' : ''}`}>
                                <div className="text-xs font-medium text-zinc-400">{day}</div>
                                <div className="mt-2 flex h-16 items-center justify-center rounded-xl overflow-hidden">
                                  {i === 0 && <div className="h-full w-full border border-dashed border-zinc-200 dark:border-zinc-800 rounded-xl" />}
                                  {i === 1 && (
                                    <div className="flex h-full w-full items-end justify-center bg-gradient-to-t from-blue-100 to-white dark:from-blue-900/30 dark:to-zinc-950">
                                      <div className="mb-2 h-8 w-8 rounded-xl bg-blue-400/80"></div>
                                    </div>
                                  )}
                                  {i === 2 && (
                                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-t from-indigo-100 to-white dark:from-indigo-900/30 dark:to-zinc-950">
                                      <div className="h-8 w-8 rounded-xl bg-indigo-400/80"></div>
                                    </div>
                                  )}
                                  {i === 3 && (
                                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-t from-emerald-100 to-white dark:from-emerald-900/30 dark:to-zinc-950">
                                      <div className="grid grid-cols-2 gap-1">
                                        <div className="h-4 w-4 rounded-md bg-emerald-400"></div>
                                        <div className="h-4 w-4 rounded-md bg-blue-400"></div>
                                        <div className="h-4 w-4 rounded-md bg-indigo-400"></div>
                                        <div className="h-4 w-4 rounded-md bg-zinc-900 dark:bg-zinc-100"></div>
                                      </div>
                                    </div>
                                  )}
                                  {i === 4 && (
                                    <div className="flex h-full w-full items-end justify-center bg-gradient-to-t from-amber-100 to-white dark:from-amber-900/30 dark:to-zinc-950">
                                      <div className="mb-2 h-10 w-10 rounded-2xl border border-amber-200 dark:border-amber-800 bg-white dark:bg-zinc-900 shadow-sm"></div>
                                    </div>
                                  )}
                                  {i > 4 && <div className="h-full w-full border border-dashed border-zinc-200 dark:border-zinc-800 rounded-xl" />}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="rounded-[1.25rem] border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4">
                          <div className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Live Feedback</div>
                          <div className="mt-1 text-base font-medium text-zinc-900 dark:text-white">Actionable insights on every branch</div>

                          <div className="mt-5 space-y-3">
                            <div className="flex items-center gap-3 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 p-3">
                              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white dark:bg-zinc-900 shadow-sm">
                                <Icon icon="mdi:lightning-bolt" className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                              </div>
                              <div className="min-w-0">
                                <div className="text-sm font-medium text-zinc-900 dark:text-white">Security Vulnerability</div>
                                <div className="truncate text-xs font-medium text-zinc-500 dark:text-zinc-400">Potential SQL injection in auth.ts</div>
                              </div>
                            </div>
                            <div className="flex items-center gap-3 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 p-3">
                              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white dark:bg-zinc-900 shadow-sm">
                                <Icon icon="mdi:comment-text-multiple" className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                              </div>
                              <div className="min-w-0">
                                <div className="text-sm font-medium text-zinc-900 dark:text-white">Logic Suggestion</div>
                                <div className="truncate text-xs font-medium text-zinc-500 dark:text-zinc-400">Simplify loop in processor.go</div>
                              </div>
                            </div>
                            <div className="flex items-center gap-3 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 p-3">
                              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white dark:bg-zinc-900 shadow-sm">
                                <Icon icon="mdi:file-certificate" className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                              </div>
                              <div className="min-w-0">
                                <div className="text-sm font-medium text-zinc-900 dark:text-white">Standards Check</div>
                                <div className="truncate text-xs font-medium text-zinc-500 dark:text-zinc-400">Naming convention violations found</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section id="features" className="mx-auto max-w-7xl px-6 py-14 lg:px-8 lg:py-20">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-4xl font-semibold tracking-tight text-zinc-950 dark:text-white sm:text-5xl">Engineered for depth and precision</h2>
              <p className="mt-4 text-lg font-normal leading-8 text-zinc-600 dark:text-zinc-400">
                CodeBeaver doesn&apos;t just look at the diff. It understands your entire architecture to provide feedback that actually matters.
              </p>
            </div>

            <div className="mt-12 grid gap-4 lg:grid-cols-3">
              <div className="rounded-[2rem] border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 shadow-sm lg:col-span-1">
                <div className="rounded-[1.5rem] border border-zinc-200 dark:border-zinc-800 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.08),transparent_45%)] p-6">
                  <div className="relative mx-auto flex h-56 items-center justify-center overflow-hidden rounded-[1.5rem] bg-zinc-50 dark:bg-zinc-950">
                    <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(24,24,27,0.05)_1px,transparent_1px)] dark:bg-[radial-gradient(circle,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:1rem_1rem]"></div>
                    <div className="relative z-10 grid grid-cols-2 gap-4">
                      <div className="flex h-20 w-20 items-center justify-center rounded-[1.25rem] border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm">
                        <MessageSquareCode className="h-7 w-7 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div className="mt-8 flex h-20 w-20 items-center justify-center rounded-[1.25rem] border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm">
                        <Zap className="h-7 w-7 text-sky-600 dark:text-sky-400" />
                      </div>
                      <div className="-mt-6 flex h-20 w-20 items-center justify-center rounded-[1.25rem] border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm">
                        <ScanSearch className="h-7 w-7 text-emerald-600 dark:text-emerald-400" />
                      </div>
                      <div className="flex h-20 w-20 items-center justify-center rounded-[1.25rem] bg-zinc-950 dark:bg-zinc-50 shadow-sm">
                        <Sparkles className="h-7 w-7 text-white dark:text-zinc-950" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-5">
                  <h3 className="text-xl font-semibold text-zinc-950 dark:text-white">Contextual Intelligence</h3>
                  <p className="mt-2 text-base font-normal leading-7 text-zinc-600 dark:text-zinc-400">
                    We index your entire repository to understand how changes in one module affect the rest of your system.
                  </p>
                </div>
              </div>

              <div className="rounded-[2rem] border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 shadow-sm lg:col-span-2">
                <div className="rounded-[1.5rem] border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6">
                  <div className="relative h-56 overflow-hidden rounded-[1.5rem] bg-[linear-gradient(to_right,rgba(24,24,27,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(24,24,27,0.05)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:2rem_2rem]">
                    <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-center">
                      <div className="relative h-36 w-full max-w-3xl">
                        <div className="absolute left-8 top-10 h-px w-32 bg-zinc-300 dark:bg-zinc-700"></div>
                        <div className="absolute left-40 top-10 h-px w-32 bg-zinc-300 dark:bg-zinc-700"></div>
                        <div className="absolute left-72 top-10 h-px w-32 bg-zinc-300 dark:bg-zinc-700"></div>
                        <div className="absolute left-24 top-20 h-px w-32 bg-zinc-300 dark:bg-zinc-700"></div>
                        <div className="absolute left-56 top-20 h-px w-32 bg-zinc-300 dark:bg-zinc-700"></div>
                        <div className="absolute left-88 top-20 h-px w-32 bg-zinc-300 dark:bg-zinc-700"></div>

                        <div className="absolute left-4 top-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm">
                          <Bot className="h-5 w-5 text-zinc-700 dark:text-zinc-300" />
                        </div>
                        <div className="absolute left-36 top-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-sky-200 dark:border-sky-800 bg-sky-50 dark:bg-sky-950 shadow-sm">
                          <Terminal className="h-5 w-5 text-sky-600 dark:text-sky-400" />
                        </div>
                        <div className="absolute left-68 top-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-violet-200 dark:border-violet-800 bg-violet-50 dark:bg-violet-950 shadow-sm">
                          <Cpu className="h-5 w-5 text-violet-600 dark:text-violet-400" />
                        </div>
                        <div className="absolute right-6 top-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950 shadow-sm">
                          <BadgeCheck className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                        </div>

                        <div className="absolute left-20 top-16 flex h-12 w-12 items-center justify-center rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm">
                          <WandSparkles className="h-5 w-5 text-zinc-700 dark:text-zinc-300" />
                        </div>
                        <div className="absolute left-52 top-16 flex h-12 w-12 items-center justify-center rounded-2xl border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950 shadow-sm">
                          <Layers3 className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                        </div>
                        <div className="absolute right-24 top-16 flex h-12 w-12 items-center justify-center rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm">
                          <GitPullRequest className="h-5 w-5 text-zinc-700 dark:text-zinc-300" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-5">
                  <h3 className="text-xl font-semibold text-zinc-950 dark:text-white">Seamless PR Integration</h3>
                  <p className="mt-2 max-w-2xl text-base font-normal leading-7 text-zinc-600 dark:text-zinc-400">
                    Get senior-level feedback directly in your GitHub pull requests. No new tools to learn, just better code faster.
                  </p>
                </div>
              </div>

              <div className="rounded-[2rem] border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 shadow-sm lg:col-span-2">
                <div className="rounded-[1.5rem] border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6">
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="rounded-[1.25rem] bg-zinc-50 dark:bg-zinc-950 p-4">
                      <div className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Brief</div>
                      <div className="mt-4 space-y-2">
                        <div className="h-3 w-4/5 rounded-full bg-zinc-200 dark:bg-zinc-800"></div>
                        <div className="h-3 w-3/5 rounded-full bg-zinc-200 dark:bg-zinc-800"></div>
                        <div className="h-3 w-2/3 rounded-full bg-zinc-200 dark:bg-zinc-800"></div>
                      </div>
                    </div>
                    <div className="flex items-center justify-center rounded-[1.25rem] bg-gradient-to-br from-sky-50 via-white to-violet-50 dark:from-sky-950/30 dark:via-zinc-900 dark:to-violet-950/30 p-4">
                      <div className="relative flex h-28 w-28 items-center justify-center rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm">
                        <div className="absolute h-20 w-20 rounded-full border border-dashed border-zinc-300 dark:border-zinc-700"></div>
                        <div className="absolute h-12 w-12 rounded-full bg-zinc-950 dark:bg-zinc-50"></div>
                        <div className="absolute -left-2 top-8 h-4 w-4 rounded-full bg-sky-400"></div>
                        <div className="absolute right-1 top-3 h-3 w-3 rounded-full bg-violet-400"></div>
                        <div className="absolute bottom-3 right-3 h-4 w-4 rounded-full bg-emerald-400"></div>
                      </div>
                    </div>
                    <div className="rounded-[1.25rem] bg-zinc-50 dark:bg-zinc-950 p-4">
                      <div className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Output</div>
                      <div className="mt-4 grid grid-cols-2 gap-2">
                        <div className="h-16 rounded-2xl bg-white dark:bg-zinc-900 shadow-sm"></div>
                        <div className="h-16 rounded-2xl bg-white dark:bg-zinc-900 shadow-sm"></div>
                        <div className="h-16 rounded-2xl bg-white dark:bg-zinc-900 shadow-sm"></div>
                        <div className="h-16 rounded-2xl bg-zinc-950 dark:bg-zinc-50 shadow-sm"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-5">
                  <h3 className="text-xl font-semibold text-zinc-950 dark:text-white">One source of truth for briefs to deliverables</h3>
                  <p className="mt-2 text-base font-normal leading-7 text-zinc-600 dark:text-zinc-400">
                    From intake to final export, every artifact stays connected so context never gets lost between tools.
                  </p>
                </div>
              </div>

              <div className="rounded-[2rem] border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 shadow-sm lg:col-span-1">
                <div className="rounded-[1.5rem] border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 p-6">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex h-24 items-center justify-center rounded-[1.25rem] border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm">
                      <Icon icon="logos:figma" className="h-7 w-7" />
                    </div>
                    <div className="flex h-24 items-center justify-center rounded-[1.25rem] border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm">
                      <Icon icon="logos:slack-icon" className="h-7 w-7" />
                    </div>
                    <div className="flex h-24 items-center justify-center rounded-[1.25rem] border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm">
                      <FolderOpen className="h-7 w-7 text-zinc-800 dark:text-zinc-200" />
                    </div>
                    <div className="flex h-24 items-center justify-center rounded-[1.25rem] bg-gradient-to-br from-emerald-400 to-sky-400 shadow-sm">
                      <PlugZap className="h-7 w-7 text-white dark:text-zinc-950" />
                    </div>
                  </div>
                </div>
                <div className="mt-5">
                  <h3 className="text-xl font-semibold text-zinc-950 dark:text-white">Works with your existing stack</h3>
                  <p className="mt-2 text-base font-normal leading-7 text-zinc-600 dark:text-zinc-400">
                    Keep your favorite tools and add a visual layer that ties requests, comments, and publishing together.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Workflow Section */}
          <section id="workflow" className="mx-auto max-w-7xl px-6 py-14 lg:px-8 lg:py-20">
            <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
              <div>
                <h2 className="text-4xl font-semibold tracking-tight text-zinc-950 dark:text-white sm:text-5xl">Automated from push to merge</h2>
                <p className="mt-4 max-w-2xl text-lg font-normal leading-8 text-zinc-600 dark:text-zinc-400">
                  A seamless rhythm for indexing, analyzing, and reviewing your code with AI that learns your patterns.
                </p>
              </div>
              <a href="/repositories" className="inline-flex rounded-full bg-zinc-950 dark:bg-zinc-50 px-5 py-3 text-sm font-medium text-white dark:text-zinc-950 shadow-sm transition hover:bg-zinc-800 dark:hover:bg-zinc-200 text-center">Connect GitHub</a>
            </div>

            <div className="mt-12 grid gap-4 md:grid-cols-3">
              <div className="rounded-[2rem] border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 shadow-sm">
                <div className="rounded-[1.5rem] border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 p-5">
                  <div className="relative h-40 overflow-hidden rounded-[1.25rem] bg-white dark:bg-zinc-900">
                    <div className="absolute left-6 top-8 flex h-12 w-12 items-center justify-center rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm">
                      <Terminal className="h-5 w-5 text-zinc-700 dark:text-zinc-300" />
                    </div>
                    <div className="absolute left-24 top-14 h-px w-20 bg-zinc-300 dark:bg-zinc-700"></div>
                    <div className="absolute right-6 top-10 flex h-14 w-14 items-center justify-center rounded-2xl bg-zinc-950 dark:bg-zinc-50 shadow-sm">
                      <Cpu className="h-6 w-6 text-white dark:text-zinc-950" />
                    </div>
                    <div className="absolute left-16 bottom-6 rounded-xl border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/30 px-3 py-2 text-xs font-medium text-blue-700 dark:text-blue-400">Indexing...</div>
                  </div>
                </div>
                <div className="mt-5">
                  <div className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500">01</div>
                  <h3 className="mt-2 text-xl font-semibold text-zinc-950 dark:text-white">Smart Codebase Indexing</h3>
                  <p className="mt-2 text-base font-normal leading-7 text-zinc-600 dark:text-zinc-400">
                    CodeBeaver builds a semantic map of your entire project, including dependencies and internal API usage.
                  </p>
                </div>
              </div>

              <div className="rounded-[2rem] border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 shadow-sm">
                <div className="rounded-[1.5rem] border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 p-5">
                  <div className="relative h-40 overflow-hidden rounded-[1.25rem] bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.08),transparent_40%)]">
                    <div className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-3xl border border-blue-200 dark:border-blue-800 bg-white dark:bg-zinc-900 shadow-sm">
                      <Bot className="h-7 w-7 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="absolute left-10 top-1/2 h-px w-20 -translate-y-1/2 bg-zinc-300 dark:bg-zinc-700"></div>
                    <div className="absolute right-10 top-1/2 h-px w-20 -translate-y-1/2 bg-zinc-300 dark:bg-zinc-700"></div>
                    <div className="absolute left-8 top-8 flex h-10 w-10 items-center justify-center rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm">
                      <GitPullRequest className="h-4 w-4 text-zinc-700 dark:text-zinc-300" />
                    </div>
                    <div className="absolute right-8 top-8 flex h-10 w-10 items-center justify-center rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm">
                      <MessageSquareCode className="h-4 w-4 text-zinc-700 dark:text-zinc-300" />
                    </div>
                    <div className="absolute bottom-8 left-1/2 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm">
                      <Sparkles className="h-4 w-4 text-zinc-700 dark:text-zinc-300" />
                    </div>
                  </div>
                </div>
                <div className="mt-5">
                  <div className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500">02</div>
                  <h3 className="mt-2 text-xl font-semibold text-zinc-950 dark:text-white">AI-Powered Analysis</h3>
                  <p className="mt-2 text-base font-normal leading-7 text-zinc-600 dark:text-zinc-400">
                    On every pull request, the engine analyzes your changes against the codebase context to find logic errors.
                  </p>
                </div>
              </div>

              <div className="rounded-[2rem] border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 shadow-sm">
                <div className="rounded-[1.5rem] border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 p-5">
                  <div className="relative h-40 overflow-hidden rounded-[1.25rem] bg-white dark:bg-zinc-900">
                    <div className="absolute left-6 top-6 space-y-3">
                      <div className="flex items-center gap-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 p-3">
                        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400"></span>
                        <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400">Senior Grade Review</span>
                      </div>
                      <div className="flex items-center gap-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 p-3">
                        <span className="h-2.5 w-2.5 rounded-full bg-sky-400"></span>
                        <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400">Contextual Insight</span>
                      </div>
                      <div className="flex items-center gap-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 p-3">
                        <span className="h-2.5 w-2.5 rounded-full bg-blue-400"></span>
                        <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400">Ready to Ship</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-5">
                  <div className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500">03</div>
                  <h3 className="mt-2 text-xl font-semibold text-zinc-950 dark:text-white">Actionable Feedback</h3>
                  <p className="mt-2 text-base font-normal leading-7 text-zinc-600 dark:text-zinc-400">
                    Get precise comments with code suggestions that you can commit directly from the PR interface.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Product Deep Dive */}
          <section id="product" className="mx-auto max-w-7xl px-6 py-14 lg:px-8 lg:py-20">
            <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
              <div>
                <h2 className="text-4xl font-semibold tracking-tight text-zinc-950 dark:text-white sm:text-5xl">Built by engineers, for engineers</h2>
                <p className="mt-4 text-lg font-normal leading-8 text-zinc-600 dark:text-zinc-400">
                  We know that generic AI suggestions are worse than none. CodeBeaver is designed to provide senior-level insights that actually improve your codebase quality.
                </p>
                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4">
                    <div className="text-3xl font-semibold tracking-tight text-zinc-950 dark:text-white">85%</div>
                    <div className="mt-1 text-base font-normal text-zinc-600 dark:text-zinc-400">reduction in review time</div>
                  </div>
                  <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4">
                    <div className="text-3xl font-semibold tracking-tight text-zinc-950 dark:text-white">10x</div>
                    <div className="mt-1 text-base font-normal text-zinc-600 dark:text-zinc-400">more contextual insights</div>
                  </div>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-[2rem] border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4 shadow-sm">
                  <div className="rounded-[1.5rem] bg-zinc-50 dark:bg-zinc-950 p-5">
                    <div className="flex h-44 items-center justify-center rounded-[1.25rem] bg-white dark:bg-zinc-900">
                      <div className="grid grid-cols-3 gap-3">
                        <div className="h-14 w-14 rounded-2xl bg-blue-100 dark:bg-blue-900/30"></div>
                        <div className="h-14 w-14 rounded-2xl bg-violet-100 dark:bg-violet-900/30"></div>
                        <div className="h-14 w-14 rounded-2xl bg-emerald-100 dark:bg-emerald-900/30"></div>
                        <div className="h-14 w-14 rounded-2xl bg-zinc-950 dark:bg-zinc-50"></div>
                        <div className="h-14 w-14 rounded-2xl bg-amber-100 dark:bg-amber-900/30"></div>
                        <div className="h-14 w-14 rounded-2xl bg-zinc-100 dark:bg-zinc-800"></div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <h3 className="text-lg font-semibold text-zinc-950 dark:text-white">Multi-Repo Context</h3>
                    <p className="mt-1 text-base font-normal leading-7 text-zinc-600 dark:text-zinc-400">Understand cross-repository dependencies and API changes.</p>
                  </div>
                </div>

                <div className="rounded-[2rem] border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4 shadow-sm">
                  <div className="rounded-[1.5rem] bg-zinc-50 dark:bg-zinc-950 p-5">
                    <div className="relative h-44 overflow-hidden rounded-[1.25rem] bg-white dark:bg-zinc-900">
                      <div className="absolute inset-x-6 top-1/2 h-px -translate-y-1/2 bg-zinc-200 dark:bg-zinc-800"></div>
                      <div className="absolute left-8 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-2xl bg-blue-400 shadow-sm"></div>
                      <div className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-3xl bg-zinc-950 dark:bg-zinc-50 shadow-sm"></div>
                      <div className="absolute right-8 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-2xl bg-emerald-400 shadow-sm"></div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <h3 className="text-lg font-semibold text-zinc-950 dark:text-white">Security Scanning</h3>
                    <p className="mt-1 text-base font-normal leading-7 text-zinc-600 dark:text-zinc-400">Identify vulnerabilities and suggest fixes before they reach production.</p>
                  </div>
                </div>

                <div className="rounded-[2rem] border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4 shadow-sm sm:col-span-2">
                  <div className="rounded-[1.5rem] bg-gradient-to-br from-zinc-50 via-white to-zinc-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 p-5">
                    <div className="grid gap-4 md:grid-cols-[0.9fr_1.1fr]">
                      <div className="rounded-[1.25rem] border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4">
                        <div className="space-y-3">
                          <div className="h-3 w-2/3 rounded-full bg-blue-200 dark:bg-blue-800"></div>
                          <div className="h-3 w-4/5 rounded-full bg-blue-200 dark:bg-blue-800"></div>
                          <div className="h-16 rounded-2xl bg-zinc-50 dark:bg-zinc-950"></div>
                        </div>
                      </div>
                      <div className="rounded-[1.25rem] border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4">
                        <div className="flex h-full items-center justify-center">
                          <div className="relative h-28 w-full max-w-xs">
                            <div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-zinc-200 dark:bg-zinc-800"></div>
                            <div className="absolute left-6 top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-blue-400"></div>
                            <div className="absolute left-1/2 top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-400"></div>
                            <div className="absolute right-6 top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-emerald-400"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <h3 className="text-lg font-semibold text-zinc-950 dark:text-white">Seamless Integration</h3>
                    <p className="mt-1 max-w-2xl text-base font-normal leading-7 text-zinc-600 dark:text-zinc-400">
                      CodeBeaver fits perfectly into your existing GitHub workflow, providing insights without ever leaving your PR.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section id="faq" className="mx-auto max-w-4xl px-6 py-14 lg:px-8 lg:py-20">
            <div className="text-center">
              <h2 className="text-4xl font-semibold tracking-tight text-zinc-950 dark:text-white sm:text-5xl">Questions, answered simply</h2>
              <p className="mt-4 text-lg font-normal leading-8 text-zinc-600 dark:text-zinc-400">
                A few common things teams ask before bringing creative operations into one place.
              </p>
            </div>

            <div className="mt-10 space-y-3">
              <details className="group rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 shadow-sm" open>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                  <span className="text-base font-medium text-zinc-950 dark:text-white">Does CodeBeaver train on my code?</span>
                  <Plus className="h-4 w-4 text-zinc-500 dark:text-zinc-400 transition group-open:rotate-45" />
                </summary>
                <p className="mt-4 text-base font-normal leading-7 text-zinc-600 dark:text-zinc-400">
                  No. Your code is processed in secure, volatile memory and is never used to train our base models. We prioritize your IP security above all else.
                </p>
              </details>

              <details className="group rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 shadow-sm">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                  <span className="text-base font-medium text-zinc-950 dark:text-white">How does it handle complex PRs?</span>
                  <Plus className="h-4 w-4 text-zinc-500 dark:text-zinc-400 transition group-open:rotate-45" />
                </summary>
                <p className="mt-4 text-base font-normal leading-7 text-zinc-600 dark:text-zinc-400">
                  By indexing your entire codebase, CodeBeaver can trace logic changes across multiple files, identifying potential regressions that simple linters would miss.
                </p>
              </details>

              <details className="group rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 shadow-sm">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                  <span className="text-base font-medium text-zinc-950 dark:text-white">Is it better than basic AI reviewers?</span>
                  <Plus className="h-4 w-4 text-zinc-500 dark:text-zinc-400 transition group-open:rotate-45" />
                </summary>
                <p className="mt-4 text-base font-normal leading-7 text-zinc-600 dark:text-zinc-400">
                  Yes. Unlike generic AI, CodeBeaver uses RAG (Retrieval Augmented Generation) to ground its feedback in your specific project patterns and standards.
                </p>
              </details>

              <details className="group rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 shadow-sm">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                  <span className="text-base font-medium text-zinc-950 dark:text-white">Can I customize the review style?</span>
                  <Plus className="h-4 w-4 text-zinc-500 dark:text-zinc-400 transition group-open:rotate-45" />
                </summary>
                <p className="mt-4 text-base font-normal leading-7 text-zinc-600 dark:text-zinc-400">
                  Yes, you can configure the engine to focus on specific areas like security, performance, or adherence to your team&apos;s style guides.
                </p>
              </details>
            </div>
          </section>

          {/* CTA Section */}
          <section className="mx-auto max-w-7xl px-6 pb-16 pt-6 lg:px-8 lg:pb-24">
            <div className="overflow-hidden rounded-[2rem] border border-zinc-200 dark:border-zinc-800 bg-zinc-950 dark:bg-zinc-900">
              <div className="relative px-6 py-16 sm:px-10 lg:px-14 lg:py-20">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.25),transparent_25%),radial-gradient(circle_at_80%_30%,rgba(168,85,247,0.22),transparent_25%),radial-gradient(circle_at_50%_90%,rgba(16,185,129,0.20),transparent_25%)]"></div>
                <div className="relative grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
                  <div>
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
                      <span className="h-2 w-2 rounded-full bg-emerald-400"></span>
                      <span className="text-sm font-medium text-zinc-300">Used by high-velocity engineering teams</span>
                    </div>
                    <h2 className="mt-5 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                      Ship senior-grade code
                      <br className="hidden sm:block" />
                      with every single PR
                    </h2>
                    <p className="mt-4 max-w-2xl text-lg font-normal leading-8 text-zinc-300">
                      Connect your repository in minutes and let CodeBeaver start providing contextual, actionable insights today.
                    </p>
                  </div>
                  <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                    <a href="/repositories" className="inline-flex rounded-full bg-white dark:bg-zinc-50 px-8 py-3 text-sm font-bold text-zinc-950 dark:text-zinc-950 shadow-sm transition hover:scale-105 active:scale-95 text-center">Start Free Trial</a>
                    <a href="https://github.com/apps/code-beaver-ai" className="inline-flex rounded-full border border-white/15 bg-white/5 px-8 py-3 text-sm font-medium text-white transition hover:bg-white/10 text-center">View on GitHub</a>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50">
          <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5">
              <div className="col-span-2 lg:col-span-2">
                <a href="#" className="flex items-center gap-3">
                  <div className="relative size-7 overflow-hidden rounded-full bg-white dark:bg-zinc-900 shadow-sm">
                    <Image 
                      src="/logo.webp" 
                      alt="CodeBeaver Logo" 
                      fill 
                      className="object-contain"
                    />
                  </div>
                  <span className="text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-50">CodeBeaver</span>
                </a>
                <p className="mt-4 text-sm text-zinc-500 dark:text-zinc-400 max-w-xs leading-relaxed">
                  The AI Senior Engineer for modern development teams. Automated, contextual, and precise code reviews on every pull request.
                </p>
                <div className="mt-6 flex items-center gap-4">
                  <a href="#" className="text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 transition">
                    <Icon icon="mdi:github" className="size-5" />
                  </a>
                  <a href="#" className="text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 transition">
                    <Icon icon="mdi:twitter" className="size-5" />
                  </a>
                  <a href="#" className="text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 transition">
                    <Icon icon="mdi:linkedin" className="size-5" />
                  </a>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-50 uppercase tracking-wider">Product</h3>
                <ul className="mt-4 space-y-2">
                  <li><a href="#features" className="text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 transition">Features</a></li>
                  <li><a href="#workflow" className="text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 transition">Workflow</a></li>
                  <li><a href="#security" className="text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 transition">Security</a></li>
                  <li><a href="/onboarding" className="text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 transition">Pricing</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-50 uppercase tracking-wider">Company</h3>
                <ul className="mt-4 space-y-2">
                  <li><a href="#" className="text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 transition">About</a></li>
                  <li><a href="#" className="text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 transition">Blog</a></li>
                  <li><a href="#" className="text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 transition">Careers</a></li>
                  <li><a href="#" className="text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 transition">Contact</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-50 uppercase tracking-wider">Legal</h3>
                <ul className="mt-4 space-y-2">
                  <li><a href="#" className="text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 transition">Privacy</a></li>
                  <li><a href="#" className="text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 transition">Terms</a></li>
                  <li><a href="#" className="text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 transition">Cookie Policy</a></li>
                </ul>
              </div>
            </div>
            <div className="mt-12 border-t border-zinc-200 dark:border-zinc-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                © 2026 CodeBeaver AI. All rights reserved.
              </p>
              <div className="flex items-center gap-2 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                System Status: All Systems Operational
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
