const conn = require('../pg-connection');

module.exports = {
    find: () => {
        return conn.query('select * from curtida order by id');
    },
    findOne: (id) => {
        return conn.query('select * from curtida where id = $1', [id]);
    },
    create: (curtida) => {
        return conn.query('insert into curtida(foto_id, usuario_id) values($1,$2) returning *', [curtida.foto.id, curtida.usuario.id]);
    },
    update: (curtida) => {
        return conn.query('update curtida set foto_id = $1, usuario_id = $2 where id = $3 returning *', [curtida.foto.id, curtida.usuario.id, curtida.id]);
    },
    delete: (id) => {
        return conn.query('delete from curtida where id = $1', [id]);
    },
    findByFoto: (foto) => {
        return conn.query('select * from curtida where foto_id = $1 order by id desc', [foto.id]);
    }
};