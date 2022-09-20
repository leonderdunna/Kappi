import {Content} from "./content.model";
import {Stat} from "./stat.model";

/**
 * @description Karte, so wie sie beim Klient gespeichert wird. Enthält sowohl
 * den Inhalt der karte, als auch den Zustand
 */
export interface Card {

  id: string;
  time: number;
  paket: string[];
  content:Content[];
  stat:Stat[];

}
