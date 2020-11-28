import express from 'express';
import cors from 'cors';
import bairroRoute from './router/bairro.router'
import clienteRoute from './router/cliente.router'
import entregadorRoute from './router/entregador.router'
import pedidoRoute from './router/pedido.router'
import produtoRoute from './router/produto.router'
import statusentregaRoute from './router/statusentrega.router'
import operadorRoute from './router/operador.router'
import { Socket } from 'dgram';

export class App {
    public express: express.Application;

    constructor(){
        this.express = express();

        this.middleware();
        this.routes();
    }

    public iniSocket(soketIO): void{
        //Interceptar as rotas dispondo um socket
        this.express.use((req, res, next)=>{
            //req.io = socketIO;
        
            next();
        })

    }

    private middleware() {
        this.express.use(express.json());
        this.express.use(cors());
    }

    private routes(): void {
        this.express.use('/bairros', bairroRoute);
        this.express.use('/clientes', clienteRoute);
        this.express.use('/entregadores', entregadorRoute)
        this.express.use('/pedidos', pedidoRoute);
        this.express.use('/produtos', produtoRoute);
        this.express.use('/operadores', operadorRoute);
        this.express.use('/statusentregas', statusentregaRoute);
    }

}

export default new App().express;