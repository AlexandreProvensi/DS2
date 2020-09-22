const conn = require('../pg-connection');

//Consulta padrão, utilizada em todas os SELECT
const queryDefault = 'select * from tabelapreco';

module.exports = {
    find: async () => {
        const tabelaprecoResult = await conn.query(queryDefault +' order by id');
        return tabelaprecoResult.rows;
    },
    findOne: async (id) => {
        const tabelaprecoResult = await conn.query(queryDefault +' where id = $1', [id]);
        return tabelaprecoResult.rows[0];
    },
    create: async (tabelapreco) => {
        const tabelaprecoResult = await conn.query('insert into tabelapreco(nome, fator) values($1,$2) returning *', 
                                [tabelapreco.nome, tabelapreco.fator]);
        return tabelaprecoResult.rows[0];
    },
    update: async (tabelapreco) => {
        const tabelaprecoResult = await conn.query('update tabelapreco set nome = $1, fator = $2 where id = $3 returning *', 
                [tabelapreco.nome, tabelapreco.fator, tabelapreco.id]);
        return tabelaprecoResult.rows[0];
    },
    delete: async (id) => {
        const tabelaprecoResult = await conn.query('delete from tabelapreco where id = $1', [id]);
        return tabelaprecoResult.rowCount > 0;
    }
};