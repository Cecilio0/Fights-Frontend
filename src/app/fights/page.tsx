import FightsTable from "@/components/FightsTable/FightsTable";
import FightsTableSkeleton from "@/components/FightsTable/FightsTableSkeleton";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default async function Fights() {
  const session = await getServerSession();

  if (!session || !session.user) {
    redirect("/login");
  }

  return (
    <div className="flex flex-col items-center min-h-screen pt-20">
      <div className="w-full max-w-5xl mx-auto px-4">
        <h1 className="mb-5 text-2xl font-bold text-left">Fights</h1>
      </div>

      <div className="w-full max-w-5xl mx-auto px-4 flex flex-col space-y-4">
        <Suspense fallback={<FightsTableSkeleton />}>
          <FightsTable />
        </Suspense>
      </div>

      <div className="w-full max-w-5xl mx-auto px-4 mb-10"></div>
    </div>
  );
}
