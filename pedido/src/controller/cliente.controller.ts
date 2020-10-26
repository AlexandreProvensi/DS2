import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { ClienteEntity } from "../entity/cliente.entity";

class ClienteController {
    
    public async findAll(req: Request, res: Response) {

        try {

            const clientes: ClienteEntity[] = await getRepository(ClienteEntity).find();
            res.send(clientes);

        } catch (error) {
            res.status(500).send(error);
        }

    }

    public async create(req: Request, res: Response) {

        const cliente = req.body;

        console.log('Este aqui -> ', cliente);

        try {

            await getRepository(ClienteEntity).save( cliente );
            res.status(201).send(cliente);

        } catch (error) {
            res.status(500).send(error);
        }

    }

    public async findByID(req: Request, res: Response) {
        const id = req.params.id;

        try {
            //Buscar o registro pela ID
            const cliente = await getRepository(ClienteEntity).findOne(id);

            //Se não exnotrar uma cliente, devolve erro 404
            if (cliente) {
                res.send(cliente);    
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
            const cliente = await getRepository(ClienteEntity).findOne(id);

            //Se não exnotrar uma cliente, devolve erro 404
            if (cliente) {
                //Atualizar o registro
                await getRepository(ClienteEntity).update(cliente.id, novo);

                //Atualiza o ID do objeto novo
                novo.id = cliente.id;
                
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
            const cliente = await getRepository(ClienteEntity).findOne(id);

            //Se não exnotrar uma cliente, devolve erro 404
            if (cliente) {
                //Excluir o registro
                await getRepository(ClienteEntity).delete(cliente);

                res.status(204).send();

            } else {
                res.status(404).send({message: 'Record not found'})
            }

        } catch (error) {
            res.status(500).send(error);
        }

    }

}

export default new ClienteController();