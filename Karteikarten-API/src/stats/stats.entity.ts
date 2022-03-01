import { BaseEntity, Column, Entity, ObjectID, ObjectIdColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('stats')
export class Stats {
    @ObjectIdColumn() id: ObjectID;
    @Column() card: string;
    @Column() user: string;
    @Column() rubrik: number;
    @Column() leichtigkeit?: number;
    @Column() intervall?: number;
    @Column() fällig?: number;
    @Column() stufe?: number;
}