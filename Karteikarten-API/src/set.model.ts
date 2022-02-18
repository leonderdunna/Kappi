import { Package } from "./packages/package.entity";

export interface Set{
    name:string,
    id:number,
    packages: Package[],
    kateognamen: string[],
}