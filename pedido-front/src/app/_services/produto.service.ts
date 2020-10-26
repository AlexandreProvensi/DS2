import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  constructor(private http: HttpClient) { }

  /**
   * Fornece uma lista com TODOS as produtos disponíveis
   */
  public listarTodos() {
    return this.http.get(environment.urlSaaS +'/produtos');
  }

  /**
   * Fornece a produto com o ID passado por parâmetro
   * 
   * @param id 
   */
  public listarPorId(id: number) {
    //Assim: 
    //  return this.http.get(environment.urlSaaS +'/produtos/'+ id);
    //... ou, assim:
    return this.http.get(`${environment.urlSaaS}/produtos/${id}`);
  }

  /**
   * Exclui a produto com o mesmo ID passado por parâmetro
   * 
   * @param id 
   */
  public excluir(id: number) {
    return this.http.delete(environment.urlSaaS +'/produtos/'+ id);
  }

  /**
   * Verifica se existe um ID na produto passada por parametro.
   * Se existir, significa que a produto deverá ser alterada,
   * caso contrário, significa que a produto será incluída
   * 
   * @param produto 
   */
  public salvar(produto: ProdutoEntity) {
    if (produto.id) {
      return this.alterar(produto);
    } else {
      return this.adicionar(produto);
    }
  }

  /**
   * Adiciona uma nova produto 
   * 
   * @param produto 
   */
  private adicionar(produto: ProdutoEntity) {
    return this.http.post(environment.urlSaaS +'/produtos', produto);
  }

  /**
   * Altera a produto passada por parâmetro
   * 
   * @param produto 
   */
  private alterar(produto: ProdutoEntity) {
    return this.http.put(environment.urlSaaS +'/produtos/'+ produto.id, produto);
  }
}

export class ProdutoEntity {
  id: number;
  codigo: string;
  nome: string;
  descricao: string;
  preco: number;
}