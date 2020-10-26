import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProdutoEntity } from './produto.service';
import { ClienteEntity } from './cliente.service';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  constructor(private http: HttpClient) { }

  /**
   * Fornece uma lista com TODOS as pedidos disponíveis
   */
  public listarTodos() {
    return this.http.get(environment.urlSaaS +'/pedidos');
  }

  /**
   * Fornece a pedido com o ID passado por parâmetro
   * 
   * @param id 
   */
  public listarPorId(id: number) {
    //Assim: 
    //  return this.http.get(environment.urlSaaS +'/pedidos/'+ id);
    //... ou, assim:
    return this.http.get(`${environment.urlSaaS}/pedidos/${id}`);
  }

  /**
   * Exclui a pedido com o mesmo ID passado por parâmetro
   * 
   * @param id 
   */
  public excluir(id: number) {
    return this.http.delete(environment.urlSaaS +'/pedidos/'+ id);
  }

  /**
   * Verifica se existe um ID na pedido passada por parametro.
   * Se existir, significa que a pedido deverá ser alterada,
   * caso contrário, significa que a pedido será incluída
   * 
   * @param pedido 
   */
  public salvar(pedido: PedidoEntity) {
    if (pedido.id) {
      return this.alterar(pedido);
    } else {
      return this.adicionar(pedido);
    }
  }

  /**
   * Adiciona uma nova pedido 
   * 
   * @param pedido 
   */
  private adicionar(pedido: PedidoEntity) {
    return this.http.post(environment.urlSaaS +'/pedidos', pedido);
  }

  /**
   * Altera a pedido passada por parâmetro
   * 
   * @param pedido 
   */
  private alterar(pedido: PedidoEntity) {
    return this.http.put(environment.urlSaaS +'/pedidos/'+ pedido.id, pedido);
  }
}

export class ItemPedidoEntity {
  id: number;
  qtdade: number;
  vlrunit: number;
  produto: ProdutoEntity;
}

export class PedidoEntity {
  id: number;
  codigo: string;
  dtpedido: Date;
  cliente: ClienteEntity;
  itens: ItemPedidoEntity[];
}