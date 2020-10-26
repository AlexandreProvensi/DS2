const fotoRepository = require('../repository/foto.repository');
const usuarioRepository = require('../repository/usuario.repository');
const comentarioRepository = require('../repository/comentario.repository');
const curtidaRepository = require('../repository/curtida.repository');

module.exports = {
    find: async (req,res) => {

        //Pega o nome do usuário a partir de seu username
        const usuario = await usuarioRepository.getByUsername( req.username );

        //Existe um usuário com este username?
        if (usuario) {
            
            try {

                //Tenta pegar as fotos deste usuário
                const fotos = await fotoRepository.find( usuario );
                res.send(fotos);

            } catch (error) {
                res.status(500).send(error);
            }

        } else {
            res.status(404).send({message: 'Usuário não foi encontrado'});
        }
    },
    findOne: async (req,res)=> {
        
        try {
            //Pega o nome do usuário a partir de seu username
            const usuario = await usuarioRepository.getByUsername( req.username );

            //Existe um usuário com este username?
            if (usuario) {
            
                //Pega a foto pelo seu ID
                const foto = await fotoRepository.findOne( usuario, req.params.id );

                //Existe uma foto com este ID?
                if (foto) {
                    res.send(foto);
                } else {
                    res.status(404).send({message: 'Foto não foi encontrada'});
                }
            } else {
                res.status(404).send({message: 'Usuário não foi encontrado  '});
            }
        } catch (error) {
            //Deu erro?
            res.status(500).send(error);
        }               
    },
    create: (req,res)=> {
        const foto = req.body;

        fotoRepository.create( foto )
            .then((result) => {
                res.status(201).send(result.rows[0]);
            })
            .catch((error) => {
                res.status(500).send({ msg: error.message });
            });        
    },
    delete: async (req,res)=> {

        try {
            //Pega o nome do usuário a partir de seu username
            const usuario = await usuarioRepository.getByUsername( req.username );

            //Existe um usuário com este username?
            if (usuario) {

                //Pega a foto pelo seu ID
                const foto = await fotoRepository.findOne( usuario, req.params.id );

                //Existe uma foto com este ID?
                if (foto) {
                    //Marcar a foto como excluída setando o status como 'N'
                    foto.status = 'N';
                    
                    //Atualiza foto
                    await fotoRepository.update(foto);
                    res.send({message: 'Foto foi removida'});
                } else {
                    res.status(404).send({message: 'Foto não foi encontrada'});
                }
            } else {
                res.status(404).send({message: 'Usuário não foi encontrado  '});
            }
        } catch (error) {
            //Deu erro?
            res.status(500).send(error);
        }

    },
    getComentarios: async (req,res) => {

        try {
            //Pega o nome do usuário a partir de seu username
            const usuario = await usuarioRepository.getByUsername( req.username );

            //Existe um usuário com este username?
            if (usuario) {

                //Pega a foto pelo seu ID
                const foto = await fotoRepository.findOne( usuario, req.params.id );

                //Existe uma foto com este ID?
                if (foto) {
                    
                    //Busca os comentarios da foto
                    const comentarios = await comentarioRepository.findByFoto(foto);
                    res.send(comentarios);

                } else {
                    res.status(404).send({message: 'Foto não foi encontrada'});
                }

            } else {
                res.status(404).send({message: 'Usuário não foi encontrado  '});
            }            
        } catch (error) {
            //Deu erro?
            res.status(500).send(error);
        }
    },
    getCurtidas: async (req,res) => {

        try {
            //Pega o nome do usuário a partir de seu username
            const usuario = await usuarioRepository.getByUsername( req.username );

            //Existe um usuário com este username?
            if (usuario) {

                //Pega a foto pelo seu ID
                const foto = await fotoRepository.findOne( usuario, req.params.id );

                //Existe uma foto com este ID?
                if (foto) {
                    
                    //Busca os curtidas da foto
                    const curtidas = await curtidaRepository.findByFoto(foto);
                    res.send(curtidas);

                } else {
                    res.status(404).send({message: 'Foto não foi encontrada'});
                }

            } else {
                res.status(404).send({message: 'Usuário não foi encontrado  '});
            }
        } catch (error) {
            //Deu erro?
            res.status(500).send(error);
        }
    }
}