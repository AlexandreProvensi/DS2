import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PedidoEntity } from './pedido.service';
import { ProdutoEntity } from './produto.service';


@Injectable({
  providedIn: 'root'
})
export class ItemPedidoService {

  constructor(private http: HttpClient) { }

  /**
   * Fornece uma lista com TODOS as itempedidos disponíveis
   */
  public listarTodos() {
    return this.http.get(environment.urlSaaS +'/itempedidos');
  }

  /**
   * Fornece a itempedido com o ID passado por parâmetro
   * 
   * @param id 
   */
  public listarPorId(id: number) {
    //Assim: 
    //  return this.http.get(environment.urlSaaS +'/itempedidos/'+ id);
    //... ou, assim:
    return this.http.get(`${environment.urlSaaS}/itempedidos/${id}`);
  }

  /**
   * Exclui a itempedido com o mesmo ID passado por parâmetro
   * 
   * @param id 
   */
  public excluir(id: number) {
    return this.http.delete(environment.urlSaaS +'/itempedidos/'+ id);
  }

  /**
   * Verifica se existe um ID na itempedido passada por parametro.
   * Se existir, significa que a itempedido deverá ser alterada,
   * caso contrário, significa que a itempedido será incluída
   * 
   * @param itempedido 
   */
  public salvar(itempedido: ItemPedidoEntity) {
    if (itempedido.id) {
      return this.alterar(itempedido);
    } else {
      return this.adicionar(itempedido);
    }
  }

  /**
   * Adiciona uma nova itempedido 
   * 
   * @param itempedido 
   */
  private adicionar(itempedido: ItemPedidoEntity) {
    return this.http.post(environment.urlSaaS +'/itempedidos', itempedido);
  }

  /**
   * Altera a itempedido passada por parâmetro
   * 
   * @param itempedido 
   */
  private alterar(itempedido: ItemPedidoEntity) {
    return this.http.put(environment.urlSaaS +'/itempedidos/'+ itempedido.id, itempedido);
  }
}

export class ItemPedidoEntity {
  id: number;
  qtdade: number;
  vlrunit: number;
  produto: ProdutoEntity;
  pedido: PedidoEntity;
}