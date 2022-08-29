export interface Content {
  entwurf: boolean;
  time: number;
  type: 'Kappi-Basic';
  felder: {
    frage: string;
    antwort: string;
    eingeben: boolean;
    alternativAntworten?: string[];
    fehler?: {
      hinweis: string;
      antwort: string;
    }[]
  }
  material?: string;
}
