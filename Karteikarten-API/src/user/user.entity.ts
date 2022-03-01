import { Column, Entity, ObjectID, ObjectIdColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class User {
    @ObjectIdColumn() id:ObjectID;
    @Column() name:string;
    @Column() password:string;
}
