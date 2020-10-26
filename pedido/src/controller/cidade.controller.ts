import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { CidadeEntity } from "../entity/cidade.entity";

class CidadeController {
    
    public async findAll(req: Request, res: Response) {

        try {

            const cidades: CidadeEntity[] = await getRepository(CidadeEntity).find();
            res.send(cidades);

        } catch (error) {
            res.status(500).send(error);
        }

    }

    public async create(req: Request, res: Response) {

        const cidade = req.body;

        try {

            await getRepository(CidadeEntity).save( cidade );
            res.status(201).send(cidade);

        } catch (error) {
            res.status(500).send(error);
        }

    }

    public async findByID(req: Request, res: Response) {
        const id = req.params.id;

        try {
            //Buscar o registro pela ID
            const cidade = await getRepository(CidadeEntity).findOne(id);

            //Se não exnotrar uma cidade, devolve erro 404
            if (cidade) {
                res.send(cidade);    
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
            const cidade = await getRepository(CidadeEntity).findOne(id);

            //Se não exnotrar uma cidade, devolve erro 404
            if (cidade) {
                //Atualizar o registro
                await getRepository(CidadeEntity).update(cidade.id, novo);

                //Atualiza o ID do objeto novo
                novo.id = cidade.id;
                
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
            const cidade = await getRepository(CidadeEntity).findOne(id);

            //Se não exnotrar uma cidade, devolve erro 404
            if (cidade) {
                //Excluir o registro
                await getRepository(CidadeEntity).delete(cidade);

                res.status(204).send();

            } else {
                res.status(404).send({message: 'Record not found'})
            }

        } catch (error) {
            res.status(500).send(error);
        }

    }

}

export default new CidadeController();