import { Plus } from "lucide-react";
import FightsTable from "@/components/FightsTable/FightsTable";
import FightsTableSkeleton from "@/components/FightsTable/FightsTableSkeleton";
import { Button } from "@/components/ui/button";
import { Suspense } from "react";
import Link from "next/link";

export default async function Fights() {
  return (
    <div className="flex flex-col items-center min-h-screen pt-20">
      <div className="w-full max-w-5xl mx-auto px-4 flex justify-between items-center">
        <h1 className="mb-5 text-2xl font-bold text-left">Fights</h1>
        <Link href="/fights/create">
          {" "}
          <Button className="mb-5">
            <Plus className="mr-2 h-4 w-4" />
            Simulate Fight
          </Button>
        </Link>
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
