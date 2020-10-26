const conn = require('../pg-connection');

const queryDefault = `select usuario.id, usuario.username, pessoa.nome, pessoa.email from usuario
                      inner join pessoa on pessoa.usuario_id = usuario.id`;


module.exports = {
    create: async (username, password) => {
        const usuarioResult = await conn.query('insert into usuario (username, password) values ($1,$2) returning id, username',
                                        [username, password]);
        return usuarioResult.rows[0];
    },
    signin: async (username, password) => {
        
        //Primeiro eu valido o usuário
        const userResult = await conn.query('select id from usuario where username = $1' ,[username]);

        if (userResult.rowCount > 0) {
            //Usuário é válido e agora precisa validar a senha
            let sql = queryDefault +' where username = $1 and password = $2';
            
            //Se o usuário for válido, verifico a senha
            const passResult = await conn.query(sql ,[username, password]);

            if (passResult.rowCount > 0) {
                //Usuário e senha são válidos
                return new Promise((resolve, reject) => {
                    resolve(passResult);
                });
            } else {
                //A senha informada é inválida
                return new Promise((resolve, reject) => {
                    reject({failtype: 'auth-fail-password', message: 'A senha informada é inválida'});
                });
            }

        } else  {
            //Usuário não encontrado, rejeitar o acesso
            return new Promise((resolve, reject) => {
                reject({failtype: 'auth-fail-username', message: 'O usuário não foi encontrado'});
            });
        }
    },
    getByUsername: async (username) => {
        const userResult = await conn.query(queryDefault +' where username = $1' ,[username]);

        //Se não encontrar um usuário com o username, retorna FALSE
        if (userResult.rowCount == 0) {
            return false;
        }
        
        return {
            id: userResult.rows[0].id,
            nome: userResult.rows[0].nome,
            email: userResult.rows[0].email,
            username: userResult.rows[0].username
        }
    }
}
