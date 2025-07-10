"use server"

import { createClient } from "@/utils/supabase/server";

export async function createNewPage(user_id: string) {
  const supabase = createClient();

  const { data: page, error } = await supabase
    .from("pages")
    .insert({
      user_id,
    })
    .select("*")
    .single();

  if (error) throw new Error(error.message);
  return page;
}
