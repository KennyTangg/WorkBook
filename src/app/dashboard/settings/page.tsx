import { redirect } from "next/navigation";
import ClientSettings from "@/components/settings-theme";
import { getSettingsData } from "@/lib/getSettings";

export default async function SettingsPage() {
  const { user } = await getSettingsData();

  if (!user) {
    redirect("/");
  }

  return <ClientSettings user={user} />;
}
