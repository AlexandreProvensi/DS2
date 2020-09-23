const conn = require('../pg-connection');

//Consulta padrão, utilizada em todas os SELECT
const queryDefault = 'select * from cliente';

//Função para ajustar os atributos dos clientes
function ajustaAtributos(rows) {
    //Ajusta atributos das fotos
    for (index in rows) {

    }
    //d
    return rows;
}
//Camada de Modelo
module.exports = {

    find: async() => {
        const clienteResult = await conn.query(queryDefault + ' order by id');
        return clienteResult.rows;
    },
    findOne: async(id) => {
        const clienteResult = await conn.query(queryDefault + ' where id = $1', [id]);
        return clienteResult.rows[0];
    },
    //Câmbio
    create: async(cliente) => {
        const clienteResult = await conn.query('insert into cliente(codigo, nome, email, cidade_id, tabelapreco_id) values($1,$2,$3,$4,$5) returning *', [cliente.codigo, cliente.nome, cliente.email, cliente.cidade.id, cliente.tabelapreco.id]);
        return clienteResult.rows[0];
    },
    update: async(cliente) => {
        const clienteResult = await conn.query('update cliente set codigo = $1, nome = $2, email = $3, cidade_id = $4, tabelapreco_id = $5 where id = $3 returning *', [cliente.codigo, cliente.nome, cliente.email, cliente.cidade.id, cliente.tabelopreco.id]);
        return clienteResult.rows[0];
    },
    delete: async(id) => {
        const clienteResult = await conn.query('delete from cliente where id = $1', [id]);
        return clienteResult.rowCount > 0;
    }

}