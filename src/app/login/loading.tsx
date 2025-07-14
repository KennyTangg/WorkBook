import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft } from "lucide-react";

export default function LoadingLogin() {
  return (
    <main className="min-h-screen w-full flex items-center justify-center px-4 sm:px-6 lg:px-8 relative">
      <div className="absolute top-8 left-10 flex items-center gap-1 text-base sm:text-lg text-muted-foreground">
        <ArrowLeft className="size-4 sm:size-5" /> Back
      </div>

      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-3 items-center gap-8 lg:gap-12">
        <div className="hidden lg:block lg:col-span-2">
          <Skeleton className="w-full h-[500px] max-w-2xl rounded-lg" />
        </div>

        <div className="w-full max-w-md mx-auto lg:mx-0 space-y-6">
          <Skeleton className="h-8 w-32 mx-auto rounded-md" />
          <div className="w-full h-auto lg:max-w-sm shadow-md p-6 space-y-4">
            <Skeleton className="h-6 w-2/3 mb-2 rounded" />
            <Skeleton className="h-4 w-full mb-4 rounded" />

            <div className="space-y-4">
              <Skeleton className="h-4 w-1/3 rounded" />
              <Skeleton className="h-10 w-full rounded-md" />

              <Skeleton className="h-4 w-1/3 rounded mt-4" />
              <Skeleton className="h-10 w-full rounded-md" />
            </div>

            <Skeleton className="h-10 w-full rounded-md mt-6" />
            <Skeleton className="h-10 w-full rounded-md" />
          </div>
        </div>
      </div>
    </main>
  );
}