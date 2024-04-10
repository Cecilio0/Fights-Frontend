import React, { Suspense } from "react";
import FightersTable from "@/components/FightersTable/FightersTable";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import FightersTableSkeleton from "@/components/FightersTable/FightersTableSkeleton";

export default async function Fighters() {
  const session = await getServerSession();

  if (!session || !session.user) {
    redirect("/login");
  }

  return (
    <div className="flex flex-col items-center min-h-screen pt-20">
      <div className="w-full max-w-5xl mx-auto px-4">
        <h1 className="mb-5 text-2xl font-bold text-left">Fighters</h1>
      </div>

      <div className="w-full max-w-5xl mx-auto px-4 flex flex-col space-y-4">
        <Suspense fallback={<FightersTableSkeleton />}>
          <FightersTable />
        </Suspense>
      </div>

      <div className="w-full max-w-5xl mx-auto px-4 mb-10"></div>
    </div>
  );
}
