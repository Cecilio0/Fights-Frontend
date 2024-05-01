import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { getFights } from "@/utils/actions";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { authOptions } from "../../app/api/auth/[...nextauth]/route";
import Fight from "@/interfaces/fight/Fight.interface";

export default async function FightsTable() {
  const session = await getServerSession(authOptions);
  const fights = await getFights(session?.jwt);

  return (
    <div className="mx-auto max-w-5xl">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[120px]">Winner</TableHead>
            <TableHead></TableHead>
            <TableHead>Loser</TableHead>
            <TableHead></TableHead>
            <TableHead>Length</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {fights.map((fight: Fight) => (
            <TableRow key={fight.id_fight}>
              <TableCell className="font-medium text-nowrap">
                <Link href={`/fighters/${fight.winner.id_fighter}`}>
                  {fight.winner.name}
                </Link>
              </TableCell>
              <TableCell>vs</TableCell>
              <TableCell>
                <Link href={`/fighters/${fight.loser.id_fighter}`}>
                  {fight.loser.name}
                </Link>
              </TableCell>
              <TableCell></TableCell>
              <TableCell>{fight.turns.length} turns</TableCell>
              <TableCell>
                <Link href={`/fights/${fight.id_fight}`}>
                  <Badge>Replay</Badge>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
