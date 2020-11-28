import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { EntregadorEntity } from "../entity/entregador.entity";

class EntregadorController {
    
    public async findAll(req: Request, res: Response) {

        try {

            const entregadores: EntregadorEntity[] = await getRepository(EntregadorEntity).find();
            res.send(entregadores);

        } catch (error) {
            res.status(500).send(error);
        }

    }

    public async create(req: Request, res: Response) {

        const entregador = req.body;

        try {

            await getRepository(EntregadorEntity).save( entregador );
            res.status(201).send(entregador);

        } catch (error) {
            res.status(500).send(error);
        }

    }

    public async findByID(req: Request, res: Response) {
        const id = req.params.id;

        try {
            //Buscar o registro pela ID
            const entregador = await getRepository(EntregadorEntity).findOne(id);

            //Se não exnotrar uma entregador, devolve erro 404
            if (entregador) {
                res.send(entregador);    
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
            const entregador = await getRepository(EntregadorEntity).findOne(id);

            //Se não exnotrar uma entregador, devolve erro 404
            if (entregador) {
                //Atualizar o registro
                await getRepository(EntregadorEntity).update(entregador.id, novo);

                //Atualiza o ID do objeto novo
                novo.id = entregador.id;
                
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
            const entregador = await getRepository(EntregadorEntity).findOne(id);

            //Se não exnotrar uma entregador, devolve erro 404
            if (entregador) {
                //Excluir o registro
                await getRepository(EntregadorEntity).delete(entregador);

                res.status(204).send();

            } else {
                res.status(404).send({message: 'Record not found'})
            }

        } catch (error) {
            res.status(500).send(error);
        }

    }

}

export default new EntregadorController();