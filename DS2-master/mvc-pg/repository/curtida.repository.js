const conn = require('../pg-connection');

module.exports = {
    find: () => {
        return conn.query('select * from curtida order by id');
    },
    findOne: (id) => {
        return conn.query('select * from curtida where id = $1', [id]);
    },
    create: (curtida) => {
        return conn.query('insert into curtida(foto_id, usuario_id) values($1,$2) returning *', 
                [curtida.foto.id, curtida.usuario.id]);
    },
    update: (curtida) => {
        return conn.query('update curtida set foto_id = $1, usuario_id = $2 where id = $3 returning *', 
                [curtida.foto.id, curtida.usuario.id, curtida.id]);
    },
    delete: (id) => {
        return conn.query('delete from curtida where id = $1', [id]);
    },
    findByFoto: async (foto) => {
        const query = `select curtida.id, usuario.id as usuario_id, usuario.username 
                       from curtida
                       inner join usuario on usuario.id = curtida.usuario_id
                       where curtida.foto_id = $1
                       order by curtida.id`;

        const curtidaResult = await conn.query(query, [foto.id]);
        
        const curtidas = [];

        //Ajusta o objeto de retorno
        for (index in curtidaResult.rows) {
            let curtida = {
                id: curtidaResult.rows[index].id,
                usuario: {
                    id: curtidaResult.rows[index].usuario_id, 
                    username: curtidaResult.rows[index].username
                }
            }

            curtidas.push(curtida);
        }

        return curtidas;
    }
};