import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BairroComponent } from './bairro/bairro.component';
import { ClienteComponent } from './cliente/cliente.component';
import { EntregadorComponent } from './entregador/entregador.component';
import { OperadorComponent } from './operador/operador.component';
import { PedidoComponent } from './pedido/pedido.component';
import { ProdutoComponent } from './produto/produto.component';
import { StatusEntregaComponent } from './statusentrega/statusentrega.component';

const routes: Routes = [
  {path: 'bairros', component: BairroComponent},
  {path: 'clientes', component: ClienteComponent},
  {path: 'entregadores', component: EntregadorComponent},
  {path: 'operadores', component: OperadorComponent},
  {path: 'pedidos', component: PedidoComponent},
  {path: 'produtos', component: ProdutoComponent},
  {path: 'statusentregas', component: StatusEntregaComponent},
  {path: '**', redirectTo: 'pedidos'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
