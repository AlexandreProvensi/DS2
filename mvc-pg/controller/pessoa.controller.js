const pessoaRepository = require('../repository/pessoa.repository');

//Camada Controller
module.exports = {

    //Retorna TODOS
    find: (req, res) => {
        pessoaRepository.find()
            .then((result) => {

                let pessoas = [];

                for (let i = 0; i < result.rows.length; i++) {

                    //Alimenta Cidade
                    let cidade = {};
                    cidade.id = result.rows[i].cidade_id;
                    cidade.nome = result.rows[i].cidade_nome;
                    cidade.uf = result.rows[i].cidade_uf;

                    //Alimenta pessoa
                    let pessoa = {
                        id: result.rows[i].id,
                        nome: result.rows[i].nome,
                        email: result.rows[i].email,
                        username: result.rows[i].username,
                        fone: result.rows[i].fone,
                        endereco: result.rows[i].endereco,
                        status: result.rows[i].status,
                        cidade: result.rows[i].cidade_id ? cidade : null
                    }

                    pessoas.push(pessoa);
                }

                res.send(pessoas);
            })
            .catch((error) => {
                res.status(500).send({ msg: error.message });
            });
    },

    //Retorna pelo ID
    findOne: (req, res) => {
        const id = req.params.id;

        pessoaRepository.findOne(id)
            .then((result) => {

                if (result.rows.length > 0) {
                    //Alimenta Cidade
                    let cidade = {};
                    cidade.id = result.rows[0].cidade_id;
                    cidade.nome = result.rows[0].cidade_nome;
                    cidade.uf = result.rows[0].cidade_uf;

                    //Alimenta pessoa
                    let pessoa = {
                        id: result.rows[0].id,
                        nome: result.rows[0].nome,
                        email: result.rows[0].email,
                        username: result.rows[0].username,
                        fone: result.rows[0].fone,
                        endereco: result.rows[0].endereco,
                        status: result.rows[0].status,
                        cidade: result.rows[0].cidade_id ? cidade : null
                    }

                    res.send(pessoa);
                } else {
                    res.status(404).send({ msg: 'Registro não encontrado' });
                }

            })
            .catch((error) => {
                res.status(500).send({ msg: error.message });
            });
    },

    //Adiciona um registro
    create: (req, res) => {
        const pessoa = req.body;

        pessoaRepository.create(pessoa)
            .then((result) => {
                res.status(201).send(result.rows[0]);
            })
            .catch((error) => {
                res.status(500).send({ msg: error.message });
            });
    },

    //Altera um registro
    update: (req, res) => {
        //Pega o conteúdo do corpo da requisição
        const pessoa = req.body;

        //Atribui o ID do item baseado no parametro da URL
        pessoa.id = req.params.id;

        pessoaRepository.update(pessoa)
            .then((result) => {

                if (result.rows.length > 0) {
                    res.send(result.rows[0]);
                } else {
                    res.status(404).send({ msg: 'Registro não encontrado' });
                }

            })
            .catch((error) => {
                res.status(500).send({ msg: error.message });
            });
    },

    //Remove um registro
    delete: (req, res) => {

        //Pega o ID a ser excluído através da URL
        var id = req.params.id;

        pessoaRepository.delete(id)
            .then((result) => {

                if (result.rowCount > 0) {
                    res.status(204).send();
                } else {
                    res.status(404).send({ msg: 'Registro não encontrado' });
                }

            })
            .catch((error) => {
                res.status(500).send({ msg: error.message });
            });
    },

}