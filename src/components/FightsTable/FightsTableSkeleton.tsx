import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function FightsTableSkeleton() {
  return (
    <div>
      <div className="flex justify-between space-x-4 mb-4">
        <Skeleton className="h-8 w-[250px]" />
        <Skeleton className="h-8 w-[250px]" />
        <Skeleton className="h-8 w-[250px]" />
        <Skeleton className="h-8 w-[250px]" />
      </div>
      {[...Array(10)].map((_, i) => (
        <div key={i} className="flex justify-between space-x-4 mb-4">
          <Skeleton className="h-6 w-[250px]" />
          <Skeleton className="h-6 w-[250px]" />
          <Skeleton className="h-6 w-[250px]" />
          <Skeleton className="h-6 w-[250px]" />
        </div>
      ))}
    </div>
  );
}
