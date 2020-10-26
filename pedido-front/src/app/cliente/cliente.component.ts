import { TabelaPrecoEntity } from './../../../../pedido/src/entity/tabelapreco.entity';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSidenav } from '@angular/material/sidenav';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDialogComponent, ConfirmDialogOption } from '../_components/confirm-dialog/confirm-dialog.component';
import { ClienteEntity, ClienteService } from '../_services/cliente.service';
import { CidadeEntity, CidadeService } from '../_services/cidade.service';
import { TabelaPrecoService } from '../_services/tabelapreco.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss']
})
export class ClienteComponent implements OnInit {

  public displayedColumns: string[] = ['codigo', 'nome', 'email', 'tabelapreco', 'cidade', 'options'];
  public clientes: ClienteEntity[] = [];
  public tabelasprecos: TabelaPrecoEntity[] = [];
  public cidades: CidadeEntity[] = [];

  public errorMessage: string;
  public loading: boolean;

  public cliente: ClienteEntity = new ClienteEntity();

  @ViewChild(MatSidenav, {static: true}) sidenav: MatSidenav;

  constructor(private service: ClienteService, private snackBar: MatSnackBar,
              private dialog: MatDialog, private tabelaprecoService: TabelaPrecoService,
              private cidadeService: CidadeService) { }

  /**
   * Método disparado na inicialização do componente, logo após sua construção 
   */            
  ngOnInit(): void {
    //Inicializar variaveis de controle
    this.errorMessage = '';
    this.loading = true;

    //Carrega Tabelas de Preços
    this.loadTabelasPrecos();
    
    //Carrega a lista de cidades
    this.loadCidades();

    //Carregaa lista de clientes
    this.loadClientes();
  }

  /**
   * Método chamado ao confirmar uma inclusão/alteração
   */
  public confirmar(): void {
    //Mostra a barra de progresso
    this.loading = true;

    //Chama o método salvar (incluir ou alterar) da service
    this.service.salvar(this.cliente).subscribe(result => {

      //Deu tudo certo, então avise o usuário...
      this.snackBar.open('Registro salvo com sucesso!', '', {
        duration: 3500
      });

    }, error => {
      //Se ocorreu algum erro neste processo, mostra mensagem para usuário
      this.showError('Não foi possível salvar o registro!', error);

    }).add(() => {

      //Após a execução do subscribe, dando erro ou não, 
      //oculta a barra de progresso...
      this.loading = false;

      //... e fecha a sidenav com o formulário
      this.sidenav.close();
    })
  }

  /**
   * Chama a janela de confirmação de exclusão, se usuário confirmar
   * chama evento de exclusão da service.
   * 
   * @param cliente 
   */
  public excluir(cliente: ClienteEntity): void {
    
    //Mostra a janela modal de confirmação
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      disableClose: true,
      data: new ConfirmDialogOption('Excluir Registro', 'Deseja realmente exluir o registro?', 'warn')
    });

    //Depois de fechado (clicado em cancelar ou confirmar)...
    dialogRef.afterClosed().subscribe(result => {
      
      //Se confirmou, exclui o registro
      if (result) {
        this.service.excluir(cliente.id).subscribe(result => {
          
          //Deu certo, avisa o usuário...
          this.snackBar.open('Registro excluído com sucesso!', '', {
            duration: 3500
          });

        }, error => {
          
          //Se ocorreu algum erro neste processo, mostra mensagem para usuário
          this.showError('Não foi possível excluir o registro!', error);

        }).add(() => {
          
          //Após a execução do subscribe, dando erro ou não, oculta a barra de progresso
          this.loading = false;

        });
      }
    });
  }

  /**
   * Abre o formulário com um novo cliente para inclusão
   */
  public adicionar(): void {
    //Crio um novo objeto e abro o formulario
    this.openSidenav(new ClienteEntity());
  }

  /**
   * Abre o formulário com os campos preenchidos com os valores
   * do parametro.
   * 
   * @param cliente
   */
  public editar(cliente: ClienteEntity): void {
    //Como cliente é passado um objeto da tabela por referencia, 
    //se não foir feito uma copia deste, ao alterar a linha da 
    //tabela altera junto.
    this.openSidenav(Object.create(cliente));
  }

  /**
   * Função responsável por carregar um item no select, comparando
   * os dois parametros se possuem ID's identicos. 
   * 
   * @param item1 
   * @param item2 
   */
  public compareOptions(item1, item2) {
    return item1 && item2 && item1.id === item2.id;
  }

  /**
   * Função responsável por mostrar uma mensagem de erro padrão.
   * @param text
   * @param error 
   */
  private showError(text: string, error: any): void {
    //Mostra a snackbar com fundo customizado (vermelho)
    this.snackBar.open(text, '', {
      duration: 5000,
      panelClass: 'snakWarn'
    });

    //Adiciona a mensagem de erro no painel de erro
    this.errorMessage = (error.status == 0) ? 'Não foi possível conectar ao servidor' : error.message;
  }

  /**
   * Dá um open na sidnav exibindo o formulário com os dados 
   * da objeto passado por parâmetro.
   * 
   * @param cliente 
   */
  private openSidenav(cliente: ClienteEntity): void {
    this.cliente = cliente;
    this.sidenav.open();
  }
  
  /**
   * Carrega a lista de tabelas preços
   */
  private loadTabelasPrecos(): void {
    this.loading = true;

    this.tabelaprecoService.listarTodos().subscribe(result => {
      
      //Alimenta o vetor com as tabelas de preços
      this.tabelasprecos = result as [];

    }, error => {
      //Se ocorreu algum erro neste processo, mostra mensagem para usuário
      this.showError('Ops! Aconteceu algo...', error);
    }).add(() => {
      this.loading = false;
    });
  }

  /**
   * Carrega a lista de cidades
   */
  private loadCidades(): void {
    this.loading = true;

    this.cidadeService.listarTodos().subscribe(result => {
      
      //Alimenta o vetor com as cidades
      this.cidades = result as [];

    }, error => {
      //Se ocorreu algum erro neste processo, mostra mensagem para usuário
      this.showError('Ops! Aconteceu algo...', error);
    }).add(() => {
      this.loading = false;
    });
  }

  /**
   * Carrega a lista de clientes
   */
  private loadClientes(): void {
    this.service.listarTodos().subscribe(result => {
      
      //Alimenta o datasource da tabela com a lista recebido da service
      this.clientes = result as [];

      //Carrega tabelas de preços
      

    }, error => {

      //Se ocorreu algum erro neste processo, mostra mensagem para usuário
      this.showError('Ops! Aconteceu algo...', error);

    }).add(() => {

      //Após a execução do subscribe, dando erro ou não, oculta a barra de progresso
      this.loading = false;

    });
  }

}
