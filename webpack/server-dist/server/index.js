"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const render_1 = require("./render/render");
const path_1 = __importDefault(require("path"));
const PORT = process.env.PORT || 3001;
const app = (0, express_1.default)();
app.use(express_1.default.static(path_1.default.join(__dirname, '..', '..', 'dist')));
app.use(render_1.render);
app.listen(PORT, () => {
    console.log('Server is running on port ', PORT);
});
