import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-start px-4 py-12">
      <div className="flex flex-col items-center justify-center gap-3">
        <Skeleton className="w-10 h-10 rounded-full shadow-md" />
        <Skeleton className="h-8 w-60 rounded" />
        <Skeleton className="h-4 w-72 rounded" />
      </div>

      <div className="flex flex-wrap gap-4 mt-8 w-full justify-center">
        <Skeleton className="h-12 w-40 rounded-md" />
        <Skeleton className="h-12 w-40 rounded-md" />
      </div>

      <div className="w-full max-w-4xl mt-12">
        <Skeleton className="h-6 w-40 mb-6 rounded" />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="space-y-2 bg-muted rounded-lg p-4">
              <Skeleton className="h-5 w-32 rounded" />
              <Skeleton className="h-4 w-24 rounded" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
