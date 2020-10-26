import { Router } from 'express';
import tabelaprecoController from '../controller/tabelapreco.controller'

class TabelaPrecoRoute {

    public router: Router;

    constructor() {
        this.router = Router();

        //Inicio as rotas de tabela preco
        this.init();
    }

    private init(): void {
        //Rota raíz
        this.router.route('/')
            .get(tabelaprecoController.findAll)
            .post(tabelaprecoController.create);

        //Reta para um registro especificado pelo ID
        this.router.route('/:id([0-9]+)')
            .get(tabelaprecoController.findByID)
            .put(tabelaprecoController.update)
            .delete(tabelaprecoController.delete);
    }

}

export default new TabelaPrecoRoute().router;