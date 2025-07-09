"use client";

import * as React from "react";
import { Frame, GalleryVerticalEnd, Home, Map, PieChart, Search, Settings, SquarePen, Trash2 } from "lucide-react";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarRail } from "@/components/ui/sidebar";

export function AppSidebar({
  user,
  ...props
}: {
  user: {
    id: string;
    name: string;
    email: string;
    avatar: string | null;
  };
} & React.ComponentProps<typeof Sidebar>) {

  const teams = [
    {
      name: "WorkBook Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
  ];

  const projects = [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
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
              <SidebarMenuButton className="hover:cursor-pointer">
                <SquarePen />
                <span>New Page</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
        <NavProjects projects={projects} />
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
