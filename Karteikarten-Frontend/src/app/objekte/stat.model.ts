export interface Stat{
    lastChange?: number;
    card:string;
    rubrik:number;
    fällig?:number;
    leichtigkeit?:number;
    intervall?:number;
    stufe?:number;
    gelernt?:{zeit:number,antwort:number}[];
    unsynced?:boolean;
    id?:string;
}