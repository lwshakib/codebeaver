"use client";

import { AppSidebar } from "@/components/app-sidebar"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { 
  SearchIcon, 
  HelpCircleIcon, 
  BellIcon, 
  KeyboardIcon, 
  LogOut, 
  Sun, 
  Moon, 
  Monitor,
  User as UserIcon,
  ChevronRight
} from "lucide-react"
import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"
import { authClient } from "@/lib/auth-client"
import { useState, useEffect } from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Icon } from "@iconify/react"

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const { setTheme, theme } = useTheme()
  const { data: session } = authClient.useSession()
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null)

  const pageTitle = pathname.startsWith('/account') ? 'Account' : 'Repositories'

  useEffect(() => {
    const getImageUrl = async () => {
      if (session?.user?.image) {
        if (session.user.image.startsWith('uploads/')) {
          try {
            const res = await fetch(`/api/s3/signed-url?path=${session.user.image}`);
            const data = await res.json();
            if (data.url) {
              setProfileImageUrl(data.url);
            }
          } catch (err) {
            console.error('Failed to get signed image URL:', err);
          }
        } else {
          setProfileImageUrl(session.user.image);
        }
      } else {
        setProfileImageUrl(null);
      }
    };
    getImageUrl();
  }, [session]);

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          window.location.href = "/sign-in";
        },
      },
    });
  };
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full bg-zinc-950 overflow-hidden">
        <AppSidebar />
        <SidebarInset className="flex flex-col bg-zinc-950 overflow-hidden">
          {/* Global Header - Sticky */}
          <header className="sticky top-0 z-40 flex h-14 shrink-0 items-center justify-between border-b border-zinc-900 bg-zinc-950/80 backdrop-blur-md px-6">
            <div className="flex items-center gap-4">
              {/* Mobile Sidebar Trigger */}
              <div className="lg:hidden">
                <SidebarTrigger className="size-8 rounded-md bg-transparent border-none text-zinc-500 hover:bg-zinc-900 hover:text-zinc-100" />
              </div>
              <h2 className="text-sm font-medium text-zinc-100">{pageTitle}</h2>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="relative hidden sm:flex items-center">
                <div className="flex h-8 items-center gap-2 rounded-md border border-zinc-800 bg-zinc-900/50 px-3 py-1.5 text-xs text-zinc-500">
                  <SearchIcon className="size-3.5" />
                  <span>Search</span>
                  <div className="flex items-center gap-1 ml-4 border-l border-zinc-800 pl-2">
                    <KeyboardIcon className="size-3" />
                    <span>Ctrl + K</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="rounded-md p-1.5 text-zinc-500 hover:bg-zinc-900 hover:text-zinc-100">
                  <HelpCircleIcon className="size-4" />
                </button>
                <button className="rounded-md p-1.5 text-zinc-500 hover:bg-zinc-900 hover:text-zinc-100">
                  <BellIcon className="size-4" />
                </button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="relative size-7 rounded-full bg-zinc-800 border border-zinc-700 overflow-hidden outline-none focus:ring-1 focus:ring-zinc-700">
                      {profileImageUrl ? (
                        <img src={profileImageUrl} alt="User" className="size-full object-cover" />
                      ) : (
                        <div className="flex size-full items-center justify-center bg-zinc-900 text-[10px] font-bold text-zinc-400">
                          {session?.user?.name?.[0]?.toUpperCase() || 'U'}
                        </div>
                      )}
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-64 bg-zinc-950 border-zinc-900 p-2 shadow-2xl">
                    <div className="flex items-center justify-between px-2 py-2">
                      <div className="flex items-center gap-2">
                        <Icon icon="lucide:swatchbook" className="size-4 text-zinc-500" />
                        <span className="text-xs font-bold text-zinc-400">Theme</span>
                      </div>
                      <div className="flex items-center gap-1 bg-zinc-900/50 p-1 rounded-lg border border-zinc-900">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className={cn("size-7 rounded-md", theme === 'light' ? "bg-zinc-800 text-zinc-100" : "text-zinc-500 hover:text-zinc-100")}
                          onClick={() => setTheme('light')}
                        >
                          <Sun className="size-3.5" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className={cn("size-7 rounded-md", theme === 'dark' ? "bg-zinc-800 text-zinc-100" : "text-zinc-500 hover:text-zinc-100")}
                          onClick={() => setTheme('dark')}
                        >
                          <Moon className="size-3.5" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className={cn("size-7 rounded-md", theme === 'system' ? "bg-zinc-800 text-zinc-100" : "text-zinc-500 hover:text-zinc-100")}
                          onClick={() => setTheme('system')}
                        >
                          <Monitor className="size-3.5" />
                        </Button>
                      </div>
                    </div>

                    <DropdownMenuSeparator className="bg-zinc-900 my-1" />

                    <DropdownMenuItem 
                      onClick={handleLogout}
                      className="flex items-center gap-2 p-2 rounded-lg cursor-pointer text-zinc-500 hover:text-red-500 focus:text-red-500 focus:bg-red-500/10"
                    >
                      <LogOut className="size-4" />
                      <span className="text-xs font-bold">Logout</span>
                    </DropdownMenuItem>

                    <DropdownMenuSeparator className="bg-zinc-900 my-1" />

                    <DropdownMenuItem asChild className="cursor-pointer focus:bg-zinc-900 focus:text-zinc-100 p-2 rounded-lg mt-1">
                      <Link href="/account" className="flex items-center gap-3 w-full">
                        <div className="size-10 rounded-full bg-zinc-900 border border-zinc-800 overflow-hidden shrink-0">
                          {profileImageUrl ? (
                            <img src={profileImageUrl} alt="User" className="size-full object-cover" />
                          ) : (
                            <div className="flex size-full items-center justify-center text-xs font-bold text-zinc-400">
                              {session?.user?.name?.[0]?.toUpperCase() || 'U'}
                            </div>
                          )}
                        </div>
                        <div className="flex flex-col min-w-0 flex-1">
                          <span className="text-sm font-bold text-zinc-100 truncate">{session?.user?.name}</span>
                          <span className="text-[10px] font-bold text-orange-500 uppercase tracking-widest">Admin</span>
                        </div>
                        <ChevronRight className="size-4 text-zinc-600" />
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </header>

          {/* Scrollable Content with Minimal Scrollbar */}
          <main className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar">
            <div className="p-8">
              {children}
            </div>
          </main>
        </SidebarInset>
      </div>
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #18181b;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #27272a;
        }
      `}</style>
    </SidebarProvider>
  )
}
