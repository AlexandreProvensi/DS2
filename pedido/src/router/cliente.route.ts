import { Router } from 'express';
import clienteController from '../controller/cliente.controller'

class ClienteRoute {

    public router: Router;

    constructor() {
        this.router = Router();

        //Inicio as rotas de cliente
        this.init();
    }

    private init(): void {
        //Rota raíz
        this.router.route('/')
            .get(clienteController.findAll)
            .post(clienteController.create);

        //Reta para um registro especificado pelo ID
        this.router.route('/:id([0-9]+)')
            .get(clienteController.findByID)
            .put(clienteController.update)
            .delete(clienteController.delete);
    }

}

export default new ClienteRoute().router;