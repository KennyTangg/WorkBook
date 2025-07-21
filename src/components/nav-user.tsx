"use client";

import { SidebarMenu, SidebarMenuItem, SidebarMenuButton, useSidebar } from "@/components/ui/sidebar";
import { DropdownMenu, DropdownMenuTrigger,DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem, DropdownMenuGroup } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ChevronsUpDown, Sparkles, BadgeCheck, CreditCard, Bell, LogOut } from "lucide-react";
import { Dialog,DialogContent, DialogHeader,  DialogTitle, DialogDescription, DialogFooter, DialogClose} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { supabase } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { comingSoon } from "@/utils/helpers";
import Link from "next/link";

export function NavUser({ user }: {
  user: {
    id: string;
    name: string;
    email: string;
    avatar: string | null;
    plan: string;
  };
}) {
  const { isMobile } = useSidebar();
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const router = useRouter();
  const displayName = user.name?.trim() || "Anonymous";
  const displayEmail = user.email?.trim() || "No email";
  const displayPlan = user.plan[0].toUpperCase() + user.plan.slice(1);

  const handleSignOut = async () => {
    setIsLoggingOut(true);
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error signing out:", error.message);
      setIsLoggingOut(false);
      return;
    }
    router.push("/");
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton size="lg">
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage
                  src={user.avatar || "/default-avatar.png"}
                  alt={displayName}
                />
                <AvatarFallback className="rounded-lg">
                  {displayName[0]?.toUpperCase() || "WB"}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{displayName}</span>
                <span className="truncate text-xs">{displayEmail}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage
                    src={user.avatar || "/default-avatar.png"}
                    alt={displayName}
                  />
                  <AvatarFallback className="rounded-lg">
                    {displayName[0]?.toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{displayName}</span>
                  <span className="truncate text-xs flex items-center gap-1">
                    Pricing Plan : 
                    <span className="font-medium">{displayPlan}</span>
                    <Sparkles className="size-3 text-foreground" /> 
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              <DropdownMenuItem  onClick={comingSoon}>
                <BadgeCheck />
                Account
              </DropdownMenuItem>
              <Link href='/pricing' passHref prefetch>
                <DropdownMenuItem>
                  <CreditCard />
                  Pricing
                </DropdownMenuItem>
              </Link>
              <DropdownMenuItem  onClick={comingSoon}>
                <Bell />
                Notifications
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setLogoutDialogOpen(true)}>
              <LogOut /> Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Dialog open={logoutDialogOpen} onOpenChange={setLogoutDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Log Out</DialogTitle>
              <DialogDescription>
                Are you sure you want to log out?
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button
                onClick={handleSignOut}
                type="button"
                variant="destructive"
                disabled={isLoggingOut}
              >
                {isLoggingOut ? "Logging out..." : "Log Out"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
