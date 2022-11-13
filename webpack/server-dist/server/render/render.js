"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.render = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const server_1 = require("react-router-dom/server");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const server_2 = __importDefault(require("react-dom/server"));
const App_1 = __importDefault(require("../../client/App"));
function render(req, res) {
    const reactHtml = server_2.default.renderToString((0, jsx_runtime_1.jsx)(server_1.StaticRouter, Object.assign({ location: req.url }, { children: (0, jsx_runtime_1.jsx)(App_1.default, {}) })));
    const html = fs_1.default.readFileSync(path_1.default.join(__dirname, '..', '..', '..', 'src', 'assets', 'index.html'), {
        encoding: 'utf8',
    });
    const response = html.replace('<div id="root"></div>', `<div id="root">${reactHtml}</div>
          <script src="./client.bundle.js"></script>`);
    res.status(200).send(response);
}
exports.render = render;
