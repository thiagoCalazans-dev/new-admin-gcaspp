import { Skeleton } from "@/src/components/ui/skeleton";

export default function Loading() {
  return (
    <>
      <div className="flex-1 space-y-4 pt-6 container">
        <div className="flex items-center justify-between">
          <Skeleton className="h-9 w-56" />
          <Skeleton className="h-8 w-32" />
        </div>
        <Skeleton className="h-[36rem]" />
      </div>
    </>
  );
}
