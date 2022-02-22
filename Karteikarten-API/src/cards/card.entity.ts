import { BaseEntity, Column, Entity, ObjectIdColumn,ObjectID } from "typeorm";

@Entity('cards')
export class Cards extends BaseEntity {
    @ObjectIdColumn()
    id: ObjectID

    @Column()
    package?: number[];

    @Column()
    level?: number;

    @Column()
    autor?: string;

    @Column()
    frage: string;

    @Column()
    antwort: string;

}