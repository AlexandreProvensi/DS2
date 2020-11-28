  
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OperadorService {

  constructor(private http: HttpClient) { }

  /**
   * Fornece uma lista com TODOS as operadores disponíveis
   */
  public listarTodos() {
    return this.http.get(environment.urlSaaS +'/operadores');
  }

  /**
   * Fornece a operador com o ID passado por parâmetro
   * 
   * @param id 
   */
  public listarPorId(id: number) {
    //Assim: 
    //  return this.http.get(environment.urlSaaS +'/operadores/'+ id);
    //... ou, assim:
    return this.http.get(`${environment.urlSaaS}/operadores/${id}`);
  }

  /**
   * Exclui a operador com o mesmo ID passado por parâmetro
   * 
   * @param id 
   */
  public excluir(id: number) {
    return this.http.delete(environment.urlSaaS +'/operadores/'+ id);
  }

  /**
   * Verifica se existe um ID na operador passada por parametro.
   * Se existir, significa que a operador deverá ser alterada,
   * caso contrário, significa que a operador será incluída
   * 
   * @param operador
   */
  public salvar(operador: OperadorEntity) {
    if (operador.id) {
      return this.alterar(operador);
    } else {
      return this.adicionar(operador);
    }
  }

  /**
   * Adiciona uma nova operador
   * 
   * @param operador
   */
  private adicionar(operador: OperadorEntity) {
    return this.http.post(environment.urlSaaS +'/operadores', operador);
  }

  /**
   * Altera a operador passada por parâmetro
   * 
   * @param operador
   */
  private alterar(operador: OperadorEntity) {
    return this.http.put(environment.urlSaaS +'/operadores/'+ operador.id, operador);
  }
}

export class OperadorEntity {
  id: number;
  username: string;
  password: string;
}