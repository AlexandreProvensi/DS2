import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'tabelapreco'})
export class TabelaPrecoEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false, length: 50})
    nome: string;

    @Column({nullable: false, type: 'float'})
    fator: number;
}