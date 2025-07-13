'use client'

import HomeContent from "@/components/home-content";
import { useHomeData } from "@/hooks/useHomeData";

export default function HomePageContainer() {
  const { userId, pages, loading, error } = useHomeData();

  return (
    <HomeContent userId={userId} pages={pages} loading={loading} error={error} />
  );
}