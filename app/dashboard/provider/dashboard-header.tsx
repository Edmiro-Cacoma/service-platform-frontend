"use client"

import Link from "next/link"
import { Bell, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SidebarTrigger } from "@/components/ui/sidebar"

export function DashboardHeader() {
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6">
      <SidebarTrigger />

      <div className="hidden w-full max-w-sm md:flex">
        <div className="relative w-full">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Pesquisar..."
            className="w-full rounded-lg bg-background pl-8 md:w-[300px] lg:w-[400px]"
          />
        </div>
      </div>

      <div className="ml-auto flex items-center gap-2">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500" />
        </Button>

        <div className="hidden md:flex md:gap-2">
          <Button variant="outline" asChild>
            <Link href="/dashboard/services/new">Novo Serviço</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
