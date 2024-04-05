import Ability from './Ability.interface';
import BaseClass from './BaseClass.interface';
import Subplot from './Subplot.interface';

export default interface Fighter {
  id_fighter: number;
  name?: string;
  biography?: string;
  baseClass?: BaseClass;
  hp?: number;
  strength?: number;
  dexterity?: number;
  constitution?: number;
  intelligence?: number;
  wisdom?: number;
  charisma?: number;
  abilities?: Ability[];
  subplots?: Subplot[];
}
