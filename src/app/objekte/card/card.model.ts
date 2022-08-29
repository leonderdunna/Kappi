import {Content} from "./content.model";
import {Stat} from "./stat.model";

export interface Card {

  id: string;
  time: number;
  paket: string[];

  content:Content[];

  stat:Stat[];

}
