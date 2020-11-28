import { Router } from 'express';
import produtoController from '../controller/produto.controller'

class ProdutoRoute {

    public router: Router;

    constructor() {
        this.router = Router();

        //Inicio as rotas de produto
        this.init();
    }

    private init(): void {
        //Rota raíz
        this.router.route('/')
            .get(produtoController.findAll)
            .post(produtoController.create);

        //Reta para um registro especificado pelo ID
        this.router.route('/:id([0-9]+)')
            .get(produtoController.findByID)
            .put(produtoController.update)
            .delete(produtoController.delete);
    }

}

export default new ProdutoRoute().router;