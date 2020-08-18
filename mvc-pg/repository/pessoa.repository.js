const conn = require('../pg-connection')

//Camada de Modelo
module.exports = {

    find: () => {
        return conn.query('select * from pessoa order by id');
    },

    findOne: (id) => {
        return conn.query('select * from pessoa where id = $1', [id]);
    },

    create: (pessoa) => {
        return conn.query('insert into pessoa(nome, email, fone, endereco) values ($1,$2,$3,$4) returning *', [pessoa.nome, pessoa.email, pessoa.fone, pessoa.endereco]);
    },

    update: (pessoa) => {
        return conn.query('update pessoa set nome = $1, email = $2, fone = $3, endereco = $4, status = $5 where id = $6 returning *', [pessoa.nome, pessoa.email, pessoa.fone, pessoa.endereco, pessoa.status, pessoa.id]);
    },

    delete: (id) => {
        return conn.query('delete from pessoa where id = $1', [id]);
    }
}