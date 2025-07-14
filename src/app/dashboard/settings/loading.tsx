"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function SettingsLoading() {
  return (
    <main className="max-w-5xl mx-auto py-12 px-6 space-y-8">
      <Skeleton className="h-10 w-40 ml-2" />

      <Card>
        <CardHeader className="mb-4">
          <Skeleton className="h-6 w-32" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-10 w-[180px]" />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-24" />
        </CardHeader>
        <CardContent className="space-y-4 mt-4">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-10 w-full sm:w-[300px]" />

          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-10 w-full sm:w-[300px]" />
          <Button disabled className="w-[160px]">Updating...</Button>
        </CardContent>
      </Card>
    </main>
  );
}
