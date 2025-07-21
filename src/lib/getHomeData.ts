import { createClient } from "@/utils/supabase/server";
import { createSafeUsername } from "@/utils/helpers";
import { SupabaseUser, UserProfile, HomePage } from "@/types";

export interface HomeData {
  userId: {
    id: string;
    username: string;
  };
  pages: HomePage[];
}

export async function getHomeData() {
  const supabase = createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    throw new Error("You are not authenticated.");
  }

  const { data: pagesData, error: pagesError } = await supabase
    .from("pages")
    .select("*")
    .eq("user_id", user.id)
    .order("updated_at", { ascending: false })
    .limit(6);

  if (pagesError) {
    throw new Error("Error fetching pages: " + pagesError.message);
  }

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (profileError) {
    throw new Error("Error fetching profile: " + profileError.message);
  }

  const safeUsername = createSafeUsername(user as SupabaseUser, profile as UserProfile);

  return {
    userId: {
      id: user.id,
      username: safeUsername,
    },
    pages: pagesData as HomePage[],
  };
}
