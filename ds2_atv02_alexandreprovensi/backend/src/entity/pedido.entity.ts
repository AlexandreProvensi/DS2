import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ClienteEntity } from "./cliente.entity";
import { EntregadorEntity } from "./entregador.entity";
import { ProdutoEntity } from "./produto.entity";
import { OperadorEntity } from "./operador.entity";
import { StatusEntregaEntity } from "./statusentrega.entity";

@Entity({name: 'pedido'})
export class PedidoEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true, type: 'float'})
    valor_pedido: number;

    @ManyToOne( type => OperadorEntity, {eager: true, nullable:true})
    operador: OperadorEntity;

    @ManyToOne( type => ClienteEntity, {eager: true, nullable:true})
    cliente: ClienteEntity;

    @ManyToOne( type => StatusEntregaEntity, {eager: true, nullable:true})
    status: StatusEntregaEntity;
    
    @ManyToOne( type => EntregadorEntity, {eager: true, nullable:true})
    entregador: EntregadorEntity;

    @ManyToOne(type=> ProdutoEntity, {eager: true, nullable:true})
    produto: ProdutoEntity
}