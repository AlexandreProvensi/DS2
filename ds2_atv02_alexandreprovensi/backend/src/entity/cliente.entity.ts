import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { BairroEntity } from "./bairro.entity";

@Entity({name: 'cliente'})
export class ClienteEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false, length: 50})
    nome: string;

    @Column({nullable: true})
    telefone: number;

    @Column({nullable: false, length: 30})
    logradouro: string;

    @Column({nullable: false})
    numero: number;

    @Column({nullable: true, length: 60})
    complemento: string;

    @ManyToOne( type => BairroEntity, {eager: true, nullable:true})
    bairro: BairroEntity;
}