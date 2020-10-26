const conn = require('../pg-connection');

module.exports = {
    find: () => {
        return conn.query('select * from comentario where status = $1 order by id', ['S']);
    },
    findOne: (id) => {
        return conn.query('select * from comentario where id = $1 and status = $2', [id, 'S']);
    },
    create: (comentario) => {
        return conn.query('insert into comentario(foto_id, usuario_id, descricao) values($1,$2,$3) returning *', 
                [comentario.foto.id, comentario.usuario.id, comentario.descricao]);
    },
    update: (comentario) => {
        return conn.query('update comentario set foto_id = $1, usuario_id = $2, descricao = $3, status = $4 where id = $5 returning *', 
                [comentario.foto.id, comentario.usuario.id, comentario.descricao, comentario.status, comentario.id]);
    },
    delete: (id) => {
        return conn.query('delete from comentario where id = $1', [id]);
    },
    findByFoto: async (foto) => {
        const query = `select comentario.*, usuario.username
                       from comentario
                       inner join usuario on usuario.id = comentario.usuario_id
                       where comentario.status = 'S' and comentario.foto_id = $1
                       order by comentario.id desc`;

        const comentarioResult = await conn.query(query, [foto.id]);
        const comentarios = [];

        //Ajusta o objeto de retorno
        for (index in comentarioResult.rows) {
            let comentario = {
                id: comentarioResult.rows[index].id,
                dtpost: comentarioResult.rows[index].dtpost,
                descricao: comentarioResult.rows[index].descricao,
                usuario: {
                    id: comentarioResult.rows[index].usuario_id, 
                    username: comentarioResult.rows[index].username
                }
            }

            comentarios.push(comentario);
        }

        return comentarios;
    }
};