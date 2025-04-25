"use client"

import Link from "next/link"
import { Home, Briefcase, MessageSquare, User, Settings, HelpCircle } from "lucide-react"

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
} from "@/components/ui/sidebar"

interface DashboardNavProps {
  pathname: string
}

export function DashboardNav({ pathname }: DashboardNavProps) {
  const routes = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: Home,
    },
    {
      title: "Meus Serviços",
      href: "/dashboard/services",
      icon: Briefcase,
    },
    {
      title: "Mensagens",
      href: "/dashboard/messages",
      icon: MessageSquare,
    },
    {
      title: "Perfil",
      href: "/dashboard/profile",
      icon: User,
    },
    {
      title: "Configurações",
      href: "/dashboard/settings",
      icon: Settings,
    },
    {
      title: "Ajuda",
      href: "/dashboard/help",
      icon: HelpCircle,
    },
  ]

  return (
    <div className="flex flex-col gap-4 p-2">
      <SidebarGroup>
        <SidebarGroupLabel>Menu Principal</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {routes.map((route) => (
              <SidebarMenuItem key={route.href}>
                <SidebarMenuButton asChild isActive={pathname === route.href}>
                  <Link href={route.href}>
                    <route.icon className="h-4 w-4" />
                    <span>{route.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </div>
  )
}
