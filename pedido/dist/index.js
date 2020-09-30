"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
try {
    app_1.default.listen(3333, () => {
        console.log('> Running on port 3333...');
    });
}
catch (error) {
    console.log(error);
}
