"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logo = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_router_dom_1 = require("react-router-dom");
const const_1 = require("../../../const");
require("./styles.scss");
const Logo = (props) => {
    const buttonBack = props.backUrl
        ? (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: props.backUrl, className: "logo__button" })
        : (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: "#", className: "logo__button logo__button_hidden" });
    return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "logo" }, { children: [(0, jsx_runtime_1.jsx)("span", Object.assign({ className: "logo__title" }, { children: const_1.appTitle })), buttonBack] })));
};
exports.Logo = Logo;
