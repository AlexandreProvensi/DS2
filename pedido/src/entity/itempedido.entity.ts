import { PedidoEntity } from './pedido.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ProdutoEntity } from "./produto.entity";

@Entity({name: 'itempedido'})
export class ItemPedidoEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false, type: 'float'})
    qtdade: number;

    @Column({nullable: false, type: 'float'})
    vlrunit: number;

    @ManyToOne( type => ProdutoEntity, {eager: true, nullable: false})
    produto: ProdutoEntity;

    @ManyToOne( type => PedidoEntity, {nullable: false})
    pedido: PedidoEntity;

}