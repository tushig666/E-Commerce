import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="pb-10 text-center">
          <Skeleton className="mx-auto h-12 w-64" />
          <Skeleton className="mx-auto mt-4 h-6 w-96" />
        </div>
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="group relative">
              <div className="aspect-[3/4] w-full overflow-hidden bg-secondary">
                <Skeleton className="h-full w-full" />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="mt-2 h-4 w-1/2" />
                </div>
                <Skeleton className="h-5 w-12" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
