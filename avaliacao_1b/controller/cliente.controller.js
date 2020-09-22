const clienteRepository = require('../repository/cliente.repository');

module.exports = {
    find: async (req,res)=> {
        //Tenta buscar todas as clientes
        try {
            const clientes = await clienteRepository.find(); 
            res.send(clientes);   
        } catch (error) {
            //Deu erro?
            res.status(500).send({ message: error.message });
        }
    },
    findOne: async (req,res)=> {
        try {
            //Busca a cliente com o ID passado por parâmetro
            const cliente = await clienteRepository.findOne(req.params.id);

            if (cliente) {
                res.send(cliente);    
            } else {
                res.status(404).send({ message: 'Não existe uma cliente com o ID informado' });
            }            
        } catch (error) {
            //Deu erro?
            res.status(500).send({ message: error.message });
        }      
    },
    create: async (req,res)=> {
        //Tenta inserir uma nova cliente
        try {
            const cliente = await clienteRepository.create(req.body);
            res.send(cliente);
        } catch (error) {
            //Deu erro?
            res.status(500).send({ message: error.message });
        }       
    },
    update: async (req,res)=> {
        try {
            //Busca a cliente com o ID passado por parâmetro para ver se existe
            const cliente = await clienteRepository.findOne(req.params.id);

            if (cliente) {
                const clienteAtualizada = req.body;

                //Atribui o ID do item baseado no parametro da URL
                clienteAtualizada.id = cliente.id;

                //Atualiza a cliente
                await clienteRepository.update( clienteAtualizada )
                res.send(clienteAtualizada);
            } else {
                res.status(404).send({ message: 'Não existe uma cliente com o ID informado' });
            }
        } catch (error) {
            //Deu erro?
            res.status(500).send({ message: error.message });
        }       
    },
    delete: async (req,res)=> {
        try {
            //Busca a cliente com o ID passado por parâmetro
            const cliente = await clienteRepository.findOne(req.params.id);

            if (cliente) {
                await clienteRepository.delete(cliente.id);
                res.status(204).send({message: 'A cliente foi excluída'});    
            } else {
                res.status(404).send({ message: 'Não existe uma cliente com o ID informado' });
            }            
        } catch (error) {
            //Deu erro?
            res.status(500).send({ message: error.message });
        }       
    },
}