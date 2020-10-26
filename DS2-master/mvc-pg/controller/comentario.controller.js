const comentarioRepository = require('../repository/comentario.repository');

module.exports = {
    find: (req,res)=> {
        comentarioRepository.find()
            .then((result) => {
                res.send(result.rows);
            })
            .catch((error) => {
                res.status(500).send({ msg: error.message });
            });
    },
    findOne: (req,res)=> {
        const id = req.params.id;

        comentarioRepository.findOne( id )
            .then((result) => {

                if (result.rows.length > 0){
                    res.send(result.rows[0]);
                } else {
                    res.status(404).send({ msg: 'Registro não encontrado' });
                }
                
            })
            .catch((error) => {
                res.status(500).send({ msg: error.message });
            });        
    },
    create: (req,res)=> {
        const comentario = req.body;

        comentarioRepository.create( comentario )
            .then((result) => {
                res.status(201).send(result.rows[0]);
            })
            .catch((error) => {
                res.status(500).send({ msg: error.message });
            });        
    },
    update: (req,res)=> {
        //Pega o conteúdo do corpo da requisição
        const comentario = req.body;

        //Atribui o ID do item baseado no parametro da URL
        comentario.id = req.params.id;

        comentarioRepository.update( comentario )
            .then((result) => {

                if (result.rows.length > 0){
                    res.send(result.rows[0]);
                } else {
                    res.status(404).send({ msg: 'Registro não encontrado' });
                }
                
            })
            .catch((error) => {
                res.status(500).send({ msg: error.message });
            });        
    },
    delete: (req,res)=> {

        //Pega o ID a ser excluído através da URL
        var id = req.params.id;

        comentarioRepository.delete( id )
            .then((result) => {

                if (result.rowCount > 0){
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