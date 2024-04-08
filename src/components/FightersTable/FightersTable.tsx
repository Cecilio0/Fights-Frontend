import { Table, TableBody, TableCell, TableRow, TableHead, TableHeader } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { getFighters } from '@/utils/actions';
import { getServerSession } from "next-auth";
import Link from 'next/link';
import { authOptions } from "../../app/api/auth/[...nextauth]/route";

interface BaseClass {
    id_base_class: number;
    name: string;
    mainAttribute: string;
    secondaryAttribute: string;
}

interface Ability {
    id_ability: number;
    name: string;
    power: number;
}

interface Subplot {
    id_subplot: number;
    info: string;
}

interface Fighter {
    id_fighter: number;
    name: string;
    biography: string;
    baseClass: BaseClass;
    hp: number;
    strength: number;
    dexterity: number;
    constitution: number;
    intelligence: number;
    wisdom: number;
    charisma: number;
    abilities: Ability[];
    subplots: Subplot[];
}


export default async function FightersTable() {
    const session = await getServerSession(authOptions)
    const fighters = await getFighters(session?.jwt);

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

                            <TableCell className="font-medium">
                                <Link href={`/fighters/${fighter.id_fighter}`}>{fighter.name}</Link>
                            </TableCell>
                            <TableCell>
                                <Link href={`/fighters/${fighter.id_fighter}`}>
                                    <Badge>{fighter.baseClass.name.charAt(0).toUpperCase() + fighter.baseClass.name.slice(1)}</Badge>
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
        </div >

    )
}