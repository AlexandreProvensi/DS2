const conn = require('../pg-connection');

//Consulta padrão, utilizada em todas os SELECT
const queryDefault = `select usuario.id, usuario.username from seguido
                      inner join usuario on usuario.id = seguido.seguido_id`;

module.exports = {
    find: async (usuario) => {
        const seguidoResult = await conn.query(queryDefault +' where seguido.usuario_id = $1 order by seguido.id',
                                        [usuario.id]);
        return seguidoResult.rows;
    },
    create: async (seguido) => {
        const seguidoResult = await conn.query('insert into seguido(usuario_id, seguido_id) values($1,$2) returning *', 
                                [seguido.usuario.id, seguido.seguido.id]);
        return seguidoResult.rows[0];
    }
};