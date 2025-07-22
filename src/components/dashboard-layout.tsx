import { ReactNode } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { getDashboardData } from "@/lib/getDashboardData";
import { getUser } from "@/lib/getUser";
import { redirect } from "next/navigation";
import { NotebookText } from "lucide-react";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default async function DashboardLayout({ children }: DashboardLayoutProps) {
  const user = await getUser();
  if (!user) redirect("/");

  const { pages, profile } = await getDashboardData(user.id);
  return (
    <SidebarProvider>
      <AppSidebar
        pages={pages}
        user={{
          id: user.id,
          name: profile?.username,
          email: profile?.email,
          avatar: profile?.avatar_url,
          plan:profile?.subscription_tier
        }}
      />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center w-full px-6 sm:pl-4 sm:pr-8">
            <SidebarTrigger className="ml-1" />
            <div className="ml-auto flex items-center gap-1">
              <NotebookText className="size-5 stroke-1"/>
              <h1 className="font-light text-xl select-none"> WorkBook </h1>
            </div>
          </div>
        </header>
        <div className="min-h-screen max-w-6xl w-full mx-auto">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
