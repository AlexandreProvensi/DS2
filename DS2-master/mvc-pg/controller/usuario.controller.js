const usuarioRepository = require('../repository/usuario.repository');
const pessoaRepository = require('../repository/pessoa.repository');

module.exports = {

    create: async (req, res) => {
        try {
            //Tenta inserir um novo usuário
            const usuario = await usuarioRepository.create(req.body.username, req.body.password);
            
            //Prepara o objeto pessoa para inserir
            let pessoa = {
                nome: req.body.nome,
                email: req.body.email,
                fone: null,
                endereco: null, 
                cidade: {
                    id: null
                },
                usuario: usuario
            };
            
            //Tenta inserir a pessoa
            await pessoaRepository.create( pessoa)
            res.status(201).send({message: 'Usuário criado com sucesso'});

        } catch (error) {
            //Verifica se o usuário existe
            if (error.code == 23505) {
                res.status(409).send({message: 'Usuário já existe'})
            } else {
                res.status(500).send({message: error.message})
            }
        }
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

                pessoaRepository.create( pessoa)
                    .then(result => {
                        res.status(201).send({message: 'Usuario criado com sucesso'});
                    })
                    .catch(error => {
                        res.status(500).send({message: error.message});
                    });
            })
            .catch(error => {
                //Verifica se o usuário existe
                if (error.code == 23505) {
                    res.status(409).send({message: 'Usuário já existe'})
                } else {
                    res.status(500).send({message: error.message})
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
                    res.status(403).send({failtype: error.failtype, message: error.message});
                } else {
                    res.status(500).send({message: error.message});
                }
            });
    },

    usernameExists: async (req, res) => {
        try {
            const usuario = await usuarioRepository.getByUsername(req.params.username);

            if (usuario) {
                res.send({message: 'Usuario existente'});
            } else {
                res.status(404).send({message: 'Usuario não existe'});
            }
        } catch (error) {
            es.status(500).send({message: error.message});
        }        
    },

}