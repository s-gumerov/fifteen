"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PublicRoute = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_router_dom_1 = require("react-router-dom");
const types_1 = require("./types");
const context_1 = require("../context");
const PublicRoute = () => {
    const authContext = (0, context_1.useAuth)();
    const location = (0, react_router_dom_1.useLocation)();
    return !(authContext === null || authContext === void 0 ? void 0 : authContext.isAuthorized)
        ? (0, jsx_runtime_1.jsx)(react_router_dom_1.Outlet, {})
        : (0, jsx_runtime_1.jsx)(react_router_dom_1.Navigate, { to: types_1.ROUTES.MAIN, state: { from: location }, replace: true });
};
exports.PublicRoute = PublicRoute;
