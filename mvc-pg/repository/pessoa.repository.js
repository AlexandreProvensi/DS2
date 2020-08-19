const conn = require('../pg-connection')

const pessoaQuery = 'select pessoa.*, cidade.nome as cidade_nome, cidade.uf as cidade_uf, usuario.username ' +
    'from pessoa ' +
    'left join cidade on cidade.id = pessoa.cidade_id ' +
    'inner join usuario on usuario.id = pessoa.usuario_id';

//Camada de Modelo
module.exports = {

    find: () => {
        return conn.query(pessoaQuery + ' order by pessoa.id');
    },

    findOne: (id) => {
        return conn.query(pessoaQuery + ' where pessoa.id = $1', [id]);
    },

    create: (pessoa) => {
        return conn.query('insert into pessoa(nome, email, fone, endereco, cidade_id, usuario_id) values ($1,$2,$3,$4,$5,$6) returning *', [pessoa.nome, pessoa.email, pessoa.fone, pessoa.endereco, pessoa.cidade.id, pessoa.usuario.id]);
    },

    update: (pessoa) => {
        return conn.query('update pessoa set nome = $1, email = $2, fone = $3, endereco = $4, status = $5, cidade_id = $6, usuario_id = $7 where id = $8 returning *', [pessoa.nome, pessoa.email, pessoa.fone, pessoa.endereco, pessoa.status, pessoa.cidade.id, pessoa.usuario.id, pessoa.id]);
    },

    delete: (id) => {
        return conn.query('delete from pessoa where id = $1', [id]);
    }
}