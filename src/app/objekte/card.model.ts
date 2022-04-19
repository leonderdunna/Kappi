export interface Card{
    frage:string;
    antwort:string;
    id?:string
    unsynced?:boolean;
    lastChange?:number;
    alternativAntworten?:string[];
    fehler?:{
        hinweis:string;
        antwort:string;
    }[]
}