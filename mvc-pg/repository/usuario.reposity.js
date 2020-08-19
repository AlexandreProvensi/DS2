const conn = require('../pg-connection');

module.exports = {
    create: (username, password) => {
        return conn.query('insert into usuario (username, password) values ($1,$2) returning id', [username, password]);
    },
    signin: (username, password) => {
        let sql = 'select pessoa.id, usuario.username, pessoa.nome, pessoa.email from usuario ' +
            'inner join pessoa on pessoa.usuario_id = usuario.id ' +
            'where username = $1 and password = $2';

        return conn.query(sql, [username, password]);
    },
    usernameExists: (username) => {
        return conn.query('select username from usuario where username = $1', [username]);
    }
}