import Fighter from '../fighter/Fighter.interface';

export default interface Turn {
  id_turn?: number;
  damage: number;
  info: string;
  fighter: Fighter;
}
