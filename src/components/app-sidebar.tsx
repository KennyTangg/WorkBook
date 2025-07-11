"use client";

import * as React from "react";
import { Frame, GalleryVerticalEnd, Home, Map, PieChart, Search, Settings, SquarePen, Trash2 } from "lucide-react";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarRail } from "@/components/ui/sidebar";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { createNewPage } from "@/actions/create-page";

export function AppSidebar({ user, pages, ...props } : {
  user: {
    id: string;
    name: string;
    email: string;
    avatar: string | null;
  };
    pages: {
    id: string;
    title: string | null;
  }[]
} & React.ComponentProps<typeof Sidebar>) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleNewPage = async () => {
    startTransition(async () => {
      const page = await createNewPage(user.id);
      router.push(`/dashboard/pages/${page.id}`);
    });
  };

  const teams = [
    {
      name: "WorkBook Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
  ];

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={teams} />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton className="hover:cursor-pointer">
                <Search />
                <span>Search</span>
              </SidebarMenuButton>
              <SidebarMenuButton asChild className="hover:cursor-pointer">
                <a href="/dashboard/home">
                  <Home />
                  <span>Home</span>
                </a>
              </SidebarMenuButton>
              <SidebarMenuButton className="hover:cursor-pointer" onClick={handleNewPage} disabled={isPending}>
                <SquarePen />
                <span>{isPending ? "Creating..." : "New Page"}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
        <NavProjects projects={pages.map(page => ({
            id: page.id,
            name: page.title || "Untitled",
            url: `/dashboard/pages/${page.id}`,
            icon: Frame
          }))} />
        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton className="hover:cursor-pointer" tooltip="Manage your account and settings">
                <Settings />
                <span>Settings</span>
              </SidebarMenuButton>
              <SidebarMenuButton className="hover:cursor-pointer">
                <Trash2 />
                <span>Trash</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}

export default AppSidebar;
