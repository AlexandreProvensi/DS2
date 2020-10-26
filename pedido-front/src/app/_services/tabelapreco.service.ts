import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TabelaPrecoService {

  constructor(private http: HttpClient) { }

  /**
   * Fornece uma lista com TODOS as tabelas de preços disponíveis
   */
  public listarTodos() {
    return this.http.get(environment.urlSaaS +'/tabelasprecos');
  }

  /**
   * Fornece a tabela de preço do ID passado por parâmetro
   * 
   * @param id 
   */
  public listarPorId(id: number) {
    return this.http.get(`${environment.urlSaaS}/tabelasprecos/${id}`);
  }

  /**
   * Exclui a tabela de preço com o ID passado por parâmetro
   * 
   * @param id 
   */
  public excluir(id: number) {
    return this.http.delete(environment.urlSaaS +'/tabelasprecos/'+ id);
  }

  /**
   * Verifica se existe um ID na tabela de preço passada por parametro.
   * Se existir, significa que a tabela de preço deverá ser alterada,
   * caso contrário, significa que deverá der incluída
   * 
   * @param tabelapreco 
   */
  public salvar(tabelapreco: TabelaPrecoEntity) {
    if (tabelapreco.id) {
      return this.alterar(tabelapreco);
    } else {
      return this.adicionar(tabelapreco);
    }
  }

  /**
   * Adiciona uma nova tabela de preço 
   * 
   * @param tabelapreco 
   */
  private adicionar(tabelapreco: TabelaPrecoEntity) {
    return this.http.post(environment.urlSaaS +'/tabelasprecos', tabelapreco);
  }

  /**
   * Altera a tabela de preço passada por parâmetro
   * 
   * @param tabelapreco 
   */
  private alterar(tabelapreco: TabelaPrecoEntity) {
    return this.http.put(environment.urlSaaS +'/tabelasprecos/'+ tabelapreco.id, tabelapreco);
  }
}

export class TabelaPrecoEntity {
  id: number;
  nome: string;
  fator: number;
}