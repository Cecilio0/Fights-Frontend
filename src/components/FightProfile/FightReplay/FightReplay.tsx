// Client component meant to provide a replay of the fight
"use client";

import Fight from "@/interfaces/fight/Fight.interface";
import { useState } from "react";
import background from "@/resources/p5-velvet-room.jpg";
import FightDialog from "./FightDialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface FightReplayProps {
  fight: Fight;
}

export default function FightReplay({ fight }: FightReplayProps) {
  const [turnCounter, setTurnCounter] = useState<number>(0);

  const onNextTurnClick = () => {
    if (turnCounter + 1 < fight.turns.length) {
      setTurnCounter(turnCounter + 1);
    }
  };

  const onPreviousTurnClick = () => {
    if (turnCounter - 1 >= 0) {
      setTurnCounter(turnCounter - 1);
    }
  };

  const progress = (turnCounter / (fight.turns.length - 1)) * 100;

  return (
    <AspectRatio ratio={14 / 10}>
      <div className="flex flex-col items-center justify-center ">
        <div
          className="grid grid-rows-3 grid-flow-col place-items-center"
          style={{
            width: "80vw",
            height: "45vw",
            maxWidth: "768px",
            maxHeight: "432px",
            backgroundImage: `url('${background.src}')`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
          }}
        >
          <FightDialog
            className="row-start-3"
            fighterName={fight.turns[turnCounter].fighter.name}
            dialog={fight.turns[turnCounter].info}
          />
        </div>
        <div className="flex w-5/6 items-center justify-between mt-2 px-2">
          <div className="w-1/4 text-center">
            {turnCounter > 0 && (
              <Button onClick={onPreviousTurnClick}>Previous Turn</Button>
            )}
          </div>
          <div className="w-1/2 text-center">
            Turn: {turnCounter + 1}/{fight.turns.length}
          </div>
          <div className="w-1/4 text-center">
            {turnCounter + 1 < fight.turns.length && (
              <Button onClick={onNextTurnClick}>Next Turn</Button>
            )}
          </div>
        </div>
        <div className="mt-[12px] w-5/6 justify-center flex align-middle">
          <Progress value={progress} />
        </div>
      </div>
    </AspectRatio>
  );
}
