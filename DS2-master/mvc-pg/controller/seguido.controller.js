const usuarioRepository = require('../repository/usuario.repository');
const seguidoRepository = require('../repository/seguido.repository');

module.exports = {
    find: async (req,res)=> {
        
        //Pega o nome do usuário a partir de seu username
        const usuario = await usuarioRepository.getByUsername( req.username );

        //Existe um usuário com este username?
        if (usuario) {
            
            try {

                //Tenta pegar as usuário que estou seguindo
                const seguidos = await seguidoRepository.find( usuario );
                res.send(seguidos);

            } catch (error) {
                res.status(500).send(error);
            }

        } else {
            res.status(404).send({message: 'Usuário não foi encontrado'});
        }
    },
    create: async (req,res)=> {
        //Pega o nome do usuário a partir de seu username
        const usuario = await usuarioRepository.getByUsername( req.username );

        //Existe um usuário com este username?
        if (usuario) {
            
            try {
                //Monta um objeto "seguido" para ser gravado no banco
                const seguido = {
                    seguido: req.body,
                    usuario: usuario
                }                

                //Tenta pegar as usuário que estou seguindo
                const seguidos = await seguidoRepository.create( seguido );
                res.send(seguidos);

            } catch (error) {
                res.status(500).send(error);
            }

        } else {
            res.status(404).send({message: 'Usuário não foi encontrado'});
        }    
    }
}