"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainLayout = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const ui_1 = require("../../components/ui");
require("./styles.scss");
const MainLayout = (props) => ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "content-wrap" }, { children: [(0, jsx_runtime_1.jsx)(ui_1.Logo, { backUrl: props.backUrl }), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "content-center" }, { children: props.children })), (0, jsx_runtime_1.jsx)(ui_1.Triangles, {})] })));
exports.MainLayout = MainLayout;
