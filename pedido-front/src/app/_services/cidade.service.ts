import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CidadeService {

  constructor(private http: HttpClient) { }

  /**
   * Fornece uma lista com TODOS as cidades disponíveis
   */
  public listarTodos() {
    return this.http.get(environment.urlSaaS +'/cidades');
  }

  /**
   * Fornece a cidade com o ID passado por parâmetro
   * 
   * @param id 
   */
  public listarPorId(id: number) {
    //Assim: 
    //  return this.http.get(environment.urlSaaS +'/cidades/'+ id);
    //... ou, assim:
    return this.http.get(`${environment.urlSaaS}/cidades/${id}`);
  }

  /**
   * Exclui a cidade com o mesmo ID passado por parâmetro
   * 
   * @param id 
   */
  public excluir(id: number) {
    return this.http.delete(environment.urlSaaS +'/cidades/'+ id);
  }

  /**
   * Verifica se existe um ID na cidade passada por parametro.
   * Se existir, significa que a cidade deverá ser alterada,
   * caso contrário, significa que a cidade será incluída
   * 
   * @param cidade 
   */
  public salvar(cidade: CidadeEntity) {
    if (cidade.id) {
      return this.alterar(cidade);
    } else {
      return this.adicionar(cidade);
    }
  }

  /**
   * Adiciona uma nova cidade 
   * 
   * @param cidade 
   */
  private adicionar(cidade: CidadeEntity) {
    return this.http.post(environment.urlSaaS +'/cidades', cidade);
  }

  /**
   * Altera a cidade passada por parâmetro
   * 
   * @param cidade 
   */
  private alterar(cidade: CidadeEntity) {
    return this.http.put(environment.urlSaaS +'/cidades/'+ cidade.id, cidade);
  }
}

export class CidadeEntity {
  id: number;
  nome: string;
  uf: string;
}