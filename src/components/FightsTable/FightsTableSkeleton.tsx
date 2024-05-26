import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function FightsTableSkeleton() {
  return (
    <div className="mx-auto max-w-5xl">
      <div className="flex justify-between space-x-4 mb-4">
        <Skeleton className="h-8 w-[80px]" />
        {/* <Skeleton className="h-8 w-8" /> */}
        <Skeleton className="h-8 w-[80px]" />
        {/* <Skeleton className="h-8 w-8" /> */}
        <Skeleton className="h-8 w-[80px]" />
      </div>
      {[...Array(10)].map((_, i) => (
        <div key={i} className="flex justify-between space-x-4 mb-4">
          <Skeleton className="h-6 w-[80px]" />
          {/* <Skeleton className="h-6 w-8" /> */}
          <Skeleton className="h-6 w-[80px]" />
          {/* <Skeleton className="h-6 w-8" /> */}
          <Skeleton className="h-6 w-[80px]" />
          <Skeleton className="h-6 w-[80px]" />
        </div>
      ))}
    </div>
  );
}
