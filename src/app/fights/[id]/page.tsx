import React, { Suspense } from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import FightProfileSkeleton from "@/components/FightProfile/FightProfileSkeleton";
import FightProfile from "@/components/FightProfile/FightProfile";

export default async function FighterPage({
  params,
}: {
  params: { id: string };
}) {
  const session = await getServerSession();

  if (!session || !session.user) {
    redirect("/login");
  }

  return (
    <div className="flex flex-col items-center min-h-screen pt-20">
      <div className="w-full max-w-5xl mx-auto px-4">
        <h1 className="mb-5 text-2xl font-bold text-left">Fight {params.id}</h1>
      </div>

      <div className="w-full max-w-5xl mx-auto px-4 flex flex-col space-y-4">
        <Suspense fallback={<FightProfileSkeleton />}>
          <FightProfile params={params} />
        </Suspense>
      </div>

      <div className="w-full max-w-5xl mx-auto px-4 mb-10"></div>
    </div>
  );
}
