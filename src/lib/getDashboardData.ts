import { createClient } from "@/utils/supabase/server";
import { cache } from "react";

export const getDashboardData = cache(async (userId: string) => {
  const supabase = createClient();

  const { data: pages = [], error: pagesError } = await supabase
    .from("pages")
    .select("*")
    .eq("user_id", userId);

  if (pagesError) {
    console.error("Error fetching pages:", pagesError.message);
  }

  // Try to get the profile
  let { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .maybeSingle();

  if (!profile) {
    const { data: userData, error: userError } = await supabase.auth.getUser();

    if (userError || !userData?.user) {
      console.error("Error fetching user:", userError?.message);
      throw new Error("Failed to fetch user data");
    }

    const defaultProfile = {
      id: userId,
      username:
        userData.user.user_metadata?.full_name ||
        userData.user.email?.split("@")[0] ||
        "Anonymous",
      email: userData.user.email,
      avatar_url: userData.user.user_metadata?.avatar_url || null,
      subscription_tier: "free",
      daily_call_count: 0,
    };

    const { error: insertError } = await supabase
      .from("profiles")
      .insert(defaultProfile);

    if (insertError) {
      console.error("Failed to create default profile:", insertError.message);
      throw new Error("Profile creation failed");
    }

    const { data: newProfile, error: fetchError } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();

    if (fetchError || !newProfile) {
      throw new Error("Failed to fetch newly created profile");
    }

    profile = newProfile;
  }

  return { pages, profile };
});
