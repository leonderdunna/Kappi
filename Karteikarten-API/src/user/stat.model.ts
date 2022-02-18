import { ObjectID } from "typeorm";

export interface Stat{
    id:ObjectID;
    rubrik:number;
    leichtigkeit?:number;
    intervall?:number;
    fällig?:number;
    stufe?:number;
    
}