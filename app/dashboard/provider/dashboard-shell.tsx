"use client"

import type { ReactNode } from "react"
import { usePathname } from "next/navigation"
import { DashboardNav } from "@/app/dashboard/provider/dashboard-nav"
import { DashboardHeader } from "@/app/dashboard/provider/dashboard-header"
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarProvider } from "@/components/ui/sidebar"

interface DashboardShellProps {
    children: ReactNode
}

export function DashboardShell({ children }: DashboardShellProps) {
    const pathname = usePathname()

    return (
        <SidebarProvider defaultOpen={true}>
            <div className="flex min-h-screen flex-col">
                <DashboardHeader />
                <div className="flex flex-1">
                    <Sidebar className="border-r">
                        <SidebarHeader className="border-b px-6 py-3">
                            <h2 className="text-lg font-semibold">Service Platform</h2>
                        </SidebarHeader>
                        <SidebarContent>
                            <DashboardNav pathname={pathname} />
                        </SidebarContent>
                        <SidebarFooter className="border-t p-4">
                            <div className="flex items-center gap-2">
                                <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
                                    U
                                </div>
                                <div>
                                    <p className="text-sm font-medium">Usuário</p>
                                    <p className="text-xs text-muted-foreground">usuario@exemplo.com</p>
                                </div>
                            </div>
                        </SidebarFooter>
                    </Sidebar>
                    <main className="flex-1 overflow-auto p-6">{children}</main>
                </div>
            </div>
        </SidebarProvider>
    )
}
