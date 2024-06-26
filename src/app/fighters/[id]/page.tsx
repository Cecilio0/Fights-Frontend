import Profile from "@/components/Profile/Profile";
import React, { Suspense } from "react";
import ProfileSkeleton from "@/components/Profile/ProfileSkeleton";

export default async function FighterPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div className="flex flex-col items-center min-h-screen pt-20">
      <div className="w-full max-w-5xl mx-auto px-4"></div>

      <div className="w-full max-w-5xl mx-auto px-4 flex flex-col space-y-4">
        <Suspense fallback={<ProfileSkeleton />}>
          <Profile params={params} />
        </Suspense>
      </div>

      <div className="w-full max-w-5xl mx-auto px-4 mb-10"></div>
    </div>
  );
}
