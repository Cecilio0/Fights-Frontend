"use client";
import React, { useEffect, useState } from "react";
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getFighterById, getFightsByFighterId } from "@/utils/actions";
import { useSession } from "next-auth/react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Ability from "@/interfaces/fighter/Ability.interface";
import Subplot from "@/interfaces/fighter/Subplot.interface";
import { useRouter } from "next/navigation";
import ProfileSkeleton from "./ProfileSkeleton";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

export default function Profile({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { data: session } = useSession();
  const [fighter, setFighter] = useState(null);
  const [fights, setFights] = useState(null);
  const [victories, setVictories] = useState(0);
  const [losses, setLosses] = useState(0);

  useEffect(() => {
    if (session) {
      getFighterById(session.accessToken, +params.id).then((fighterData) =>
        setFighter(fighterData),
      );
      getFightsByFighterId(session.accessToken, +params.id).then(
        (fightsData) => {
          setFights(fightsData);
          setVictories(
            fightsData.filter(
              (fight) => +fight.winner.id_fighter === +params.id,
            ).length,
          );
          setLosses(
            fightsData.filter((fight) => +fight.loser.id_fighter === +params.id)
              .length,
          );
        },
      );
    }
  }, [session, params.id]);

  if (!fighter || !fights) {
    return <ProfileSkeleton />;
  }
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
            <Separator />

            <div className="flex h-5 items-center space-x-4 text-sm justify-between">
              <div>Victories</div>
              <Separator orientation="vertical" />
              <div>{victories}</div>
            </div>
            <div className="flex h-5 items-center space-x-4 text-sm justify-between">
              <div>Defeats</div>
              <Separator orientation="vertical" />
              <div>{losses}</div>
            </div>
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
            <Card>
              <CardHeader>
                <CardTitle>Recent Fights</CardTitle>
              </CardHeader>
              <CardContent>
                {fights.length > 0 ? (
                  fights.slice(0, 5).map((fight) => (
                    <div
                      key={fight.id_fight}
                      className="flex justify-between items-center mb-2"
                    >
                      <div>
                        {fight.winner.name} vs {fight.loser.name}
                      </div>
                      <Button
                        onClick={() =>
                          router.push(`/fights/${fight.id_fight}`, {
                            scroll: false,
                          })
                        }
                      >
                        View Fight
                      </Button>
                    </div>
                  ))
                ) : (
                  <p>No recent fights</p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
