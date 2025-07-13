import { supabase } from "@/lib/supabaseClient";
import Editor from "@/components/editor";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = await params;

  const { data: page } = await supabase
    .from("pages")
    .select("*")
    .eq("id", id)
    .single();

  if (!page) return notFound();

  const { data: blocks } = await supabase
    .from("blocks")
    .select("*")
    .eq("page_id", id)
    .order("position");

  return <Editor page={page} blocks={blocks || []} />;
}