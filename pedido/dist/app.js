"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
class App {
    constructor() {
        this.express = express_1.default();
        console.log('-> Construtor');
        this.middleware();
        this.routes();
    }
    middleware() {
        console.log('-> Middleware');
    }
    routes() {
        console.log('-> Middleware');
    }
}
exports.default = new App().express;
