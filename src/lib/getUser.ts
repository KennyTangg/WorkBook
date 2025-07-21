"use server";
import { createClient } from "@/utils/supabase/server";
import { cache } from "react";

export const getUser = cache(async () => {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    return user ?? null;
});