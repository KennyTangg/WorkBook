import { createClient } from "@/utils/supabase/server";
import { cache } from "react";

export const getDashboardData = cache(async (userId: string) => {
  const supabase = createClient();

  const { data: pages } = await supabase
    .from("pages")
    .select("*")
    .eq("user_id", userId);

  const { data: initialProfile, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  let profile = initialProfile;

  if (error && error.code === "PGRST116") {
    const { data: userData } = await supabase.auth.getUser();

    const defaultProfile = {
      id: userId,
      username:
        userData?.user?.user_metadata.full_name ||
        userData?.user?.email?.split("@")[0] ||
        "Anonymous",
      email: userData?.user?.email,
      avatar_url: userData?.user?.user_metadata.avatar_url || null,
    };

    const { error: insertError } = await supabase
      .from("profiles")
      .insert(defaultProfile);

    if (insertError) {
      console.error("Failed to create default profile:", insertError.message);
      throw new Error("Profile creation failed");
    }

    const { data: newProfile } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();

    profile = newProfile;
  }

  return { pages: pages || [], profile };
});
