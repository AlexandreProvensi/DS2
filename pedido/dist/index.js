"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const app_1 = __importDefault(require("./app"));
typeorm_1.createConnection().then(connection => {
    //try {
    app_1.default.listen(3333, () => {
        console.log('> Running on port 3333...');
    });
    //} catch (error) {
    //    console.log(error);
    //}
}).catch(error => {
    console.log('Não foi possível conecta ao banco de dados.', error.message);
});
//# sourceMappingURL=index.js.map