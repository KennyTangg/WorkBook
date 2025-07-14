import HomeContent from "@/components/home-content";
import { getHomeData } from "@/lib/getHomeData";

export default async function HomePageContainer() {
  const { userId, pages } = await getHomeData();

  return (
    <HomeContent userId={userId} pages={pages}/>
  );
}