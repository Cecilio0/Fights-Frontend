import { Skeleton } from "@/components/ui/skeleton";

export default function FightSkeleton() {
  return (
    <div className="flex space-x-6 justify-center align-middle">
      <div className="flex flex-col items-start space-y-6">
        <Skeleton className="text-3xl font-bold w-full h-5" />
        <Skeleton className="text-xl font-semibold w-full h-5" />
        <Skeleton className="text-sm w-full h-4" />
        <Skeleton className="text-sm w-full h-4" />
      </div>

      <div className="flex flex-col space-y-6">
        <Skeleton className="h-32 w-[850px] rounded-xl" />
        <Skeleton className="h-32 h-[400px] w-[850px] rounded-xl" />
      </div>
    </div>
  );
}
