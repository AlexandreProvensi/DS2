import express from 'express';


class App{
    public express: express.Application;

    constructor(){
        this.express = express();
        console.log('-> Construtor')

        this.middleware();
        this.routes();

    }  

private middleware():void{
    console.log('-> Middleware')
}
    private routes():void{
        console.log('-> Middleware')
    }
}
export default new App().express;


