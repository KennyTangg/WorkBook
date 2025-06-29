import { ReactNode } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import Logo from "@/components/ui/Logo"

interface DashboardLayoutProps {
  children: ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
            <div className="flex items-center w-full px-4 sm:px-8">
                <SidebarTrigger className="-ml-1" />
                <h1 className="font-bold text-lg select-none cursor-pointer transition-opacity hover:opacity-60 ml-auto">WorkBook</h1>
            </div>
        </header>
        <div className="min-h-screen max-w-6xl w-full mx-auto">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
