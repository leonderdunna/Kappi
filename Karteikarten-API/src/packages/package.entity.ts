import { BaseEntity, Entity, Column, ObjectIdColumn, ObjectID } from "typeorm"
import { Stapel } from "./stapel.model"

@Entity('packages')
export class Package extends BaseEntity {

    @ObjectIdColumn() id: ObjectID
    @Column() name: string;
    @Column() stapel: Stapel[]
    @Column() user: string[];

}