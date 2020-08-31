const conn = require('../pg-connection');

module.exports = {
    find: () => {
        return conn.query('select * from foto where status = $1 order by id', ['S']);
    },
    findOne: (id) => {
        return conn.query('select * from foto where id = $1 and status = $2', [id, 'S']);
    },
    create: (foto) => {
        return conn.query('insert into foto(usuario_id, descricao, caminho) values($1,$2,$3) returning *', [foto.usuario.id, foto.descrico, foto.caminho]);
    },
    update: (foto) => {
        return conn.query('update foto set usuario_id = $1, descricao = $2, caminho = $3 where id = $4 returning *', [foto.usuario.id, foto.descrico, foto.caminho, foto.id]);
    },
    delete: (id) => {
        return conn.query('delete from foto where id = $1', [id]);
    },
    disabled: (id) => {
        return conn.query('update foto set status = $1 where id = $2 returning *', ['N', id]);
    },
    findByUsuario: (usuario) => {
        return conn.query('select * from foto where usuario_id = $1 and status = $2 order by id desc', [usuario.id, 'S']);
    }
};