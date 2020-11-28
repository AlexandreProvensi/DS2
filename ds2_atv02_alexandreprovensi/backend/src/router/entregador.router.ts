import { Router } from 'express';
import entregadorController from '../controller/entregador.controller'

class EntregadorRoute {

    public router: Router;

    constructor() {
        this.router = Router();

        //Inicio as rotas de entregador
        this.init();
    }

    private init(): void {
        //Rota raíz
        this.router.route('/')
            .get(entregadorController.findAll)
            .post(entregadorController.create);

        //Reta para um registro especificado pelo ID
        this.router.route('/:id([0-9]+)')
            .get(entregadorController.findByID)
            .put(entregadorController.update)
            .delete(entregadorController.delete);
    }

}

export default new EntregadorRoute().router;