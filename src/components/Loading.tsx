import { Skeleton } from "@/components/ui/skeleton";

export function Loading() {
  return (
    <div className="flex flex-col gap-6">
      <Skeleton className="h-[170px] w-full" />
      <Skeleton className="h-[40px] w-full" />
    </div>
  );
}
