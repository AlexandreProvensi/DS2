const usuarioRepository = require('../repository/usuario.repository');
const pessoaRepository = require('../repository/pessoa.repository');

module.exports = {

    signup: (req, res) => {

        const usuario = req.body;

        usuarioRepository.create(usuario.username, usuario.password)
            .then(result => {
                //Monta um objeto pessoa
                let pessoa = {
                    nome: usuario.nome,
                    email: usuario.email,
                    fone: null,
                    endereco: null,
                    cidade: {
                        id: null
                    },
                    usuario: {
                        id: result.rows[0].id
                    }
                };

                pessoaRepository.create(pessoa)
                    .then(result => {
                        res.status(201).send({ msg: 'Usuario criado com sucesso' });
                    })
                    .catch(error => {
                        res.status(500).send({ msg: error.message });
                    });
            })
            .catch(error => {
                //Verifica se o usuário existe
                if (error.code == 23505) {
                    res.status(409).send({ msg: 'Usuário já existe' })
                } else {
                    res.status(500).send({ msg: error.message })
                }
            });

    },

    signin: (req, res) => {
        const usuario = req.body;

        usuarioRepository.signin(usuario.username, usuario.password)
            .then(result => {
                res.send(result.rows[0]);
            })
            .catch(error => {
                if (error.failtype) {
                    res.status(403).send({ failtype: error.failtype, msg: error.message });
                } else {
                    res.status(500).send({ msg: error.message });
                }
            });
    },

    usernameExists: (req, res) => {
        const username = req.params.username;

        usuarioRepository.usernameExists(username)
            .then(result => {
                if (result.rows.length > 0) {
                    res.send({ msg: 'Usuario já existe' });
                } else {
                    res.status(404).send({ msg: 'Usuario não existe' });
                }
            })
            .catch(error => {
                res.status(500).send({ msg: error.message });
            });
    },

}