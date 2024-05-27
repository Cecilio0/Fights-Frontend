import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getFighterById } from "@/utils/actions";
import { auth } from "@/auth";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Ability from "@/interfaces/fighter/Ability.interface";
import Subplot from "@/interfaces/fighter/Subplot.interface";

export default async function Profile({ params }: { params: { id: string } }) {
  const session = await auth();
  const fighter = await getFighterById(session?.accessToken, params.id);

  return (
    <div key="1" className="w-full py-6 space-y-6">
      <div className="container space-y-6 px-4 md:px-6">
        <div className="grid md:grid-cols-[250px,1fr] items-start gap-6 lg:gap-10">
          <div className="flex flex-col items-start space-y-2">
            <div
              className="bg-gray-100 rounded-full flex items-center justify-center text-3xl font-bold text-black mb-4"
              style={{
                height: "200px",
                width: "200px",
              }}
            >
              {fighter.name.charAt(0).toUpperCase()}
            </div>
            <h1 className="text-3xl font-bold">{fighter.name}</h1>
            <h2 className="text-xl font-semibold">
              {fighter.baseClass.name.charAt(0).toUpperCase() +
                fighter.baseClass.name.slice(1)}
            </h2>
            <Badge variant="secondary">
              {fighter.baseClass.mainAttribute.charAt(0).toUpperCase() +
                fighter.baseClass.mainAttribute.slice(1)}
            </Badge>
            <Badge variant="secondary">
              {fighter.baseClass.secondaryAttribute.charAt(0).toUpperCase() +
                fighter.baseClass.secondaryAttribute.slice(1)}
            </Badge>
          </div>
          <div className="mx-auto max-w-4xl space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Biography</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500 md:text-xl/relaxed lg:text/base xl:text-xl/relaxed dark:text-gray-400">
                  {fighter.biography}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <table className="table-auto w-full">
                  <tbody>
                    <tr>
                      <td className="font-bold  border-b">HP</td>
                      <td className="border-b text-right">{fighter.hp}</td>
                    </tr>
                    <tr>
                      <td className="font-bold  border-b">Strength</td>
                      <td className="border-b text-right">
                        {fighter.strength}
                      </td>
                    </tr>
                    <tr>
                      <td className="font-bold border-b">Dexterity</td>
                      <td className="border-b text-right">
                        {fighter.dexterity}
                      </td>
                    </tr>
                    <tr>
                      <td className="font-bold  border-b">Constitution</td>
                      <td className="border-b text-right">
                        {fighter.constitution}
                      </td>
                    </tr>
                    <tr>
                      <td className="font-bold  border-b">Intelligence</td>
                      <td className="border-b text-right">
                        {fighter.intelligence}
                      </td>
                    </tr>
                    <tr>
                      <td className="font-bold  border-b">Wisdom</td>
                      <td className="border-b text-right">{fighter.wisdom}</td>
                    </tr>
                    <tr>
                      <td className="font-bold ">Charisma</td>
                      <td className="text-right">{fighter.charisma}</td>
                    </tr>
                  </tbody>
                </table>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Abilities</CardTitle>
              </CardHeader>
              <CardContent>
                <table className="table-auto w-full">
                  <thead>
                    <tr>
                      <th className="font-bold px-4 border-r">Ability</th>
                      <th className="font-bold px-4">Power</th>
                    </tr>
                  </thead>
                  <tbody>
                    {fighter.abilities.map((ability: Ability) => (
                      <tr key={ability.id_ability} className="border-b">
                        <td className="px-4 border-r">{ability.name}</td>
                        <td className="px-4">{ability.power}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Subplots</CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {fighter.subplots.map((subplot: Subplot, index: number) => (
                    <AccordionItem
                      value={`item-${index + 1}`}
                      key={subplot.id_subplot}
                    >
                      <AccordionTrigger>Subplot {index + 1}</AccordionTrigger>
                      <AccordionContent>{subplot.info}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
