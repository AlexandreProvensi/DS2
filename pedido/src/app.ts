import express from 'express';
import cors from 'cors';
import cidadeRoute from './router/cidade.route'
import clienteRoute from './router/cliente.route'
import pedidoRoute from './router/pedido.route'
import produtoRoute from './router/produto.route'
import tabelaprecoRoute from './router/tabelapreco.route'
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
        this.express.use('/cidades', cidadeRoute);
        this.express.use('/clientes', clienteRoute);
        this.express.use('/pedidos', pedidoRoute);
        this.express.use('/produtos', produtoRoute);
        this.express.use('/tabelasprecos', tabelaprecoRoute);
    }

}

export default new App().express;