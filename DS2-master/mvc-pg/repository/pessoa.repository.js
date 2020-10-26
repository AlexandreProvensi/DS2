const conn = require('../pg-connection')

//Consulta padrão, utilizada em todas os SELECT
const pessoaQuery = `select pessoa.*, cidade.nome as cidade_nome, cidade.uf as cidade_uf, usuario.username
                     from pessoa 
                     left join cidade on cidade.id = pessoa.cidade_id 
                     inner join usuario on usuario.id = pessoa.usuario_id`;

//Função para ajustar os atributos das pessoas
function ajustaAtributos(rows) {
    //Ajusta atributos das fotos
    for (index in rows) {
        //Cria o atributo usuário no formato de objeto (JSON)
        rows[index].usuario = {
            id: rows[index].usuario_id,
            username: rows[index].username
        }

        //Cria o atributo cidade no formato de objeto (JSON)
        rows[index].cidade = {
            id: rows[index].cidade_id,
            nome: rows[index].cidade_nome,
            uf: rows[index].cidade_uf
        }

        //Remove os atributos desnecessários
        delete rows[index].usuario_id;
        delete rows[index].username;
        delete rows[index].cidade_id;
        delete rows[index].cidade_nome;
        delete rows[index].cidade_uf;
        delete rows[index].status;
    }

    return rows;
}
//Camada de Modelo
module.exports = {

    find: async () => {
        const pessoaResult = await conn.query(pessoaQuery +' order by pessoa.id');
        return ajustaAtributos(pessoaResult.rows);
    },

    findOne: async ( id ) => {
        const pessoaResult = await conn.query(pessoaQuery +' where pessoa.id = $1', [ id ]);
        return ajustaAtributos(pessoaResult.rows)[0];
    },

    create: async ( pessoa ) => {
        const pessoaResult = await conn.query('insert into pessoa(nome, email, fone, endereco, cidade_id, usuario_id) values ($1,$2,$3,$4,$5,$6) returning *', 
                                        [pessoa.nome, pessoa.email, pessoa.fone, pessoa.endereco, pessoa.cidade.id, pessoa.usuario.id]);
        
        return ajustaAtributos(pessoaResult.rows)[0];                                     
    },

    update: async ( pessoa ) => {
        const pessoaResult = await conn.query('update pessoa set nome = $1, email = $2, fone = $3, endereco = $4, status = $5, cidade_id = $6, usuario_id = $7 where id = $8 returning *', 
                                        [pessoa.nome, pessoa.email, pessoa.fone, pessoa.endereco, pessoa.status, pessoa.cidade.id, pessoa.usuario.id, pessoa.id]);
        
        return ajustaAtributos(pessoaResult.rows)[0];
    },

    delete: async ( id ) => {
        const pessoaResult = await conn.query('delete from pessoa where id = $1', [ id ]);
        return pessoaResult.rowCount > 0;
    }
}