import { cache } from "react";
import { createClient } from "@/utils/supabase/server";

export const getPageData = cache(async (id: string) => {
    const supabase = createClient()
    const { data: page } = await supabase
        .from("pages")
        .select("*")
        .eq("id", id)
        .single();

    if (!page) return null;

    const { data: blocks } = await supabase
        .from("blocks")
        .select("*")
        .eq("page_id", id)
        .order("position", { ascending: true });

    return { page, blocks: blocks || [] };
});