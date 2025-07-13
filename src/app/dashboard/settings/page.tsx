import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import ClientSettings from "@/components/settings-theme";

export default async function SettingsPage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  const provider = user.app_metadata?.provider ?? 'email';
  const userData = {
    id: user.id,
    email: user.email ?? "",
    username:
      profile?.username ||
      user.user_metadata?.username ||
      user.user_metadata?.full_name ||
      user.email?.split("@")[0] ||
      "John Doe",
    hasPassword: provider === 'email'
  };

  return (
    <>
      <ClientSettings user={userData} />
    </>
  );
}