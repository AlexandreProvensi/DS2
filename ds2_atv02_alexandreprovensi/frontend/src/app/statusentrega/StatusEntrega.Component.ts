import { MatTableDataSource } from '@angular/material/table';
import { Socket} from 'ngx-socket-io';
import { MatSidenav } from '@angular/material/sidenav';
import { Component, OnInit, ViewChild } from '@angular/core';
import { StatusEntregaService, StatusEntregaEntity } from '../_services/statusentrega.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDialogComponent, ConfirmDialogOption } from '../_components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-statusentrega',
  templateUrl: './statusentrega.component.html',
  styleUrls: ['./statusentrega.component.scss']
})
export class StatusEntregaComponent implements OnInit {

  public displayedColumns: string[] = ['username', 'password', 'options'];
  public statusentregas: StatusEntregaEntity[] = [];

  public dataSource = new MatTableDataSource<StatusEntregaEntity>();

  public errorMessage: string;
  public loading: boolean;

  public statusentrega: StatusEntregaEntity = new StatusEntregaEntity();

  @ViewChild(MatSidenav, {static: true}) sidenav: MatSidenav;

  constructor(private service: StatusEntregaService, private snackBar: MatSnackBar,
              private dialog: MatDialog, private socketClient: Socket) { }

  /**
   * Método disparado na inicialização do componente, logo após sua construção 
   */            
  ngOnInit(): void {
    //Inicializar variaveis de controle
    this.errorMessage = '';
    this.loading = true;

    //Carrega a lista de statusentregas
    this.service.listarTodos().subscribe(result => {
      
      //Alimenta o datasource da tabela com a lista recebido da service
      this.statusentregas = result as [];

      //Alimenta o datasource com os statusentregas
      this.dataSource.data = this.statusentregas;

    }, error => {

      //Se ocorreu algum erro neste processo, mostra mensagem para usuário
      this.showError('Ops! Aconteceu algo...', error);

    }).add(() => {

      //Após a execução do subscribe, dando erro ou não, oculta a barra de progresso
      this.loading = false;

    });

    //Listner do evento createStatusEntrega
    this.socketClient.fromEvent('createStatusEntrega').subscribe(result => {
      this.statusentregas.push(result as StatusEntregaEntity)
      this.dataSource.data = this.statusentregas;
    })

    //Listner do evento deleteStatusEntrega
    this.socketClient.fromEvent('deleteStatusEntrega').subscribe(result => {
      let statusentrega = result as StatusEntregaEntity;
      let index = this.statusentregas.findIndex( item => item.id == statusentrega.id);

      this.statusentregas.splice(index, 1);

      this.dataSource.data = this.statusentregas;
    })

    //Listner do evento createStatusEntrega
    this.socketClient.fromEvent('updateStatusEntrega').subscribe(result => {
      let statusentrega = result as StatusEntregaEntity;
      let index = this.statusentregas.findIndex( item => item.id == statusentrega.id);

      this.statusentregas[index] = statusentrega;

      this.dataSource.data = this.statusentregas;
    })
  }

  /**
   * Método chamado ao confirmar uma inclusão/alteração
   */
  public confirmar(): void {
    //Mostra a barra de progresso
    this.loading = true;

    //Chama o método salvar (incluir ou alterar) da service
    this.service.salvar(this.statusentrega).subscribe(result => {

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
   * @param statusentrega 
   */
  public excluir(statusentrega: StatusEntregaEntity): void {
    
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
        this.service.excluir(statusentrega.id).subscribe(result => {
          
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
    this.openSidenav(new StatusEntregaEntity());
  }

  /**
   * Abre o formulário com os campos preenchidos com os valores
   * do parametro.
   * 
   * @param statusentrega
   */
  public editar(statusentrega: StatusEntregaEntity): void {
    //Como statusentrega é passado um objeto da tabela por referencia, 
    //se não for feito uma copia deste, ao alterar a linha da 
    //tabela altera junto.
    this.openSidenav(Object.assign({}, statusentrega));
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
   * @param statusentrega 
   */
  private openSidenav(statusentrega: StatusEntregaEntity): void {
    this.statusentrega = statusentrega;
    this.sidenav.open();
  }

}