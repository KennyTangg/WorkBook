import Editor from "@/components/editor";
import { getPageData } from "@/lib/getPageData";
import { notFound } from "next/navigation";

export const revalidate = 60;

export default async function Page({ params }: { params: { id: string } }) {
  const data = await getPageData(params.id);
  
  if (!data) return notFound();

  return <Editor profile={data.profile} page={data.page} blocks={data.blocks} />;
}