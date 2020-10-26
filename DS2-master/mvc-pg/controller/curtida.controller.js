const curtidaRepository = require('../repository/curtida.repository');

module.exports = {
    find: (req,res)=> {
        curtidaRepository.find()
            .then((result) => {
                res.send(result.rows);
            })
            .catch((error) => {
                res.status(500).send({ msg: error.message });
            });
    },
    findOne: (req,res)=> {
        const id = req.params.id;

        curtidaRepository.findOne( id )
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
        const curtida = req.body;

        curtidaRepository.create( curtida )
            .then((result) => {
                res.status(201).send(result.rows[0]);
            })
            .catch((error) => {
                res.status(500).send({ msg: error.message });
            });        
    },
    update: (req,res)=> {
        //Pega o conteúdo do corpo da requisição
        const curtida = req.body;

        //Atribui o ID do item baseado no parametro da URL
        curtida.id = req.params.id;

        curtidaRepository.update( curtida )
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

        curtidaRepository.delete( id )
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