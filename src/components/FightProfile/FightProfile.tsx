import { getFightById } from "@/utils/actions";
import { getServerSession } from "next-auth";
import { authOptions } from "../../app/api/auth/[...nextauth]/route";
import Fight from "@/interfaces/fight/Fight.interface";
import Turn from "@/interfaces/fight/Turn.interface";
import FightDialog from "./FightReplay/FightDialog";

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
        <div className="grid md:grid-cols-[250px,1fr] items-start gap-6 lg:gap-10">
          <p>Winner: {fight.winner.name}</p>
          <p>Loser: {fight.loser.name}</p>
        </div>
        <ul>
          {fight.turns.map((turn: Turn) => (
            <li key={turn.id_turn}>
              <FightDialog dialog={turn.info} fighterName={turn.fighter.name} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
