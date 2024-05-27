import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  TableHeader,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { getFighters } from "@/utils/actions";
import { auth } from "@/auth";
import Link from "next/link";
import Fighter from "@/interfaces/fighter/Fighter.interface";

export default async function FightersTable() {
  const session = await auth();
  const fighters = await getFighters(session?.accessToken);

  return (
    <div className="mx-auto max-w-5xl">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[120px]">Name</TableHead>
            <TableHead>Class</TableHead>
            <TableHead>HP</TableHead>
            <TableHead>Strength</TableHead>
            <TableHead>Dexterity</TableHead>
            <TableHead>Constitution</TableHead>
            <TableHead>Intelligence</TableHead>
            <TableHead>Wisdom</TableHead>
            <TableHead>Charisma</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {fighters.map((fighter: Fighter) => (
            <TableRow key={fighter.id_fighter}>
              <Link href={`/fighters/${fighter.id_fighter}`}>
                <TableCell className="font-medium">{fighter.name}</TableCell>
              </Link>

              <TableCell>
                <Link href={`/fighters/${fighter.id_fighter}`}>
                  <Badge>
                    {fighter.baseClass.name.charAt(0).toUpperCase() +
                      fighter.baseClass.name.slice(1)}
                  </Badge>
                </Link>
              </TableCell>
              <TableCell>{fighter.hp}</TableCell>
              <TableCell>{fighter.strength}</TableCell>
              <TableCell>{fighter.dexterity}</TableCell>
              <TableCell>{fighter.constitution}</TableCell>
              <TableCell>{fighter.intelligence}</TableCell>
              <TableCell>{fighter.wisdom}</TableCell>
              <TableCell>{fighter.charisma}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
