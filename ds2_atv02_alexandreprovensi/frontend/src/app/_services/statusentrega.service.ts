import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StatusEntregaService {

  constructor(private http: HttpClient) { }

  /**
   * Fornece uma lista com TODOS as statusentregas disponíveis
   */
  public listarTodos() {
    return this.http.get(environment.urlSaaS +'/statusentregas');
  }

  /**
   * Fornece a statusentrega com o ID passado por parâmetro
   * 
   * @param id 
   */
  public listarPorId(id: number) {
    //Assim: 
    //  return this.http.get(environment.urlSaaS +'/statusentregas/'+ id);
    //... ou, assim:
    return this.http.get(`${environment.urlSaaS}/statusentregas/${id}`);
  }

  /**
   * Exclui a statusentrega com o mesmo ID passado por parâmetro
   * 
   * @param id 
   */
  public excluir(id: number) {
    return this.http.delete(environment.urlSaaS +'/statusentregas/'+ id);
  }

  /**
   * Verifica se existe um ID na statusentrega passada por parametro.
   * Se existir, significa que a statusentrega deverá ser alterada,
   * caso contrário, significa que a statusentrega será incluída
   * 
   * @param statusentrega 
   */
  public salvar(statusentrega: StatusEntregaEntity) {
    if (statusentrega.id) {
      return this.alterar(statusentrega);
    } else {
      return this.adicionar(statusentrega);
    }
  }

  /**
   * Adiciona uma nova statusentrega 
   * 
   * @param statusentrega 
   */
  private adicionar(statusentrega: StatusEntregaEntity) {
    return this.http.post(environment.urlSaaS +'/statusentregas', statusentrega);
  }

  /**
   * Altera a statusentrega passada por parâmetro
   * 
   * @param statusentrega 
   */
  private alterar(statusentrega: StatusEntregaEntity) {
    return this.http.put(environment.urlSaaS +'/statusentregas/'+ statusentrega.id, statusentrega);
  }
}

export class StatusEntregaEntity {
  id: number;
  statusentrega: string;
}