const tabelaprecoRepository = require('../repository/tabelapreco.repository');

module.exports = {
    find: async(req, res) => {
        //Tenta buscar todas as tabelaprecos
        try {
            const tabelapreco = await tabelaprecoRepository.find();
            res.send(tabelapreco);
        } catch (error) {
            //Deu erro?
            res.status(500).send({ message: error.message });
        }
    },
    findOne: async(req, res) => {
        try {
            //Busca a tabelapreco com o ID passado por parâmetro
            const tabelapreco = await tabelaprecoRepository.findOne(req.params.id);

            if (tabelapreco) {
                res.send(tabelapreco);
            } else {
                res.status(404).send({ message: 'Não existe uma tabelapreco com o ID informado' });
            }
        } catch (error) {
            //Deu erro?
            res.status(500).send({ message: error.message });
        }
    },
    create: async(req, res) => {
        //Tenta inserir uma nova tabelapreco
        try {
            const tabelapreco = await tabelaprecoRepository.create(req.body);
            res.send(tabelapreco);
        } catch (error) {
            //Deu erro?
            res.status(500).send({ message: error.message });
        }
    },
    update: async(req, res) => {
        try {
            //Busca a tabelapreco com o ID passado por parâmetro para ver se existe
            const tabelapreco = await tabelaprecoRepository.findOne(req.params.id);

            if (tabelapreco) {
                const tabelaprecoAtualizada = req.body;

                //Atribui o ID do item baseado no parametro da URL
                tabelaprecoAtualizada.id = tabelapreco.id;

                //Atualiza a tabelapreco
                await tabelaprecoRepository.update(tabelaprecoAtualizada)
                res.send(tabelaprecoAtualizada);
            } else {
                res.status(404).send({ message: 'Não existe uma tabelapreco com o ID informado' });
            }
        } catch (error) {
            //Deu erro?
            res.status(500).send({ message: error.message });
        }
    },
    delete: async(req, res) => {
        try {
            //Busca a tabelapreco com o ID passado por parâmetro
            const tabelapreco = await tabelaprecoRepository.findOne(req.params.id);

            if (tabelapreco) {
                await tabelaprecoRepository.delete(tabelapreco.id);
                res.status(204).send({ message: 'A tabelapreco foi excluída' });
            } else {
                res.status(404).send({ message: 'Não existe uma tabelapreco com o ID informado' });
            }
        } catch (error) {
            //Deu erro?
            res.status(500).send({ message: error.message });
        }
    },
}