import { ClienteEntity } from './cliente.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ItemPedidoEntity } from './itempedido.entity';

@Entity({name: 'pedido'})
export class PedidoEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false, length: 6})
    codigo: string;

    @Column({nullable: false, type: 'date'})
    dtpedido: Date;

    @ManyToOne( type => ClienteEntity, {eager: true, nullable: false})
    cliente: ClienteEntity;

    @OneToMany(type => ItemPedidoEntity, item => item.pedido, {eager: true, cascade: true})
    itens: ItemPedidoEntity[];
}