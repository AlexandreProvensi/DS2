import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'statusentrega'})
export class StatusEntregaEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false, length: 20})
    statusentrega: string;
}