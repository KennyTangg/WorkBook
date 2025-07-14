import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingPage() {
  return (
    <main className="px-8 sm:px-6 xl:px-2">
      <header className="flex items-center gap-2">
        <Skeleton className="h-10 w-1/3 rounded" />
      </header>

      <hr className="mt-4 border-b-1 rounded-lg border-muted-foreground" />

      <section className="mt-6 space-y-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="space-y-3">
            <Skeleton className="h-6 w-2/3 rounded" />
            <Skeleton className="h-6 w-full rounded" />
          </div>
        ))}
      </section>

      <div className="flex justify-end gap-4 my-8">
        <Skeleton className="h-12 w-32 rounded-md" />
        <Skeleton className="h-12 w-48 rounded-md" />
      </div>
    </main>
  );
}
