export interface Card{
    frage:string;
    antwort:string;
    id?:string
    unsynced?:boolean;
    lastChange?:number;
}