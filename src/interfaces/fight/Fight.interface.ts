import Fighter from '../fighter/Fighter.interface';
import Turn from './Turn.interface';

export default interface Fight {
  id_fight?: number;
  winner: Fighter;
  loser: Fighter;
  turns: Turn[];
}
