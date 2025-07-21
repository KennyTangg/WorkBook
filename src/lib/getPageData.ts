import { cache } from "react";
import { createClient } from "@/utils/supabase/server";

export const getPageData = cache(async (id: string) => {
    const supabase = createClient()
    
    const { data: page } = await supabase
        .from("pages")
        .select("*")
        .eq("id", id)
        .single();

    const { data: blocks } = await supabase
        .from("blocks")
        .select("*")
        .eq("page_id", id)
        .order("position", { ascending: true });

    const { data: profile } = await supabase
        .from("profiles")
        .select("subscription_tier, daily_call_count")
        .eq("id", page.user_id)
        .single();

    if (!profile){
        throw new Error("Invalid data");
    }

    return { profile, page, blocks: blocks || [] };
});