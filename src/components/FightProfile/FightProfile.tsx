import { getFightById } from "@/utils/actions";
import { getServerSession } from "next-auth";
import { authOptions } from "../../app/api/auth/[...nextauth]/route";
import Fight from "@/interfaces/fight/Fight.interface";
import Turn from "@/interfaces/fight/Turn.interface";
import FightReplay from "./FightReplay/FightReplay";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";

export default async function FightProfile({
  params,
}: {
  params: { id: string };
}) {
  const session = await getServerSession(authOptions);
  const fight: Fight = await getFightById(session?.jwt, params.id);

  return (
    <div key="1" className="w-full py-6 space-y-6">
      <div className="container space-y-6 px-4 md:px-6">
        {/* <div className="grid md:grid-cols-[250px,1fr] items-start gap-6 lg:gap-10">
          <p>Winner: {fight.winner.name}</p>
          <p>Loser: {fight.loser.name}</p>
        </div> */}
        <ScrollArea className="h-[200px] rounded-md p-4">
          {fight.turns.map((turn: Turn, index: number) => (
            <>
              <div key={turn.id_turn} className="p-2  rounded-md">
                <div className="font-bold text-lg">Turn {index + 1}</div>
                <div className="mt-1">{turn.info}</div>
              </div>
              <Separator />
            </>
          ))}
        </ScrollArea>
      </div>
      <div className="justify-center align-middle flex">
        <FightReplay fight={fight} />
      </div>
    </div>
  );
}
