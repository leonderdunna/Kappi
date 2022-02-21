import { BaseEntity, Column, Entity, ObjectID, ObjectIdColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Settings')
export class Settings extends BaseEntity {
    @ObjectIdColumn() id: ObjectID;

    @Column() user:string;

    @Column() startLeichtigkeit: number;
    @Column() neueKartenProTag: number;
    @Column() lernenSchritte: number[];
    @Column() startBeiEinfach: number;
    @Column() startBeiGut: number;
    @Column() wiederholungenProTag: number;
    @Column() minIntervall: number;
    @Column() maxIntervall: number;
    @Column() faktorNachErneutemLernen: number;
    @Column() erneutLernenSchritte: number[];


}
