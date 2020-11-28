import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'operador'})
export class OperadorEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false, length: 20})
    username: string;

    @Column({nullable: false, length: 50})
    password: string;
}