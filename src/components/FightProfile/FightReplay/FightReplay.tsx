// Client component meant to provide a replay of the fight
"use client";

import Fight from "@/interfaces/fight/Fight.interface";
import { useState } from "react";
import background from "@/resources/p5-velvet-room.jpg";
import FightDialog from "./FightDialog";

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

  return (
    <div className="flex flex-col items-center justify-center w-[784px] h-[488px] bg-black">
      <div
        className="grid grid-rows-3 grid-flow-col place-items-center w-[768px] h-[432px]"
        style={{
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
      <div className="flex w-full items-center justify-between mt-2 px-2">
        {turnCounter > 0 ? (
          <button
            className="bg-red-600 rounded-sm py-1 px-2"
            onClick={onPreviousTurnClick}
          >
            Previous Turn
          </button>
        ) : (
          <div></div> // This is the spacer div
        )}
        {turnCounter + 1 < fight.turns.length && (
          <button
            className="bg-red-600 rounded-sm py-1 px-2"
            onClick={onNextTurnClick}
          >
            Next Turn
          </button>
        )}
      </div>
    </div>
  );
}
