import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { OperadorEntity } from "../entity/operador.entity";

class OperadorController {
    
    public async findAll(req: Request, res: Response) {

        try {

            const operadores: OperadorEntity[] = await getRepository(OperadorEntity).find();
            res.send(operadores);

        } catch (error) {
            res.status(500).send(error);
        }

    }

    public async create(req: Request, res: Response) {

        const operador = req.body;

        console.log('Este aqui -> ', operador);

        try {

            await getRepository(OperadorEntity).save( operador );
            res.status(201).send(operador);

        } catch (error) {
            res.status(500).send(error);
        }

    }

    public async findByID(req: Request, res: Response) {
        const id = req.params.id;

        try {
            //Buscar o registro pela ID
            const operador = await getRepository(OperadorEntity).findOne(id);

            //Se não exnotrar uma operador, devolve erro 404
            if (operador) {
                res.send(operador);    
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
            const operador = await getRepository(OperadorEntity).findOne(id);

            //Se não exnotrar uma operador, devolve erro 404
            if (operador) {
                //Atualizar o registro
                await getRepository(OperadorEntity).update(operador.id, novo);

                //Atualiza o ID do objeto novo
                novo.id = operador.id;
                
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
            const operador = await getRepository(OperadorEntity).findOne(id);

            //Se não exnotrar uma operador, devolve erro 404
            if (operador) {
                //Excluir o registro
                await getRepository(OperadorEntity).delete(operador);

                res.status(204).send();

            } else {
                res.status(404).send({message: 'Record not found'})
            }

        } catch (error) {
            res.status(500).send(error);
        }

    }

}

export default new OperadorController();