const conn = require('../pg-connection');

module.exports = {
    find: () => {
        return conn.query('select * from comentario where status = $1 order by id', ['S']);
    },
    findOne: (id) => {
        return conn.query('select * from comentario where id = $1 and status = $2', [id, 'S']);
    },
    create: (comentario) => {
        return conn.query('insert into comentario(foto_id, usuario_id, descricao) values($1,$2,$3) returning *', [comentario.foto.id, comentario.usuario.id, comentario.descricao]);
    },
    update: (comentario) => {
        return conn.query('update comentario set foto_id = $1, usuario_id = $2, descricao = $3 where id = $4 returning *', [comentario.foto.id, comentario.usuario.id, comentario.descricao, comentario.id]);
    },
    delete: (id) => {
        return conn.query('delete from comentario where id = $1', [id]);
    },
    disabled: (comentario) => {
        return conn.query('update comentario set status = $1 where id = $2 returning *', ['N', comentario.id]);
    },
    findByFoto: (foto) => {
        return conn.query('select * from comentario where foto_id = $1 and status = $2 order by id desc', [foto.id, 'S']);
    }
};