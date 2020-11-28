import { Router } from 'express';
import bairroController from '../controller/bairro.controller'

class BairroRoute {

    public router: Router;

    constructor() {
        this.router = Router();

        //Inicio as rotas de bairro
        this.init();
    }

    private init(): void {
        //Rota raíz
        this.router.route('/')
            .get(bairroController.findAll)
            .post(bairroController.create);

        //Reta para um registro especificado pelo ID
        this.router.route('/:id([0-9]+)')
            .get(bairroController.findByID)
            .put(bairroController.update)
            .delete(bairroController.delete);
    }

}

export default new BairroRoute().router;