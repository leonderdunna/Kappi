import { PrimaryGeneratedColumn, BaseEntity,Entity, Column } from "typeorm"

@Entity('packages')
export class Package extends BaseEntity {
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    packages: Package[]
}