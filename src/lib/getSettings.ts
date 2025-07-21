import { createClient } from "@/utils/supabase/server";

export const getSettingsData = async () => {
  const supabase = createClient();
  const { data: { user }} = await supabase.auth.getUser();

  if (!user) return { user: null, profile: null };

  const { data: profile } = await supabase
    .from("profiles")
    .select("username")
    .eq("id", user.id)
    .single();

  const provider = user.app_metadata?.provider ?? "email";
  const userData = {
    id: user.id,
    email: user.email ?? "",
    username:
      profile?.username ||
      user.user_metadata?.username ||
      user.user_metadata?.full_name ||
      user.email?.split("@")[0] ||
      "Anonymous",
    hasPassword: provider === "email",
  };

  return { user: userData };
}
