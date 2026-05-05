"use client"

import * as React from "react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupContent,
  SidebarTrigger,
  useSidebar
} from "@/components/ui/sidebar"
import { 
  Folder, 
  LayoutDashboard, 
  Settings, 
  CreditCard, 
  HelpCircle, 
  ArrowRight,
  ChevronDown,
  Search,
  Bell,
  Layers,
  BarChart3,
  BookOpen,
  User,
  Puzzle,
  Component,
  Menu
} from "lucide-react"
import { Icon } from "@iconify/react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"

const navItems = [
  { title: "Repositories", icon: Layers, url: "/repositories" },
  { title: "Dashboard", icon: LayoutDashboard, url: "#" },
  { title: "Integrations", icon: Puzzle, url: "#" },
  { title: "Reports", icon: BarChart3, url: "#" },
  { title: "Learnings", icon: BookOpen, url: "#" },
  { title: "Plan", icon: CreditCard, url: "#" },
  { title: "Organization Settings", icon: Settings, url: "#" },
  { title: "Account", icon: User, url: "/account" },
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()

  return (
    <Sidebar collapsible="icon" className="border-r border-zinc-900 bg-zinc-950" {...props}>
      <SidebarHeader className="h-14 flex items-center border-b border-zinc-900 px-4 group-data-[collapsible=icon]:px-0">
        <SidebarMenu>
          <SidebarMenuItem className="w-full flex justify-center">
            <SidebarMenuButton size="lg" className="hover:bg-zinc-900 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:w-10 group-data-[collapsible=icon]:mx-auto">
              <div className="flex items-center gap-3 w-full group-data-[collapsible=icon]:justify-center">
                <Icon icon="logos:github-icon" className="size-5 shrink-0 invert" />
                <span className="font-semibold text-zinc-100 group-data-[collapsible=icon]:hidden">lwshakib</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup className="group-data-[collapsible=icon]:px-0">
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => {
                const isActive = pathname === item.url
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton 
                      tooltip={item.title}
                      asChild
                      className={cn(
                        "flex items-center gap-3 rounded-md transition-all duration-200 w-full group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:w-10 group-data-[collapsible=icon]:mx-auto",
                        isActive 
                          ? "bg-zinc-900 text-zinc-100 shadow-sm" 
                          : "text-zinc-400 hover:bg-zinc-900/50 hover:text-zinc-100"
                      )}
                    >
                      <Link href={item.url}>
                        <div className="flex items-center justify-center shrink-0">
                          <item.icon className="size-4 shrink-0" />
                        </div>
                        <span className="font-medium group-data-[collapsible=icon]:hidden">{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 group-data-[collapsible=icon]:p-0 group-data-[collapsible=icon]:py-4 flex flex-col gap-4">
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-4 group-data-[collapsible=icon]:hidden">
          <div className="flex items-center justify-between">
            <span className="text-[13px] font-medium text-zinc-100">
              Get started with <span className="text-orange-500">PulseGrid</span>
            </span>
            <ArrowRight className="size-3.5 text-zinc-400" />
          </div>
          <p className="mt-1 text-[11px] text-zinc-500">
            Up Next: Personalize PulseGrid
          </p>
        </div>
        <div className="flex w-full items-center justify-start group-data-[collapsible=icon]:justify-center px-1">
          <SidebarTrigger className="size-8 rounded-md bg-transparent border-none text-zinc-500 hover:bg-zinc-900 hover:text-zinc-100 shrink-0">
            <Menu className="size-5" />
          </SidebarTrigger>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
