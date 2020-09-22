const { Client } = require('pg');

module.exports = new Client({
    host: 'localhost',
    database: 'ds2db',
    user: 'postgres',
    password: '123456'
});