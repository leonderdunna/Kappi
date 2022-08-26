export interface Card {

  id?: string;
  time: number;
  paket: string[];

  content: {
    entwurf: boolean;
    time: number;

    frage: string;
    antwort: string;
    eingeben: boolean;
    alternativAntworten?: string[];
    fehler?: {
      hinweis: string;
      antwort: string;
    }[]

    material?: string;
  }[];

  stat: {
    time: number;
    rubrik: number;
    due: number;
    leichtigkeit: number;
    intervall: number;
    stufe: number;
    gelernt?: {
      zeit: number;
      antwort: number
    };
  }[];

}
