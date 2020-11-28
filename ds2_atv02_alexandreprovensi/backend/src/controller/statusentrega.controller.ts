import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { StatusEntregaEntity } from "../entity/statusentrega.entity";

class StatusEntregaController {
    
    public async findAll(req: Request, res: Response) {

        try {

            const statusentregas: StatusEntregaEntity[] = await getRepository(StatusEntregaEntity).find();
            res.send(statusentregas);

        } catch (error) {
            res.status(500).send(error);
        }

    }

    public async create(req: Request, res: Response) {

        const statusentrega = req.body;

        try {

            await getRepository(StatusEntregaEntity).save( statusentrega );
            res.status(201).send(statusentrega);

        } catch (error) {
            res.status(500).send(error);
        }

    }

    public async findByID(req: Request, res: Response) {
        const id = req.params.id;

        try {
            //Buscar o registro pela ID
            const statusentrega = await getRepository(StatusEntregaEntity).findOne(id);

            //Se não exnotrar uma statusentrega, devolve erro 404
            if (statusentrega) {
                res.send(statusentrega);    
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
            const statusentrega = await getRepository(StatusEntregaEntity).findOne(id);

            //Se não exnotrar uma statusentrega, devolve erro 404
            if (statusentrega) {
                //Atualizar o registro
                await getRepository(StatusEntregaEntity).update(statusentrega.id, novo);

                //Atualiza o ID do objeto novo
                novo.id = statusentrega.id;
                
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
            const statusentrega = await getRepository(StatusEntregaEntity).findOne(id);

            //Se não exnotrar uma statusentrega, devolve erro 404
            if (statusentrega) {
                //Excluir o registro
                await getRepository(StatusEntregaEntity).delete(statusentrega);

                res.status(204).send();

            } else {
                res.status(404).send({message: 'Record not found'})
            }

        } catch (error) {
            res.status(500).send(error);
        }

    }

}

export default new StatusEntregaController();