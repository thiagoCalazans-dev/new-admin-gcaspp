import { Skeleton } from "@/src/components/ui/skeleton";

export default function Loading() {
  return (
    <>
      <div className="flex-1 space-y-4 pt-6">
        <div className="flex items-center justify-between">
          <Skeleton className="h-16 w-56" />

          <Skeleton className="h-16 w-32" />
        </div>
        <Skeleton className="h-[60rem]" />
      </div>
    </>
  );
}
