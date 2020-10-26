import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TabelaPrecoEntity } from './tabelapreco.service';
import { CidadeEntity } from './cidade.service';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private http: HttpClient) { }

  /**
   * Fornece uma lista com TODOS as clientes disponíveis
   */
  public listarTodos() {
    return this.http.get(environment.urlSaaS +'/clientes');
  }

  /**
   * Fornece a cliente com o ID passado por parâmetro
   * 
   * @param id 
   */
  public listarPorId(id: number) {
    return this.http.get(`${environment.urlSaaS}/clientes/${id}`);
  }

  /**
   * Exclui a cliente com o mesmo ID passado por parâmetro
   * 
   * @param id 
   */
  public excluir(id: number) {
    return this.http.delete(environment.urlSaaS +'/clientes/'+ id);
  }

  /**
   * Verifica se existe um ID na cliente passada por parametro.
   * Se existir, significa que a cliente deverá ser alterada,
   * caso contrário, significa que a cliente será incluída
   * 
   * @param cliente 
   */
  public salvar(cliente: ClienteEntity) {
    if (cliente.id) {
      return this.alterar(cliente);
    } else {
      return this.adicionar(cliente);
    }
  }

  /**
   * Adiciona uma nova cliente 
   * 
   * @param cliente 
   */
  private adicionar(cliente: ClienteEntity) {
    return this.http.post(environment.urlSaaS +'/clientes', cliente);
  }

  /**
   * Altera a cliente passada por parâmetro
   * 
   * @param cliente 
   */
  private alterar(cliente: ClienteEntity) {
    return this.http.put(environment.urlSaaS +'/clientes/'+ cliente.id, cliente);
  }
}

export class ClienteEntity {
  id: number;
  codigo: string;
  nome: string;
  email: string;
  tabelapreco: TabelaPrecoEntity;
  cidade: CidadeEntity;
}