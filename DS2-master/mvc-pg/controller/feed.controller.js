const usuarioRepository = require('../repository/usuario.repository');
const feedRepository = require('../repository/feed.repository');

module.exports = {
    find: async (req,res)=> {
        
        //Pega o nome do usuário a partir de seu username
        const usuario = await usuarioRepository.getByUsername( req.username );

        //Existe um usuário com este username?
        if (usuario) {
            
            try {

                //Tenta pegar as usuário que estou seguindo
                const feeds = await feedRepository.find( usuario );
                res.send(feeds);

            } catch (error) {
                res.status(500).send(error);
            }

        } else {
            res.status(404).send({message: 'Usuário não foi encontrado'});
        }
    }
}