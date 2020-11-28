import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { BairroEntity } from "../entity/bairro.entity";

class BairroController {
    
    public async findAll(req: Request, res: Response) {

        try {

            const bairros: BairroEntity[] = await getRepository(BairroEntity).find();
            res.send(bairros);

        } catch (error) {
            res.status(500).send(error);
        }

    }

    public async create(req: Request, res: Response) {

        const bairro = req.body;

        try {

            await getRepository(BairroEntity).save( bairro );
            res.status(201).send(bairro);

        } catch (error) {
            res.status(500).send(error);
        }

    }

    public async findByID(req: Request, res: Response) {
        const id = req.params.id;

        try {
            //Buscar o registro pela ID
            const bairro = await getRepository(BairroEntity).findOne(id);

            //Se não exnotrar uma bairro, devolve erro 404
            if (bairro) {
                res.send(bairro);    
            } else {
                res.status(404).send({message: 'Record not found'})
            }

        } catch (error) {
            res.status(500).send(error);
        }

    }

    public async update(req: Request, res: Response) {
        const id = req.params.id;
        const novo = req.body;

        try {
            //Buscar o registro pela ID
            const bairro = await getRepository(BairroEntity).findOne(id);

            //Se não exnotrar uma bairro, devolve erro 404
            if (bairro) {
                //Atualizar o registro
                await getRepository(BairroEntity).update(bairro.id, novo);

                //Atualiza o ID do objeto novo
                novo.id = bairro.id;
                
                res.send(novo);

            } else {
                res.status(404).send({message: 'Record not found'})
            }

        } catch (error) {
            res.status(500).send(error);
        }

    }

    public async delete(req: Request, res: Response) {
        const id = req.params.id;

        try {
            //Buscar o registro pela ID
            const bairro = await getRepository(BairroEntity).findOne(id);

            //Se não exnotrar uma bairro, devolve erro 404
            if (bairro) {
                //Excluir o registro
                await getRepository(BairroEntity).delete(bairro);

                res.status(204).send();

            } else {
                res.status(404).send({message: 'Record not found'})
            }

        } catch (error) {
            res.status(500).send(error);
        }

    }

}

export default new BairroController();