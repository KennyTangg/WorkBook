// components/dashboard-content.tsx

"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { HomePage } from "@/types";
import { comingSoon } from "@/utils/helpers";


interface HomeContentProps {
  pages: HomePage[];
  loading: boolean;
  error: string | null;
  userId: {
    id: string;
    username: string;
  } | null;
}

export default function HomeContent({
  pages,
  loading,
  error,
  userId
}: HomeContentProps) {
  return (
    <main className="min-h-screen flex flex-col items-center justify-start px-4 py-12">
      <div className="flex flex-col items-center justify-center gap-3">
        <motion.div
          className="w-8 sm:w-10 shadow-md bg-primary aspect-square rounded-lg"
          animate={{
            scale: [0.5, 1, 1, 0.5],
            rotate: [0, 90, 90, 0],
            borderRadius: ["10%", "10%", "50%", "10%"],
          }}
          transition={{ duration: 4, ease: "easeInOut", repeat: Infinity }}
        />
        <h1 className="font-bold text-2xl sm:text-3xl text-center text-foreground">
          Welcome back, {userId?.username || "Anonymous"}!
        </h1>
        <p className="text-muted-foreground text-center text-sm">
          Your minimal block-based editor for notes, ideas & tasks.
        </p>
      </div>

      <div className="flex flex-wrap gap-4 mt-8">
        <Button size="lg">+ New Page</Button>
        <Button onClick={comingSoon} variant="outline" size="lg">
          Browse Templates
        </Button>
      </div>

      <div className="w-full max-w-4xl mt-12">
        <h2 className="text-lg font-semibold mb-4">Recent Pages</h2>

        {loading && <p className="text-muted-foreground">Loading...</p>}

        {error && (
          <p className="text-destructive">Something went wrong: {error}</p>
        )}

        {!loading && pages.length === 0 && (
          <p className="text-muted-foreground text-sm">
            You have no pages yet. Create your first one!
          </p>
        )}

        {!loading && pages.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {pages.map((page) => (
              <div
                key={page.id}
                className="bg-muted rounded-lg p-4 hover:shadow-md transition cursor-pointer"
              >
                <h3 className="font-medium">{page.title || "Untitled"}</h3>
                <p className="text-xs text-muted-foreground">
                  Updated {new Date(page.updated_at).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}