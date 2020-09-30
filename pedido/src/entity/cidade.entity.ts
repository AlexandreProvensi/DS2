import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity({name: 'cidade'})
export class CidadeEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable:false, legth: 50})
    nome: string;

    @Column({nullable: false, legth: 2})
    uf: string;
}