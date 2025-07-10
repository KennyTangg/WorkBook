import { ReactNode } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default async function DashboardLayout({ children }: DashboardLayoutProps) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    redirect("/");
  }

  const { data: pages } = await supabase.from("pages").select("*").eq("user_id", user.id);

  let { data: profile, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (error && error.code === "PGRST116") {
    const defaultProfile = {
      id: user.id,
      username:
        user.user_metadata.full_name ||
        user.email?.split("@")[0] ||
        "Anonymous",
      email: user.email,
      avatar_url: user.user_metadata.avatar_url || null,
    };

    const { error: insertError } = await supabase
      .from("profiles")
      .insert(defaultProfile);

    if (insertError) {
      console.error("Failed to create default profile:", insertError.message);
      redirect("/error");
    }

    const { data: newProfile } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    profile = newProfile;
  }

  return (
    <SidebarProvider>
      <AppSidebar pages={pages || []}
        user={{
          id: user.id,
          name: profile.username,
          email: profile.email,
          avatar: profile.avatar_url || "/default-avatar.png",
        }}
      />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center w-full px-4 sm:px-8">
            <SidebarTrigger className="-ml-1" />
            <h1 className="font-light text-xl select-none cursor-pointer transition-opacity hover:opacity-60 ml-auto">
              WorkBook
            </h1>
          </div>
        </header>
        <div className="min-h-screen max-w-6xl w-full mx-auto">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
