import app from './app';

try {

    app.listen(3333, ()=>{
        console.log('> Running on port 3333...')
    });

} catch (error) {
    console.log(error);
}