import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'entregador'})
export class EntregadorEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false, length: 20})
    nome: string;
}