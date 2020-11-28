import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BairroService {

  constructor(private http: HttpClient) { }

  /**
   * Fornece uma lista com TODOS as bairros disponíveis
   */
  public listarTodos() {
    return this.http.get(environment.urlSaaS +'/bairros');
  }

  /**
   * Fornece a bairro com o ID passado por parâmetro
   * 
   * @param id 
   */
  public listarPorId(id: number) {
    //Assim: 
    //  return this.http.get(environment.urlSaaS +'/bairros/'+ id);
    //... ou, assim:
    return this.http.get(`${environment.urlSaaS}/bairros/${id}`);
  }

  /**
   * Exclui a bairro com o mesmo ID passado por parâmetro
   * 
   * @param id 
   */
  public excluir(id: number) {
    return this.http.delete(environment.urlSaaS +'/bairros/'+ id);
  }

  /**
   * Verifica se existe um ID na bairro passada por parametro.
   * Se existir, significa que a bairro deverá ser alterada,
   * caso contrário, significa que a bairro será incluída
   * 
   * @param bairro 
   */
  public salvar(bairro: BairroEntity) {
    if (bairro.id) {
      return this.alterar(bairro);
    } else {
      return this.adicionar(bairro);
    }
  }

  /**
   * Adiciona uma nova bairro 
   * 
   * @param bairro 
   */
  private adicionar(bairro: BairroEntity) {
    return this.http.post(environment.urlSaaS +'/bairros', bairro);
  }

  /**
   * Altera a bairro passada por parâmetro
   * 
   * @param bairro 
   */
  private alterar(bairro: BairroEntity) {
    return this.http.put(environment.urlSaaS +'/bairros/'+ bairro.id, bairro);
  }
}

export class BairroEntity {
  id: number;
  descricao: string;
  taxadeentrega: number;
}