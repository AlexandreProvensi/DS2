const cidadeRepository = require('../repository/cidade.repository');

module.exports = {
    find: async (req,res)=> {
        //Tenta buscar todas as cidades
        try {
            const cidades = await cidadeRepository.find(); 
            res.send(cidades);   
        } catch (error) {
            //Deu erro?
            res.status(500).send({ message: error.message });
        }
    },
    findOne: async (req,res)=> {
        try {
            //Busca a cidade com o ID passado por parâmetro
            const cidade = await cidadeRepository.findOne(req.params.id);

            if (cidade) {
                res.send(cidade);    
            } else {
                res.status(404).send({ message: 'Não existe uma cidade com o ID informado' });
            }            
        } catch (error) {
            //Deu erro?
            res.status(500).send({ message: error.message });
        }      
    },
    create: async (req,res)=> {
        //Tenta inserir uma nova cidade
        try {
            const cidade = await cidadeRepository.create(req.body);
            res.send(cidade);
        } catch (error) {
            //Deu erro?
            res.status(500).send({ message: error.message });
        }       
    },
    update: async (req,res)=> {
        try {
            //Busca a cidade com o ID passado por parâmetro para ver se existe
            const cidade = await cidadeRepository.findOne(req.params.id);

            if (cidade) {
                const cidadeAtualizada = req.body;

                //Atribui o ID do item baseado no parametro da URL
                cidadeAtualizada.id = cidade.id;

                //Atualiza a cidade
                await cidadeRepository.update( cidadeAtualizada )
                res.send(cidadeAtualizada);
            } else {
                res.status(404).send({ message: 'Não existe uma cidade com o ID informado' });
            }
        } catch (error) {
            //Deu erro?
            res.status(500).send({ message: error.message });
        }       
    },
    delete: async (req,res)=> {
        try {
            //Busca a cidade com o ID passado por parâmetro
            const cidade = await cidadeRepository.findOne(req.params.id);

            if (cidade) {
                await cidadeRepository.delete(cidade.id);
                res.status(204).send({message: 'A cidade foi excluída'});    
            } else {
                res.status(404).send({ message: 'Não existe uma cidade com o ID informado' });
            }            
        } catch (error) {
            //Deu erro?
            res.status(500).send({ message: error.message });
        }       
    },
}