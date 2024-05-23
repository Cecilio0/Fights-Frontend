"use client";

import React, { useState } from "react";
import { getFighterById } from "@/utils/actions";
import { simulateFight } from "@/utils/fight";
import Fight from "@/interfaces/fight/Fight.interface";

export default function Page() {
  const [jwt, setJwt] = useState<string>("");
  const [fighter1Id, setFighter1Id] = useState<string>("");
  const [fighter2Id, setFighter2Id] = useState<string>("");
  const [fighter1Exists, setFighter1Exists] = useState<boolean>(false);
  const [fighter2Exists, setFighter2Exists] = useState<boolean>(false);
  const [fightResult, setFightResult] = useState<Fight | null>(null);

  async function validateFighter1() {
    const fighter1 = await getFighterById(jwt, fighter1Id);
    setFighter1Exists(!!fighter1);
  }

  async function validateFighter2() {
    const fighter2 = await getFighterById(jwt, fighter2Id);
    setFighter2Exists(!!fighter2);
  }

  async function simulateFightResult() {
    if (fighter1Exists && fighter2Exists) {
      const fighter1 = await getFighterById(jwt, fighter1Id);
      const fighter2 = await getFighterById(jwt, fighter2Id);
      if (fighter1 && fighter2) {
        const result = await simulateFight(jwt, fighter1.name, fighter2.name);
        if (result) {
          setFightResult(result);
        } else {
          setFightResult(null);
        }
      }
    }
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "3em",
      }}
    >
      <input
        value={jwt}
        onChange={(e) => setJwt(e.target.value)}
        placeholder="JWT"
        style={{ marginBottom: "1em" }}
      />
      <div>
        <input
          value={fighter1Id}
          onChange={(e) => setFighter1Id(e.target.value)}
          placeholder="Fighter 1 ID"
          style={{ marginBottom: "1em" }}
        />
        <button onClick={validateFighter1}>Validate Fighter 1</button>
        {fighter1Exists && <p>Fighter 1 exists</p>}
      </div>
      <div>
        <input
          value={fighter2Id}
          onChange={(e) => setFighter2Id(e.target.value)}
          placeholder="Fighter 2 ID"
          style={{ marginBottom: "1em" }}
        />
        <button onClick={validateFighter2}>Validate Fighter 2</button>
        {fighter2Exists && <p>Fighter 2 exists</p>}
      </div>
      <button onClick={simulateFightResult}>Simulate Fight</button>
      {fightResult && <div>{JSON.stringify(fightResult)}</div>}
    </div>
  );
}
