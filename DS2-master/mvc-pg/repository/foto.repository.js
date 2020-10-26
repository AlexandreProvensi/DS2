const conn = require('../pg-connection');

const queryDefault = `select foto.*,
                        (select cast(count(id) as integer) from curtida where foto_id = foto.id) as curtidas,
                        (select cast(count(id) as integer) from comentario where foto_id = foto.id and status = 'S') as comentarios
                      from foto`;

function ajustaAtributos(rows) {
    //Ajusta atributos das fotos
    for (index in rows) {
        //Cria o atributo usuário no formato de objeto (JSON)
        rows[index].usuario = {
            id: rows[index].usuario_id
        }

        //Remove os atributos desnecessários
        delete rows[index].usuario_id;
        delete rows[index].status;
    }

    return rows;
}

module.exports = {
    find: async ( usuario ) => {
        const fotoResult = await conn.query(queryDefault +' where foto.usuario_id = $1 and foto.status = $2 order by foto.id desc', [usuario.id, 'S']);
        return ajustaAtributos(fotoResult.rows);
    },
    findOne: async (usuario, foto_id) => {
        const fotoResult = await conn.query(queryDefault +' where foto.id = $1 and foto.status = $2 and foto.usuario_id = $3 order by foto.id desc', 
                                    [foto_id, 'S', usuario.id]);
        return ajustaAtributos(fotoResult.rows)[0];
    },
    create: (foto) => {
        return conn.query('insert into foto(usuario_id, descricao, caminho) values($1,$2,$3) returning *', 
                [foto.usuario.id, foto.descricao, foto.caminho]);
    },
    update: (foto) => {
        return conn.query('update foto set usuario_id = $1, descricao = $2, caminho = $3, status = $4 where id = $5 returning *', 
                [foto.usuario.id, foto.descricao, foto.caminho, foto.status, foto.id]);
    },
    delete: (id) => {
        return conn.query('delete from foto where id = $1', [id]);
    }
};