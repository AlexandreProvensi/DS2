import { createConnection } from 'typeorm';
import app from './app';

createConnection().then(connection => {
//try {
    
        app.listen(3333, () => {
                console.log('> Running on port 3333...')
            });


//} catch (error) {
//    console.log(error);
//}

}).catch(error => {
    console.log('Não foi possível conecta ao banco de dados.', error.message);
});