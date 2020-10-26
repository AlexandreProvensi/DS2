import { Router } from 'express';
import cidadeController from '../controller/cidade.controller'

class CidadeRoute {

    public router: Router;

    constructor() {
        this.router = Router();

        //Inicio as rotas de cidade
        this.init();
    }

    private init(): void {
        //Rota raíz
        this.router.route('/')
            .get(cidadeController.findAll)
            .post(cidadeController.create);

        //Reta para um registro especificado pelo ID
        this.router.route('/:id([0-9]+)')
            .get(cidadeController.findByID)
            .put(cidadeController.update)
            .delete(cidadeController.delete);
    }

}

export default new CidadeRoute().router;