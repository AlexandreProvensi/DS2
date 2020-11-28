import { Router } from 'express';
import pedidoController from '../controller/pedido.controller'

class PedidoRoute {

    public router: Router;

    constructor() {
        this.router = Router();

        //Inicio as rotas de pedido
        this.init();
    }

    private init(): void {
        //Rota raíz
        this.router.route('/')
            .get(pedidoController.findAll)
            .post(pedidoController.create);

        //Reta para um registro especificado pelo ID
        this.router.route('/:id([0-9]+)')
            .get(pedidoController.findByID)
            .put(pedidoController.update)
            .delete(pedidoController.delete);
    }

}

export default new PedidoRoute().router;