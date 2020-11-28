import { Router } from 'express';
import operadorController from '../controller/operador.controller'

class OperadorRoute {

    public router: Router;

    constructor() {
        this.router = Router();

        //Inicio as rotas de operador
        this.init();
    }

    private init(): void {
        //Rota raíz
        this.router.route('/')
            .get(operadorController.findAll)
            .post(operadorController.create);

        //Reta para um registro especificado pelo ID
        this.router.route('/:id([0-9]+)')
            .get(operadorController.findByID)
            .put(operadorController.update)
            .delete(operadorController.delete);
    }

}

export default new OperadorRoute().router;