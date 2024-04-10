import { getFightById, saveFight } from "./helpers/fight.helper";
import {
  getFighterNames,
  getFighters,
  getFighterByName,
  getFighterById,
} from "./helpers/fighter.helper";
import { authenticate } from "./helpers/jwt.helper";
import Fight from "../interfaces/fight/Fight.interface";
import Turn from "../interfaces/fight/Turn.interface";
import Fighter from "../interfaces/fighter/Fighter.interface";
import { getRandomInt, getTwoDistinctRandomIntegers } from "./utils";

export const simulateFight = async (
  jwt: string,
  nameFighter1: string,
  nameFighter2: string,
): Promise<Fight | void> => {
  const fighter1: Fighter | void = await getFighterByName(nameFighter1);
  const fighter2: Fighter | void = await getFighterByName(nameFighter2);

  if (
    fighter1 == undefined ||
    fighter1.name == undefined ||
    fighter1.baseClass == undefined ||
    fighter1.hp == undefined ||
    fighter1.strength == undefined ||
    fighter1.dexterity == undefined ||
    fighter1.constitution == undefined ||
    fighter1.intelligence == undefined ||
    fighter1.wisdom == undefined ||
    fighter1.charisma == undefined ||
    fighter2 == undefined ||
    fighter2.name == undefined ||
    fighter2.baseClass == undefined ||
    fighter2.hp == undefined ||
    fighter2.strength == undefined ||
    fighter2.dexterity == undefined ||
    fighter2.constitution == undefined ||
    fighter2.intelligence == undefined ||
    fighter2.wisdom == undefined ||
    fighter2.charisma == undefined
  )
    return;

  const mainAttribute1: number = <number>(
    fighter1[fighter1.baseClass.mainAttribute as keyof typeof fighter1]
  );
  const secondaryAttribute1: number = <number>(
    fighter1[fighter1.baseClass.secondaryAttribute as keyof typeof fighter1]
  );

  const mainAttribute2: number = <number>(
    fighter2[fighter2.baseClass.mainAttribute as keyof typeof fighter2]
  );
  const secondaryAttribute2: number = <number>(
    fighter2[fighter2.baseClass.secondaryAttribute as keyof typeof fighter2]
  );

  const turns: Turn[] = [];
  let nextAttacker: number = fighter1.dexterity > fighter2.dexterity ? 1 : -1;

  while (fighter1.hp > 0 && fighter2.hp > 0) {
    let turn: Turn;
    if (nextAttacker == 1) {
      turn = simulateTurn(fighter1, mainAttribute1, secondaryAttribute1);
      fighter2.hp -= turn.damage;
    } else {
      turn = simulateTurn(fighter2, mainAttribute2, secondaryAttribute2);
      fighter1.hp -= turn.damage;
    }
    turns.push(turn);

    nextAttacker *= -1;
  }

  if (fighter1.hp > 0) {
    return { winner: fighter1, loser: fighter2, turns };
  } else {
    return { winner: fighter2, loser: fighter1, turns };
  }
};

const simulateTurn = (
  fighter: Fighter,
  mainAttribute: number,
  secondaryAttribute: number,
): Turn => {
  const middle: number = mainAttribute + secondaryAttribute * 0.5;
  const lowerBound: number = Math.floor(middle * 0.8);
  const higherBound: number = Math.floor(middle * 1.2);

  let info = "";

  let usesAbility: boolean = false;
  let abilityToUse: number;
  let abilityDamage: number = 0;

  if (fighter.abilities != undefined && fighter.abilities.length > 0) {
    usesAbility = Math.random() > 0.5 ? true : false;

    if (usesAbility) {
      abilityToUse = getRandomInt(0, fighter.abilities.length - 1);
      abilityDamage = fighter.abilities[abilityToUse].power;
      info += `${fighter.name} used '${fighter.abilities[abilityToUse].name}' and hit for `;
    }
  }

  if (!usesAbility) {
    info += `${fighter.name} attacked and hit for `;
  }

  const damage = getRandomInt(lowerBound, higherBound) + abilityDamage;

  info += damage;

  console.log(info);

  return { damage, info, fighter };
};

const main = async (): Promise<void> => {
  const jwt: string | void = await authenticate({
    username: "Cecilio",
    password: "password",
  });

  if (typeof jwt != "string") {
    return;
  }

  const names: string[] | void = await getFighterNames();

  if (typeof names != "object") {
    return;
  }

  const indexes: [number, number] = getTwoDistinctRandomIntegers(
    0,
    names.length - 1,
  );

  console.log(indexes);

  const fight: Fight | void = await simulateFight(
    jwt,
    names[indexes[0]],
    names[indexes[1]],
  );

  if (typeof fight != "object") {
    return;
  }

  await saveFight(fight);
};
