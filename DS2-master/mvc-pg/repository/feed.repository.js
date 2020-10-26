const conn = require('../pg-connection');

const seguindoRepository = require('./seguido.repository')

const queryDefault = `select foto.*, usuario.username,
                        (select cast(count(id) as integer) from curtida where foto_id = foto.id) as curtidas,
                        (select cast(count(id) as integer) from comentario where foto_id = foto.id and status = 'S') as comentarios
                      from foto
                      inner join usuario on usuario.id = foto.usuario_id`;

function ajustaAtributos(rows) {
    //Ajusta atributos das fotos
    for (index in rows) {
        //Cria o atributo usuário no formato de objeto (JSON)
        rows[index].usuario = {
            id: rows[index].usuario_id,
            username:  rows[index].username
        }

        //Ajusta caminho da foto
        rows[index].caminho = 'http://localhost:3000'+ rows[index].caminho;

        //Remove os atributos desnecessários
        delete rows[index].usuario_id;
        delete rows[index].username;
        delete rows[index].status;
    }

    return rows;
}

module.exports = {
    find: async ( usuario ) => {
        const seguindo = await seguindoRepository.find(usuario);

        var whereIn = usuario.id+'';

        for (seguido of seguindo) {
            whereIn += ','+ seguido.id
        }

        const feedResult = await conn.query(queryDefault +' where foto.usuario_id in ('+ whereIn +') and foto.status = $1 order by foto.id desc', ['S']);
        return ajustaAtributos(feedResult.rows);        
    }
};