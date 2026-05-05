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
      <div className="flex h-screen w-full bg-background overflow-hidden">
        <AppSidebar />
        <SidebarInset className="flex flex-col bg-background overflow-hidden">
          {/* Global Header - Sticky */}
          <header className="sticky top-0 z-40 flex h-14 shrink-0 items-center justify-between border-b border-border bg-background/80 backdrop-blur-md px-6">
            <div className="flex items-center gap-4">
              {/* Mobile Sidebar Trigger */}
              <div className="lg:hidden">
                <SidebarTrigger className="size-8 rounded-md bg-transparent border-none text-muted-foreground hover:bg-accent hover:text-accent-foreground" />
              </div>
              <h2 className="text-sm font-medium text-foreground">{pageTitle}</h2>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="relative hidden sm:flex items-center">
                <div className="flex h-8 items-center gap-2 rounded-md border border-border bg-muted/50 px-3 py-1.5 text-xs text-muted-foreground">
                  <SearchIcon className="size-3.5" />
                  <span>Search</span>
                  <div className="flex items-center gap-1 ml-4 border-l border-border pl-2">
                    <KeyboardIcon className="size-3" />
                    <span>Ctrl + K</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="rounded-md p-1.5 text-muted-foreground hover:bg-accent hover:text-accent-foreground">
                  <HelpCircleIcon className="size-4" />
                </button>
                <button className="rounded-md p-1.5 text-muted-foreground hover:bg-accent hover:text-accent-foreground">
                  <BellIcon className="size-4" />
                </button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="relative size-7 rounded-full bg-accent border border-border overflow-hidden outline-none focus:ring-1 focus:ring-ring">
                      {profileImageUrl ? (
                        <img src={profileImageUrl} alt="User" className="size-full object-cover" />
                      ) : (
                        <div className="flex size-full items-center justify-center bg-muted text-[10px] font-bold text-muted-foreground">
                          {session?.user?.name?.[0]?.toUpperCase() || 'U'}
                        </div>
                      )}
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-64 bg-popover border-border p-2 shadow-2xl">
                    <DropdownMenuItem asChild className="cursor-pointer focus:bg-accent focus:text-accent-foreground p-2 rounded-lg mb-1">
                      <Link href="/account" className="flex items-center gap-3 w-full">
                        <div className="size-10 rounded-full bg-muted border border-border overflow-hidden shrink-0">
                          {profileImageUrl ? (
                            <img src={profileImageUrl} alt="User" className="size-full object-cover" />
                          ) : (
                            <div className="flex size-full items-center justify-center text-xs font-bold text-muted-foreground">
                              {session?.user?.name?.[0]?.toUpperCase() || 'U'}
                            </div>
                          )}
                        </div>
                        <div className="flex flex-col min-w-0 flex-1">
                          <span className="text-sm font-bold text-foreground truncate">{session?.user?.email?.split('@')[0] || session?.user?.name}</span>
                          <span className="text-[10px] font-bold text-primary">Admin</span>
                        </div>
                        <ChevronRight className="size-4 text-muted-foreground" />
                      </Link>
                    </DropdownMenuItem>

                    <DropdownMenuSeparator className="bg-border my-1" />

                    <div className="flex items-center justify-between px-2 py-1">
                      <div className="flex items-center gap-2">
                        <Icon icon="lucide:swatchbook" className="size-4 text-muted-foreground" />
                        <span className="text-sm font-medium text-foreground">Theme</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className={cn("size-8 rounded-md", theme === 'light' ? "text-foreground bg-accent" : "text-muted-foreground hover:text-foreground")}
                          onClick={() => setTheme('light')}
                        >
                          <Sun className="size-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className={cn("size-8 rounded-md", theme === 'dark' ? "text-foreground bg-accent" : "text-muted-foreground hover:text-foreground")}
                          onClick={() => setTheme('dark')}
                        >
                          <Moon className="size-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className={cn("size-8 rounded-md", theme === 'system' ? "text-foreground bg-accent" : "text-muted-foreground hover:text-foreground")}
                          onClick={() => setTheme('system')}
                        >
                          <Monitor className="size-4" />
                        </Button>
                      </div>
                    </div>

                    <DropdownMenuSeparator className="bg-border my-1" />

                    <DropdownMenuItem 
                      onClick={handleLogout}
                      className="flex items-center gap-2 p-2 rounded-lg cursor-pointer text-foreground hover:text-foreground focus:text-foreground focus:bg-accent"
                    >
                      <LogOut className="size-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Logout</span>
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
          background: #e4e4e7;
          border-radius: 10px;
        }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #18181b;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #d4d4d8;
        }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #27272a;
        }
      `}</style>
    </SidebarProvider>
  )
}
