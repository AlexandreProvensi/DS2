import { Router } from 'express';
import statusentregaController from '../controller/statusentrega.controller'

class StatusEntregaRoute {

    public router: Router;

    constructor() {
        this.router = Router();

        //Inicio as rotas de statusentrega
        this.init();
    }

    private init(): void {
        //Rota raíz
        this.router.route('/')
            .get(statusentregaController.findAll)
            .post(statusentregaController.create);

        //Reta para um registro especificado pelo ID
        this.router.route('/:id([0-9]+)')
            .get(statusentregaController.findByID)
            .put(statusentregaController.update)
            .delete(statusentregaController.delete);
    }

}

export default new StatusEntregaRoute().router;