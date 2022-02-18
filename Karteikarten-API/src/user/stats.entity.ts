import { BaseEntity, Column, Entity, ObjectID, ObjectIdColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Stat } from './stat.model';

@Entity('Stats')
export class Stats extends BaseEntity {
    @ObjectIdColumn() id:ObjectID;
    @Column() stats : Stat[];
}
