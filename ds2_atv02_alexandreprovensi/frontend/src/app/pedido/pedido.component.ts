import { MatTableDataSource } from '@angular/material/table';
import { Socket} from 'ngx-socket-io';
import { MatSidenav } from '@angular/material/sidenav';
import { Component, OnInit, ViewChild } from '@angular/core';
import { PedidoService, PedidoEntity } from '../_services/pedido.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDialogComponent, ConfirmDialogOption } from '../_components/confirm-dialog/confirm-dialog.component';
import { OperadorEntity, OperadorService } from '../_services/operador.service';
import { ClienteEntity, ClienteService } from '../_services/cliente.service';
import { StatusEntregaEntity, StatusEntregaService } from '../_services/statusentrega.service';
import { EntregadorEntity, EntregadorService } from '../_services/entregador.service';
import { ProdutoEntity, ProdutoService } from '../_services/produto.service';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.scss']
})
export class PedidoComponent implements OnInit {

  public displayedColumns: string[] = ['valor_pedido', 'operador','cliente','statusentrega',
  'entregador','produto','options'];
  public pedidos: PedidoEntity[] = [];
  public operadores: OperadorEntity[] = [];
  public clientes: ClienteEntity[] = [];
  public statusentrega: StatusEntregaEntity[] = [];
  public entregadores: EntregadorEntity[] = [];
  public produtos: ProdutoEntity[] = [];
  

  public dataSource = new MatTableDataSource<PedidoEntity>();

  public errorMessage: string;
  public loading: boolean;

  public pedido: PedidoEntity = new PedidoEntity();

  @ViewChild(MatSidenav, {static: true}) sidenav: MatSidenav;

  constructor(private service: PedidoService, private snackBar: MatSnackBar,
              private dialog: MatDialog, private socketClient: Socket,
              private operadorService: OperadorService,
              private clienteService: ClienteService,
              private statusService: StatusEntregaService,
              private entregadoresService: EntregadorService,
              private produtosService: ProdutoService) { }

  /**
   * Método disparado na inicialização do componente, logo após sua construção 
   */            
  ngOnInit(): void {
    //Inicializar variaveis de controle
    this.errorMessage = '';
    this.loading = true;

    //Carrega a lista de pedidos
    this.service.listarTodos().subscribe(result => {
      
      //Alimenta o datasource da tabela com a lista recebido da service
      this.pedidos = result as [];

      //Alimenta o datasource com os pedidos
      this.dataSource.data = this.pedidos;

      //Carrega os Operadores
      this.operadorService.listarTodos().subscribe(result =>{
        this.operadores = result as [];
      })

      //Carrega os Clientes
      this.clienteService.listarTodos().subscribe(result =>{
        this.clientes = result as [];
      })

      //Carrega os Status
      this.statusService.listarTodos().subscribe(result =>{
        this.statusentrega = result as [];
      })

      //Carrega os Entregadores
        this.entregadoresService.listarTodos().subscribe(result =>{
          this.entregadores = result as [];
        })
      //Carrega os Produtos
         this.produtosService.listarTodos().subscribe(result =>{
          this.produtos = result as [];
        })

    }, error => {

      //Se ocorreu algum erro neste processo, mostra mensagem para usuário
      this.showError('Ops! Aconteceu algo...', error);

    }).add(() => {

      //Após a execução do subscribe, dando erro ou não, oculta a barra de progresso
      this.loading = false;

    });

    //Listner do evento createPedido
    this.socketClient.fromEvent('createPedido').subscribe(result => {
      this.pedidos.push(result as PedidoEntity)
      this.dataSource.data = this.pedidos;
    })

    //Listner do evento deletePedido
    this.socketClient.fromEvent('deletePedido').subscribe(result => {
      let pedido = result as PedidoEntity;
      let index = this.pedidos.findIndex( item => item.id == pedido.id);

      this.pedidos.splice(index, 1);

      this.dataSource.data = this.pedidos;
    })

    //Listner do evento createPedido
    this.socketClient.fromEvent('updatePedido').subscribe(result => {
      let pedido = result as PedidoEntity;
      let index = this.pedidos.findIndex( item => item.id == pedido.id);

      this.pedidos[index] = pedido;

      this.dataSource.data = this.pedidos;
    })
  }

  /**
   * Método chamado ao confirmar uma inclusão/alteração
   */
  public confirmar(): void {
    //Mostra a barra de progresso
    this.loading = true;

    //Chama o método salvar (incluir ou alterar) da service
    this.service.salvar(this.pedido).subscribe(result => {

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
   * @param pedido 
   */
  public excluir(pedido: PedidoEntity): void {
    
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
        this.service.excluir(pedido.id).subscribe(result => {
          
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
   * Abre o formulário com um novo pedido para inclusão
   */
  public adicionar(): void {
    //Crio um novo objeto e abro o formulario
    this.openSidenav(new PedidoEntity());
  }

  /**
   * Abre o formulário com os campos preenchidos com os valores
   * do parametro.
   * 
   * @param pedido
   */
  public editar(pedido: PedidoEntity): void {
    //Como pedido é passado um objeto da tabela por referencia, 
    //se não for feito uma copia deste, ao alterar a linha da 
    //tabela altera junto.
    this.openSidenav(Object.assign({}, pedido));
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
   * @param pedido 
   */
  private openSidenav(pedido: PedidoEntity): void {
    this.pedido = pedido;
    this.sidenav.open();
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

}