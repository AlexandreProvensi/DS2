"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cidade_route_1 = __importDefault(require("./router/cidade.route"));
const cliente_route_1 = __importDefault(require("./router/cliente.route"));
const pedido_route_1 = __importDefault(require("./router/pedido.route"));
const produto_route_1 = __importDefault(require("./router/produto.route"));
const tabelapreco_route_1 = __importDefault(require("./router/tabelapreco.route"));
class App {
    constructor() {
        this.express = express_1.default();
        this.middleware();
        this.routes();
    }
    middleware() {
        this.express.use(express_1.default.json());
        this.express.use(cors_1.default());
    }
    routes() {
        this.express.use('/cidades', cidade_route_1.default);
        this.express.use('/clientes', cliente_route_1.default);
        this.express.use('/pedidos', pedido_route_1.default);
        this.express.use('/produtos', produto_route_1.default);
        this.express.use('/tabelasprecos', tabelapreco_route_1.default);
    }
}
exports.App = App;
exports.default = new App().express;
//# sourceMappingURL=app.js.map