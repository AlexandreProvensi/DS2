const conn = require('../pg-connection');

module.exports = {
    create: (username, password) => {
        return conn.query('insert into usuario (username, password) values ($1,$2) returning id', [username, password]);
    },
    signin: async(username, password) => {

        //Primeiro eu valido o usuário
        const userResult = await conn.query('select id from usuario where username = $1', [username]);

        if (userResult.rowCount > 0) {
            //Usuário é válido e agora precisa validar a senha
            let sql = 'select pessoa.id, usuario.username, pessoa.nome, pessoa.email from usuario ' +
                'inner join pessoa on pessoa.usuario_id = usuario.id ' +
                'where username = $1 and password = $2';

            //Se o usuário for válido, verifico a senha
            const passResult = await conn.query(sql, [username, password]);

            if (passResult.rowCount > 0) {
                //Usuário e senha são válidos
                return new Promise((resolve, reject) => {
                    resolve(passResult);
                });
            } else {
                //A senha informada é inválida
                return new Promise((resolve, reject) => {
                    reject({ failtype: 'auth-fail-password', message: 'A senha informada é inválida' });
                });
            }

        } else {
            //Usuário não encontrado, rejeitar o acesso
            return new Promise((resolve, reject) => {
                reject({ failtype: 'auth-fail-username', message: 'O usuário não foi encontrado' });
            });
        }



    },
    usernameExists: (username) => {
        return conn.query('select username from usuario where username = $1', [username]);
    }
}