const usuarioRepository = require('../repository/usuario.repository');

module.exports = {

    find: async (req, res) => {
        try {
            //Pega o nome do usuário a partir de seu username
            const usuario = await usuarioRepository.getByUsername( req.username );

            //Existe um usuário com este username?
            if (usuario) {
                res.send(usuario);
            } else {
                res.status(404).send({message: 'Não existe nenhum usuário com este nome de perfil'});
            }
        } catch (error) {
            res.statu(500).send({message: error.message });
        }
    }
}