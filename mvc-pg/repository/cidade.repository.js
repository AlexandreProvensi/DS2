const conn = require('../pg-connection');

module.exports = {
    find: () => {
        return conn.query('select * from cidade order by id');
    },
    findOne: (id) => {
        return conn.query('select * from cidade where id = $1', [id]);
    },
    create: (cidade) => {
        return conn.query('insert into cidade(nome, uf) values($1,$2) returning *', [cidade.nome, cidade.uf]);
    },
    update: (cidade) => {
        return conn.query('update cidade set nome = $1, uf = $2 where id = $3 returning *', [cidade.nome, cidade.uf, cidade.id]);
    },
    delete: (id) => {
        return conn.query('delete from cidade where id = $1', [id]);
    }
};