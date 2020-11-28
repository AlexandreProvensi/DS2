import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BairroEntity } from './bairro.service';

@Injectable({
  providedIn: 'root'
})
export class EntregadorService {

  constructor(private http: HttpClient) { }

  /**
   * Fornece uma lista com TODOS as entregadores disponíveis
   */
  public listarTodos() {
    return this.http.get(environment.urlSaaS +'/entregadores');
  }

  /**
   * Fornece a entregador com o ID passado por parâmetro
   * 
   * @param id 
   */
  public listarPorId(id: number) {
    //Assim: 
    //  return this.http.get(environment.urlSaaS +'/entregadores/'+ id);
    //... ou, assim:
    return this.http.get(`${environment.urlSaaS}/entregadores/${id}`);
  }

  /**
   * Exclui a entregador com o mesmo ID passado por parâmetro
   * 
   * @param id 
   */
  public excluir(id: number) {
    return this.http.delete(environment.urlSaaS +'/entregadores/'+ id);
  }

  /**
   * Verifica se existe um ID na entregador passada por parametro.
   * Se existir, significa que a entregador deverá ser alterada,
   * caso contrário, significa que a entregador será incluída
   * 
   * @param entregador
   */
  public salvar(entregador: EntregadorEntity) {
    if (entregador.id) {
      return this.alterar(entregador);
    } else {
      return this.adicionar(entregador);
    }
  }

  /**
   * Adiciona uma nova entregador
   * 
   * @param entregador
   */
  private adicionar(entregador: EntregadorEntity) {
    return this.http.post(environment.urlSaaS +'/entregadores', entregador);
  }

  /**
   * Altera a entregador passada por parâmetro
   * 
   * @param entregador
   */
  private alterar(entregador: EntregadorEntity) {
    return this.http.put(environment.urlSaaS +'/entregadores/'+ entregador.id, entregador);
  }
}

export class EntregadorEntity {
  id: number;
  nome: string;
}