import { createConnection } from 'typeorm';
import app from './app';


createConnection().then(connection => {
    //Criar um server e um socket]

        app.listen(3333, () => {
        console.log('> Running on port 3333...')
        });

}).catch(error => {
    console.log('Não foi possível conecta ao banco de dados.', error.message);
});