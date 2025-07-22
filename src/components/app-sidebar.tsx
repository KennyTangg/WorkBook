"use client";

import * as React from "react";
import { CreditCard, Frame, Home, LayoutPanelTop, Search, Settings, SquarePen } from "lucide-react";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { LogoSidebar } from "@/components/logo-sidebar";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { createNewPage } from "@/actions/create-page";
import { comingSoon } from "@/utils/helpers";
import Link from "next/link";

export function AppSidebar({ user, pages, ...props } : {
  user: {
    id: string;
    name: string;
    email: string;
    avatar: string | null;
    plan: string;
  };
    pages: {
    id: string;
    title: string | null;
  }[]
} & React.ComponentProps<typeof Sidebar>) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isRedirect, startRedirect] = useTransition();

  const handleNewPage = async () => {
    startTransition(async () => {
      const page = await createNewPage(user.id);
      router.push(`/dashboard/pages/${page.id}`);
    });
  };
  
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <LogoSidebar />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton onClick={comingSoon} className="hover:cursor-pointer">
                <Search />
                <span>Search</span>
              </SidebarMenuButton>
              <SidebarMenuButton asChild className="hover:cursor-pointer">
                <Link href="/dashboard/home" prefetch passHref>
                  <Home />
                  <span>Home</span>
                </Link>
              </SidebarMenuButton>
              <SidebarMenuButton className="hover:cursor-pointer" onClick={handleNewPage} disabled={isPending}>
                <SquarePen />
                <span>{isPending ? "Creating..." : "New Page"}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
        <NavProjects userId={user.id} projects={pages.map(page => ({
            id: page.id,
            name: page.title || "Untitled",
            url: `/dashboard/pages/${page.id}`,
            icon: Frame
          }))} />
        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton className="hover:cursor-pointer" onClick={comingSoon}>
                  <LayoutPanelTop />
                  <span>Templates</span>
              </SidebarMenuButton>
              <Link href={"/pricing"} passHref>
                <SidebarMenuButton
                  className="hover:cursor-pointer"
                  onClick={() => {
                    startRedirect(() => {
                      router.push("/pricing");
                    });
                  }}
                  disabled={isRedirect}
                >
                  <CreditCard />
                  <span>{isRedirect ? "Redirecting..." : "Pricing"}</span>
                </SidebarMenuButton>
              </Link>
              <Link href={"/dashboard/settings"} passHref>
                <SidebarMenuButton className="hover:cursor-pointer">
                    <Settings />
                    <span>Settings</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}

export default AppSidebar;
