'use client'

import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase/client";
import { HomePage, SupabaseUser, UserProfile } from "@/types";
import { createSafeUsername } from "@/utils/helpers";

interface UserId {
  id: string;
  username: string;
}

export function useHomeData() {
  const [userId, setUserId] = useState<UserId | null>(null);
  const [pages, setPages] = useState<HomePage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserAndPages = async () => {
      setLoading(true);

      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError || !user) {
        setError("You are not authenticated.");
        setLoading(false);
        return;
      }

      const { data: pagesData, error: pagesError } = await supabase
        .from("pages")
        .select("*")
        .eq("user_id", user.id)
        .order("updated_at", { ascending: false })
        .limit(6);

      const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      const safeUsername = createSafeUsername(user as SupabaseUser, profile as UserProfile);

      setUserId({
        id: user.id,
        username: safeUsername,
      });

      if (pagesError) {
        setError(pagesError.message);
      } else {
        setPages(pagesData as HomePage[]);
      }

      setLoading(false);
    };

    fetchUserAndPages();
  }, []);

  return { userId, pages, loading, error };
}
