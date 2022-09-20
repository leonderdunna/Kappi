/**
 * @description Status einer Karte. Wird in der Karte gespeichert.
 * gibt alle informationen, in welchem Zustand die Karte ist.
 */
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
