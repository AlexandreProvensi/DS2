const pessoaRepository = require('../repository/pessoa.repository');

module.exports = {
    find: async (req,res)=> {
        //Tenta buscar todas as pessoas
        try {
            const pessoas = await pessoaRepository.find(); 
            res.send(pessoas);   
        } catch (error) {
            //Deu erro?
            res.status(500).send({ message: error.message });
        }
    },
    findOne: async (req,res)=> {
        try {
            //Busca a pessoa com o ID passado por parâmetro
            const pessoa = await pessoaRepository.findOne(req.params.id);

            if (pessoa) {
                res.send(pessoa);    
            } else {
                res.status(404).send({ message: 'Não existe uma pessoa com o ID informado' });
            }            
        } catch (error) {
            //Deu erro?
            res.status(500).send({ message: error.message });
        }      
    },
    create: async (req,res)=> {
        //Tenta inserir uma nova pessoa
        try {
            const pessoa = await pessoaRepository.create(req.body);
            res.send(pessoa);
        } catch (error) {
            //Deu erro?
            res.status(500).send({ message: error.message });
        }       
    },
    update: async (req,res)=> {
        try {
            //Busca a pessoa com o ID passado por parâmetro para ver se existe
            const pessoa = await pessoaRepository.findOne(req.params.id);

            if (pessoa) {
                const pessoaAtualizada = req.body;

                //Atribui o ID do item baseado no parametro da URL
                pessoaAtualizada.id = pessoa.id;

                //Atualiza a pessoa
                await pessoaRepository.update( pessoaAtualizada )
                res.send(pessoaAtualizada);
            } else {
                res.status(404).send({ message: 'Não existe uma pessoa com o ID informado' });
            }
        } catch (error) {
            //Deu erro?
            res.status(500).send({ message: error.message });
        }       
    },
    delete: async (req,res)=> {
        try {
            //Busca a pessoa com o ID passado por parâmetro
            const pessoa = await pessoaRepository.findOne(req.params.id);

            if (pessoa) {
                await pessoaRepository.delete(pessoa.id);
                res.status(204).send({message: 'A pessoa foi excluída'});    
            } else {
                res.status(404).send({ message: 'Não existe uma pessoa com o ID informado' });
            }            
        } catch (error) {
            //Deu erro?
            res.status(500).send({ message: error.message });
        }       
    },
}