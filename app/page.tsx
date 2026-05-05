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
  Moon
} from "lucide-react"
import { Icon } from "@iconify/react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

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
            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm">
              <div className="grid h-5 w-5 grid-cols-2 gap-0.5">
                <div className="rounded-sm bg-zinc-950 dark:bg-zinc-50"></div>
                <div className="rounded-sm bg-emerald-400"></div>
                <div className="rounded-sm bg-sky-400"></div>
                <div className="rounded-sm bg-violet-400"></div>
              </div>
            </div>
            <span className="text-base font-medium text-zinc-900 dark:text-zinc-50">PulseGrid</span>
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
            <a href="#" className="hidden rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-4 py-2 text-sm font-medium text-zinc-700 dark:text-zinc-300 shadow-sm transition hover:bg-zinc-50 dark:hover:bg-zinc-800 sm:inline-flex">Log in</a>
            <a href="#" className="inline-flex rounded-full bg-zinc-950 dark:bg-zinc-50 px-4 py-2 text-sm font-medium text-white dark:text-zinc-950 shadow-sm transition hover:bg-zinc-800 dark:hover:bg-zinc-200">Start free</a>
          </div>
        </div>
      </header>

      <div className="relative overflow-hidden">

        <main className="relative z-10">
          {/* Hero Section */}
          <section className="mx-auto max-w-7xl px-6 pb-14 pt-10 lg:px-8 lg:pt-16">
            <div className="mx-auto max-w-4xl text-center">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white/90 dark:bg-zinc-900/90 px-3 py-1.5 shadow-sm backdrop-blur">
                <span className="h-2 w-2 rounded-full bg-emerald-400"></span>
                <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">Creative operations, visualized in motion</span>
              </div>
              <h1 className="text-5xl font-semibold tracking-tight text-zinc-950 dark:text-white sm:text-6xl lg:text-7xl">
                The command center
                <br className="hidden sm:block" />
                for modern creative teams
              </h1>
              <p className="mx-auto mt-5 max-w-2xl text-lg font-normal leading-8 text-zinc-600 dark:text-zinc-400">
                Plan campaigns, route feedback, and launch assets faster with one calm workspace built for designers, marketers, and production teams.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <a href="#" className="inline-flex rounded-full bg-zinc-950 dark:bg-zinc-50 px-5 py-3 text-sm font-medium text-white dark:text-zinc-950 shadow-sm transition hover:bg-zinc-800 dark:hover:bg-zinc-200">Book a demo</a>
                <a href="#" className="inline-flex rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-5 py-3 text-sm font-medium text-zinc-700 dark:text-zinc-300 shadow-sm transition hover:bg-zinc-50 dark:hover:bg-zinc-800">See how it works</a>
              </div>

              {/* Integrations Chips */}
              <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
                <div className="flex items-center gap-2 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white/90 dark:bg-zinc-900/90 px-3 py-2 shadow-sm">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800">
                    <Icon icon="logos:figma" className="h-3.5 w-3.5" />
                  </div>
                  <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">Figma</span>
                </div>
                <div className="flex items-center gap-2 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white/90 dark:bg-zinc-900/90 px-3 py-2 shadow-sm">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800">
                    <Icon icon="logos:slack-icon" className="h-3.5 w-3.5" />
                  </div>
                  <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">Slack</span>
                </div>
                <div className="flex items-center gap-2 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white/90 dark:bg-zinc-900/90 px-3 py-2 shadow-sm">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800">
                    <CalendarDays className="h-4 w-4 text-zinc-700 dark:text-zinc-300" />
                  </div>
                  <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">Calendar</span>
                </div>
                <div className="flex items-center gap-2 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white/90 dark:bg-zinc-900/90 px-3 py-2 shadow-sm">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800">
                    <LayoutGrid className="h-4 w-4 text-zinc-700 dark:text-zinc-300" />
                  </div>
                  <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">Assets</span>
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
                      <div className="hidden rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 px-3 py-1.5 text-sm font-medium text-zinc-500 dark:text-zinc-400 sm:block">Summer Launch / Workspace</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="hidden rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-3 py-1.5 text-sm font-medium text-zinc-500 dark:text-zinc-400 md:block">Search tasks...</div>
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
                        <Bell className="h-4 w-4 text-zinc-500 dark:text-zinc-400" />
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-3 p-3 lg:grid-cols-[16rem_minmax(0,1fr)]">
                    {/* Sidebar Mockup */}
                    <aside className="rounded-[1.25rem] border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4">
                      <div className="mb-4 flex items-center gap-3">
                        <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-sky-400 to-violet-400 p-0.5 shadow-sm">
                          <div className="flex h-full w-full items-center justify-center rounded-[0.9rem] bg-white dark:bg-zinc-900">
                            <Sparkles className="h-4 w-4 text-zinc-900 dark:text-white" />
                          </div>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-zinc-900 dark:text-white">Campaign Board</div>
                          <div className="text-xs font-medium text-zinc-500 dark:text-zinc-400">12 active flows</div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between rounded-xl bg-zinc-950 dark:bg-zinc-50 px-3 py-2.5 text-white dark:text-zinc-950">
                          <div className="flex items-center gap-2">
                            <LayoutGrid className="h-4 w-4" />
                            <span className="text-sm font-medium">Overview</span>
                          </div>
                          <span className="rounded-full bg-white/10 dark:bg-black/10 px-2 py-0.5 text-xs font-medium">4</span>
                        </div>
                        <div className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-zinc-600 dark:text-zinc-400 transition hover:bg-zinc-50 dark:hover:bg-zinc-800 cursor-pointer">
                          <FolderOpen className="h-4 w-4" />
                          <span className="text-sm font-medium">Projects</span>
                        </div>
                        <div className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-zinc-600 dark:text-zinc-400 transition hover:bg-zinc-50 dark:hover:bg-zinc-800 cursor-pointer">
                          <MessageSquareMore className="h-4 w-4" />
                          <span className="text-sm font-medium">Feedback</span>
                        </div>
                        <div className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-zinc-600 dark:text-zinc-400 transition hover:bg-zinc-50 dark:hover:bg-zinc-800 cursor-pointer">
                          <Clock3 className="h-4 w-4" />
                          <span className="text-sm font-medium">Timeline</span>
                        </div>
                      </div>

                      <div className="mt-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-gradient-to-br from-zinc-50 to-white dark:from-zinc-800 dark:to-zinc-900 p-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Approval rate</span>
                          <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">+18%</span>
                        </div>
                        <div className="mt-3 h-2 rounded-full bg-zinc-100 dark:bg-zinc-800">
                          <div className="h-2 w-4/5 rounded-full bg-gradient-to-r from-emerald-400 to-sky-400"></div>
                        </div>
                        <div className="mt-3 text-xs font-medium text-zinc-500 dark:text-zinc-400">Fewer revisions across launch assets</div>
                      </div>
                    </aside>

                    {/* Content Mockup */}
                    <div className="grid gap-3">
                      <div className="grid gap-3 lg:grid-cols-3">
                        <div className="rounded-[1.25rem] border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4">
                          <div className="flex items-start justify-between">
                            <div>
                              <div className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Live projects</div>
                              <div className="mt-1 text-3xl font-semibold tracking-tight text-zinc-950 dark:text-white">28</div>
                            </div>
                            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-50 dark:bg-emerald-950/30">
                              <Layers3 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                            </div>
                          </div>
                          <div className="mt-5 flex items-end gap-1">
                            <span className="h-8 w-3 rounded-full bg-zinc-100 dark:bg-zinc-800"></span>
                            <span className="h-12 w-3 rounded-full bg-zinc-200 dark:bg-zinc-700"></span>
                            <span className="h-10 w-3 rounded-full bg-sky-300 dark:bg-sky-700"></span>
                            <span className="h-16 w-3 rounded-full bg-violet-300 dark:bg-violet-700"></span>
                            <span className="h-20 w-3 rounded-full bg-zinc-950 dark:bg-zinc-50"></span>
                            <span className="h-14 w-3 rounded-full bg-emerald-300 dark:bg-emerald-700"></span>
                          </div>
                        </div>

                        <div className="rounded-[1.25rem] border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4 lg:col-span-2">
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Launch rhythm</div>
                              <div className="mt-1 text-base font-medium text-zinc-900 dark:text-white">Assets flowing from brief to release</div>
                            </div>
                            <div className="rounded-full border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 px-3 py-1 text-xs font-medium text-zinc-500 dark:text-zinc-400">This week</div>
                          </div>

                          <div className="relative mt-6 h-28 overflow-hidden rounded-2xl bg-[radial-gradient(circle_at_20%_50%,rgba(59,130,246,0.10),transparent_30%),radial-gradient(circle_at_80%_50%,rgba(168,85,247,0.10),transparent_30%),linear-gradient(to_right,rgba(24,24,27,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(24,24,27,0.05)_1px,transparent_1px)] dark:bg-[radial-gradient(circle_at_20%_50%,rgba(59,130,246,0.05),transparent_30%),radial-gradient(circle_at_80%_50%,rgba(168,85,247,0.05),transparent_30%),linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:auto,auto,2rem_2rem,2rem_2rem]">
                            <div className="absolute left-6 top-1/2 h-px w-20 -translate-y-1/2 bg-zinc-300 dark:bg-zinc-700"></div>
                            <div className="absolute left-24 top-1/2 h-px w-24 -translate-y-1/2 bg-sky-300 dark:bg-sky-800"></div>
                            <div className="absolute left-48 top-1/2 h-px w-24 -translate-y-1/2 bg-violet-300 dark:bg-violet-800"></div>
                            <div className="absolute right-8 top-1/2 h-px w-20 -translate-y-1/2 bg-emerald-300 dark:bg-emerald-800"></div>

                            <div className="absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm">
                              <FileText className="h-4 w-4 text-zinc-700 dark:text-zinc-300" />
                            </div>
                            <div className="absolute left-24 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-2xl border border-sky-200 dark:border-sky-800 bg-sky-50 dark:bg-sky-950 shadow-sm">
                              <WandSparkles className="h-5 w-5 text-sky-600 dark:text-sky-400" />
                            </div>
                            <div className="absolute left-52 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-2xl border border-violet-200 dark:border-violet-800 bg-violet-50 dark:bg-violet-950 shadow-sm">
                              <MessageCircleMore className="h-5 w-5 text-violet-600 dark:text-violet-400" />
                            </div>
                            <div className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-2xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950 shadow-sm">
                              <Rocket className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="grid gap-3 lg:grid-cols-[1.3fr_0.9fr]">
                        <div className="rounded-[1.25rem] border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Production calendar</div>
                              <div className="mt-1 text-base font-medium text-zinc-900 dark:text-white">Visual timeline with stacked milestones</div>
                            </div>
                            <div className="flex -space-x-2">
                              <div className="h-8 w-8 rounded-full border-2 border-white dark:border-zinc-900 bg-sky-300"></div>
                              <div className="h-8 w-8 rounded-full border-2 border-white dark:border-zinc-900 bg-violet-300"></div>
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
                                    <div className="flex h-full w-full items-end justify-center bg-gradient-to-t from-sky-100 to-white dark:from-sky-900/30 dark:to-zinc-950">
                                      <div className="mb-2 h-8 w-8 rounded-xl bg-sky-400/80"></div>
                                    </div>
                                  )}
                                  {i === 2 && (
                                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-t from-violet-100 to-white dark:from-violet-900/30 dark:to-zinc-950">
                                      <div className="h-8 w-8 rounded-xl bg-violet-400/80"></div>
                                    </div>
                                  )}
                                  {i === 3 && (
                                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-t from-emerald-100 to-white dark:from-emerald-900/30 dark:to-zinc-950">
                                      <div className="grid grid-cols-2 gap-1">
                                        <div className="h-4 w-4 rounded-md bg-emerald-400"></div>
                                        <div className="h-4 w-4 rounded-md bg-sky-400"></div>
                                        <div className="h-4 w-4 rounded-md bg-violet-400"></div>
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
                          <div className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Automations</div>
                          <div className="mt-1 text-base font-medium text-zinc-900 dark:text-white">Quietly running in the background</div>

                          <div className="mt-5 space-y-3">
                            <div className="flex items-center gap-3 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 p-3">
                              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white dark:bg-zinc-900 shadow-sm">
                                <Sparkle className="h-4 w-4 text-violet-600 dark:text-violet-400" />
                              </div>
                              <div className="min-w-0">
                                <div className="text-sm font-medium text-zinc-900 dark:text-white">Auto brief summary</div>
                                <div className="truncate text-xs font-medium text-zinc-500 dark:text-zinc-400">Key goals extracted for review</div>
                              </div>
                            </div>
                            <div className="flex items-center gap-3 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 p-3">
                              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white dark:bg-zinc-900 shadow-sm">
                                <MessageSquareQuote className="h-4 w-4 text-sky-600 dark:text-sky-400" />
                              </div>
                              <div className="min-w-0">
                                <div className="text-sm font-medium text-zinc-900 dark:text-white">Feedback routing</div>
                                <div className="truncate text-xs font-medium text-zinc-500 dark:text-zinc-400">Comments grouped by team</div>
                              </div>
                            </div>
                            <div className="flex items-center gap-3 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 p-3">
                              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white dark:bg-zinc-900 shadow-sm">
                                <Send className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                              </div>
                              <div className="min-w-0">
                                <div className="text-sm font-medium text-zinc-900 dark:text-white">Ready-to-publish sync</div>
                                <div className="truncate text-xs font-medium text-zinc-500 dark:text-zinc-400">Approved assets sent downstream</div>
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
              <h2 className="text-4xl font-semibold tracking-tight text-zinc-950 dark:text-white sm:text-5xl">Built to feel calm, fast, and visual</h2>
              <p className="mt-4 text-lg font-normal leading-8 text-zinc-600 dark:text-zinc-400">
                Every surface is designed to reduce noise while giving your team a clear picture of what moves next.
              </p>
            </div>

            <div className="mt-12 grid gap-4 lg:grid-cols-3">
              <div className="rounded-[2rem] border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 shadow-sm lg:col-span-1">
                <div className="rounded-[1.5rem] border border-zinc-200 dark:border-zinc-800 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.08),transparent_45%)] p-6">
                  <div className="relative mx-auto flex h-56 items-center justify-center overflow-hidden rounded-[1.5rem] bg-zinc-50 dark:bg-zinc-950">
                    <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(24,24,27,0.05)_1px,transparent_1px)] dark:bg-[radial-gradient(circle,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:1rem_1rem]"></div>
                    <div className="relative z-10 grid grid-cols-2 gap-4">
                      <div className="flex h-20 w-20 items-center justify-center rounded-[1.25rem] border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm">
                        <PenTool className="h-7 w-7 text-violet-600 dark:text-violet-400" />
                      </div>
                      <div className="mt-8 flex h-20 w-20 items-center justify-center rounded-[1.25rem] border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm">
                        <ImageIcon className="h-7 w-7 text-sky-600 dark:text-sky-400" />
                      </div>
                      <div className="-mt-6 flex h-20 w-20 items-center justify-center rounded-[1.25rem] border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm">
                        <Type className="h-7 w-7 text-emerald-600 dark:text-emerald-400" />
                      </div>
                      <div className="flex h-20 w-20 items-center justify-center rounded-[1.25rem] bg-zinc-950 dark:bg-zinc-50 shadow-sm">
                        <Sparkles className="h-7 w-7 text-white dark:text-zinc-950" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-5">
                  <h3 className="text-xl font-semibold text-zinc-950 dark:text-white">Creative blocks become structured flows</h3>
                  <p className="mt-2 text-base font-normal leading-7 text-zinc-600 dark:text-zinc-400">
                    Turn briefs, assets, and review notes into clean stages your team can actually move through.
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
                          <FilePlus2 className="h-5 w-5 text-zinc-700 dark:text-zinc-300" />
                        </div>
                        <div className="absolute left-36 top-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-sky-200 dark:border-sky-800 bg-sky-50 dark:bg-sky-950 shadow-sm">
                          <ScanSearch className="h-5 w-5 text-sky-600 dark:text-sky-400" />
                        </div>
                        <div className="absolute left-68 top-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-violet-200 dark:border-violet-800 bg-violet-50 dark:bg-violet-950 shadow-sm">
                          <MessageSquareHeart className="h-5 w-5 text-violet-600 dark:text-violet-400" />
                        </div>
                        <div className="absolute right-6 top-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950 shadow-sm">
                          <BadgeCheck className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                        </div>

                        <div className="absolute left-20 top-16 flex h-12 w-12 items-center justify-center rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm">
                          <Wand2 className="h-5 w-5 text-zinc-700 dark:text-zinc-300" />
                        </div>
                        <div className="absolute left-52 top-16 flex h-12 w-12 items-center justify-center rounded-2xl border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950 shadow-sm">
                          <Users className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                        </div>
                        <div className="absolute right-24 top-16 flex h-12 w-12 items-center justify-center rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm">
                          <Rocket className="h-5 w-5 text-zinc-700 dark:text-zinc-300" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-5">
                  <h3 className="text-xl font-semibold text-zinc-950 dark:text-white">Approvals map across every stakeholder</h3>
                  <p className="mt-2 max-w-2xl text-base font-normal leading-7 text-zinc-600 dark:text-zinc-400">
                    Visual pathways show where creative gets stuck, who needs to review, and what must happen before launch.
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
                <h2 className="text-4xl font-semibold tracking-tight text-zinc-950 dark:text-white sm:text-5xl">How the system moves work forward</h2>
                <p className="mt-4 max-w-2xl text-lg font-normal leading-8 text-zinc-600 dark:text-zinc-400">
                  A simple rhythm for intake, production, review, and release with visuals that make each step feel obvious.
                </p>
              </div>
              <a href="#" className="inline-flex rounded-full bg-zinc-950 dark:bg-zinc-50 px-5 py-3 text-sm font-medium text-white dark:text-zinc-950 shadow-sm transition hover:bg-zinc-800 dark:hover:bg-zinc-200 text-center">Explore product</a>
            </div>

            <div className="mt-12 grid gap-4 md:grid-cols-3">
              <div className="rounded-[2rem] border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 shadow-sm">
                <div className="rounded-[1.5rem] border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 p-5">
                  <div className="relative h-40 overflow-hidden rounded-[1.25rem] bg-white dark:bg-zinc-900">
                    <div className="absolute left-6 top-8 flex h-12 w-12 items-center justify-center rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm">
                      <Inbox className="h-5 w-5 text-zinc-700 dark:text-zinc-300" />
                    </div>
                    <div className="absolute left-24 top-14 h-px w-20 bg-zinc-300 dark:bg-zinc-700"></div>
                    <div className="absolute right-6 top-10 flex h-14 w-14 items-center justify-center rounded-2xl bg-zinc-950 dark:bg-zinc-50 shadow-sm">
                      <ClipboardList className="h-6 w-6 text-white dark:text-zinc-950" />
                    </div>
                    <div className="absolute left-16 bottom-6 rounded-xl border border-sky-200 dark:border-sky-800 bg-sky-50 dark:bg-sky-950/30 px-3 py-2 text-xs font-medium text-sky-700 dark:text-sky-400">Auto-tagged</div>
                  </div>
                </div>
                <div className="mt-5">
                  <div className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500">01</div>
                  <h3 className="mt-2 text-xl font-semibold text-zinc-950 dark:text-white">Collect requests in one place</h3>
                  <p className="mt-2 text-base font-normal leading-7 text-zinc-600 dark:text-zinc-400">
                    Intake forms become structured briefs with fields, assets, owners, and due dates already mapped.
                  </p>
                </div>
              </div>

              <div className="rounded-[2rem] border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 shadow-sm">
                <div className="rounded-[1.5rem] border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 p-5">
                  <div className="relative h-40 overflow-hidden rounded-[1.25rem] bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.08),transparent_40%)]">
                    <div className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-3xl border border-emerald-200 dark:border-emerald-800 bg-white dark:bg-zinc-900 shadow-sm">
                      <Bot className="h-7 w-7 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div className="absolute left-10 top-1/2 h-px w-20 -translate-y-1/2 bg-zinc-300 dark:bg-zinc-700"></div>
                    <div className="absolute right-10 top-1/2 h-px w-20 -translate-y-1/2 bg-zinc-300 dark:bg-zinc-700"></div>
                    <div className="absolute left-8 top-8 flex h-10 w-10 items-center justify-center rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm">
                      <ImagePlus className="h-4 w-4 text-zinc-700 dark:text-zinc-300" />
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
                  <h3 className="mt-2 text-xl font-semibold text-zinc-950 dark:text-white">Organize and prep automatically</h3>
                  <p className="mt-2 text-base font-normal leading-7 text-zinc-600 dark:text-zinc-400">
                    The system groups context, summarizes ask quality, and prepares a cleaner handoff for execution.
                  </p>
                </div>
              </div>

              <div className="rounded-[2rem] border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 shadow-sm">
                <div className="rounded-[1.5rem] border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 p-5">
                  <div className="relative h-40 overflow-hidden rounded-[1.25rem] bg-white dark:bg-zinc-900">
                    <div className="absolute left-6 top-6 space-y-3">
                      <div className="flex items-center gap-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 p-3">
                        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400"></span>
                        <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400">Approved by marketing</span>
                      </div>
                      <div className="flex items-center gap-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 p-3">
                        <span className="h-2.5 w-2.5 rounded-full bg-sky-400"></span>
                        <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400">Ready for social export</span>
                      </div>
                      <div className="flex items-center gap-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 p-3">
                        <span className="h-2.5 w-2.5 rounded-full bg-violet-400"></span>
                        <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400">Sent to publishing</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-5">
                  <div className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500">03</div>
                  <h3 className="mt-2 text-xl font-semibold text-zinc-950 dark:text-white">Review, approve, and release</h3>
                  <p className="mt-2 text-base font-normal leading-7 text-zinc-600 dark:text-zinc-400">
                    Comments resolve into action, decisions stay visible, and final assets move downstream without confusion.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Product Deep Dive */}
          <section id="product" className="mx-auto max-w-7xl px-6 py-14 lg:px-8 lg:py-20">
            <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
              <div>
                <h2 className="text-4xl font-semibold tracking-tight text-zinc-950 dark:text-white sm:text-5xl">A product landing page with visuals doing the talking</h2>
                <p className="mt-4 text-lg font-normal leading-8 text-zinc-600 dark:text-zinc-400">
                  Instead of heavy screenshots, the experience uses expressive panels, soft gradients, and small interface moments to explain the product.
                </p>
                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4">
                    <div className="text-3xl font-semibold tracking-tight text-zinc-950 dark:text-white">3.2x</div>
                    <div className="mt-1 text-base font-normal text-zinc-600 dark:text-zinc-400">faster campaign setup</div>
                  </div>
                  <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4">
                    <div className="text-3xl font-semibold tracking-tight text-zinc-950 dark:text-white">41%</div>
                    <div className="mt-1 text-base font-normal text-zinc-600 dark:text-zinc-400">fewer review loops</div>
                  </div>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-[2rem] border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4 shadow-sm">
                  <div className="rounded-[1.5rem] bg-zinc-50 dark:bg-zinc-950 p-5">
                    <div className="flex h-44 items-center justify-center rounded-[1.25rem] bg-white dark:bg-zinc-900">
                      <div className="grid grid-cols-3 gap-3">
                        <div className="h-14 w-14 rounded-2xl bg-sky-100 dark:bg-sky-900/30"></div>
                        <div className="h-14 w-14 rounded-2xl bg-violet-100 dark:bg-violet-900/30"></div>
                        <div className="h-14 w-14 rounded-2xl bg-emerald-100 dark:bg-emerald-900/30"></div>
                        <div className="h-14 w-14 rounded-2xl bg-zinc-950 dark:bg-zinc-50"></div>
                        <div className="h-14 w-14 rounded-2xl bg-amber-100 dark:bg-amber-900/30"></div>
                        <div className="h-14 w-14 rounded-2xl bg-zinc-100 dark:bg-zinc-800"></div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <h3 className="text-lg font-semibold text-zinc-950 dark:text-white">Flexible by campaign</h3>
                    <p className="mt-1 text-base font-normal leading-7 text-zinc-600 dark:text-zinc-400">Adapt layouts and handoffs for every launch type.</p>
                  </div>
                </div>

                <div className="rounded-[2rem] border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4 shadow-sm">
                  <div className="rounded-[1.5rem] bg-zinc-50 dark:bg-zinc-950 p-5">
                    <div className="relative h-44 overflow-hidden rounded-[1.25rem] bg-white dark:bg-zinc-900">
                      <div className="absolute inset-x-6 top-1/2 h-px -translate-y-1/2 bg-zinc-200 dark:bg-zinc-800"></div>
                      <div className="absolute left-8 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-2xl bg-sky-400 shadow-sm"></div>
                      <div className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-3xl bg-zinc-950 dark:bg-zinc-50 shadow-sm"></div>
                      <div className="absolute right-8 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-2xl bg-emerald-400 shadow-sm"></div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <h3 className="text-lg font-semibold text-zinc-950 dark:text-white">Centered on clarity</h3>
                    <p className="mt-1 text-base font-normal leading-7 text-zinc-600 dark:text-zinc-400">Every view points to one next action instead of many.</p>
                  </div>
                </div>

                <div className="rounded-[2rem] border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4 shadow-sm sm:col-span-2">
                  <div className="rounded-[1.5rem] bg-gradient-to-br from-zinc-50 via-white to-zinc-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 p-5">
                    <div className="grid gap-4 md:grid-cols-[0.9fr_1.1fr]">
                      <div className="rounded-[1.25rem] border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4">
                        <div className="space-y-3">
                          <div className="h-3 w-2/3 rounded-full bg-zinc-200 dark:bg-zinc-800"></div>
                          <div className="h-3 w-4/5 rounded-full bg-zinc-200 dark:bg-zinc-800"></div>
                          <div className="h-16 rounded-2xl bg-zinc-50 dark:bg-zinc-950"></div>
                        </div>
                      </div>
                      <div className="rounded-[1.25rem] border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4">
                        <div className="flex h-full items-center justify-center">
                          <div className="relative h-28 w-full max-w-xs">
                            <div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-zinc-200 dark:bg-zinc-800"></div>
                            <div className="absolute left-6 top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-sky-400"></div>
                            <div className="absolute left-1/2 top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-400"></div>
                            <div className="absolute right-6 top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-emerald-400"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <h3 className="text-lg font-semibold text-zinc-950 dark:text-white">A visual system, not just a dashboard</h3>
                    <p className="mt-1 max-w-2xl text-base font-normal leading-7 text-zinc-600 dark:text-zinc-400">
                      The page leans on illustrations built from simple interface blocks, giving the product more personality while staying minimal.
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
                  <span className="text-base font-medium text-zinc-950 dark:text-white">What kind of teams is this for?</span>
                  <Plus className="h-4 w-4 text-zinc-500 dark:text-zinc-400 transition group-open:rotate-45" />
                </summary>
                <p className="mt-4 text-base font-normal leading-7 text-zinc-600 dark:text-zinc-400">
                  It works well for in-house design teams, brand studios, growth teams, and marketing organizations managing a high volume of creative output.
                </p>
              </details>

              <details className="group rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 shadow-sm">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                  <span className="text-base font-medium text-zinc-950 dark:text-white">Can it replace scattered project boards?</span>
                  <Plus className="h-4 w-4 text-zinc-500 dark:text-zinc-400 transition group-open:rotate-45" />
                </summary>
                <p className="mt-4 text-base font-normal leading-7 text-zinc-600 dark:text-zinc-400">
                  Yes. It combines intake, production tracking, feedback collection, and launch readiness into one focused system.
                </p>
              </details>

              <details className="group rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 shadow-sm">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                  <span className="text-base font-medium text-zinc-950 dark:text-white">Is this meant for enterprise workflows too?</span>
                  <Plus className="h-4 w-4 text-zinc-500 dark:text-zinc-400 transition group-open:rotate-45" />
                </summary>
                <p className="mt-4 text-base font-normal leading-7 text-zinc-600 dark:text-zinc-400">
                  The structure supports multiple teams, layered approvals, asset governance, and repeatable launch processes without adding visual complexity.
                </p>
              </details>

              <details className="group rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 shadow-sm">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                  <span className="text-base font-medium text-zinc-950 dark:text-white">How fast can a team get started?</span>
                  <Plus className="h-4 w-4 text-zinc-500 dark:text-zinc-400 transition group-open:rotate-45" />
                </summary>
                <p className="mt-4 text-base font-normal leading-7 text-zinc-600 dark:text-zinc-400">
                  Most teams can set up forms, create their first workflow, and begin routing requests in a single afternoon.
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
                      <span className="text-sm font-medium text-zinc-300">Designed for teams shipping every week</span>
                    </div>
                    <h2 className="mt-5 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                      Run your creative machine
                      <br className="hidden sm:block" />
                      without the chaos
                    </h2>
                    <p className="mt-4 max-w-2xl text-lg font-normal leading-8 text-zinc-300">
                      A modern workspace for creative operations with visual systems that explain the product before the copy does.
                    </p>
                  </div>
                  <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                    <a href="#" className="inline-flex rounded-full bg-white dark:bg-zinc-50 px-5 py-3 text-sm font-medium text-zinc-950 dark:text-zinc-950 shadow-sm transition hover:bg-zinc-100 text-center">Start free</a>
                    <a href="#" className="inline-flex rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-medium text-white transition hover:bg-white/10 text-center">Talk to sales</a>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="border-t border-zinc-200 dark:border-zinc-800">
          <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-8 text-sm font-medium text-zinc-500 dark:text-zinc-400 sm:flex-row sm:items-center sm:justify-between lg:px-8">
            <div>© 2026 PulseGrid. All rights reserved.</div>
            <div className="flex items-center gap-6">
              <a href="#" className="transition hover:text-zinc-900 dark:hover:text-zinc-50">Privacy</a>
              <a href="#" className="transition hover:text-zinc-900 dark:hover:text-zinc-50">Terms</a>
              <a href="#" className="transition hover:text-zinc-900 dark:hover:text-zinc-50">Contact</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
