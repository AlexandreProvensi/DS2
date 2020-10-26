import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { CidadeEntity } from "./cidade.entity";
import { TabelaPrecoEntity } from "./tabelapreco.entity";

@Entity({name: 'cliente'})
export class ClienteEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false, length: 6})
    codigo: string;

    @Column({nullable: false, length: 50})
    nome: string;

    @Column({nullable: false, length: 50})
    email: string;

    @ManyToOne( type => TabelaPrecoEntity, {eager: true, nullable: true})
    tabelapreco: TabelaPrecoEntity;

    @ManyToOne( type => CidadeEntity, {eager: true, nullable: false})
    cidade: CidadeEntity;
}