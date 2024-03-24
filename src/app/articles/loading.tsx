import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex-col items-center justify-center space-y-2">
      <Skeleton className="h-8 w-[90dvw]" />
      <Skeleton className="h-48 w-[90dvw]" />
      <Skeleton className="h-48 w-[90dvw]" />
    </div>
  );
}
