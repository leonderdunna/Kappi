export interface Stat {
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
}
