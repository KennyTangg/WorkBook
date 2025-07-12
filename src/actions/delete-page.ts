"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function deletePage(pageId: string, userId: string) {
  const supabase = createClient();

  const { error } = await supabase
    .from("pages")
    .delete()
    .eq("id", pageId)
    .eq("user_id", userId);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/dashboard/home");

  return { success: true };
}