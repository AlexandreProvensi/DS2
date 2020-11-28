import { Column, Double, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'bairro'})
export class BairroEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false, length: 40})
    descricao: string;

    @Column({nullable: false})
    taxadeentrega: number;
}