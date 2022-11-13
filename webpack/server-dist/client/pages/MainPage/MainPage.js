"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainPage = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_router_dom_1 = require("react-router-dom");
const types_1 = require("../../router/types");
const context_1 = require("../../context");
const userSlice_1 = require("../../store/user/userSlice");
const useAppDispatch_1 = require("../../hooks/useAppDispatch");
require("./styles.scss");
const MainPage = () => {
    const authContext = (0, context_1.useAuth)();
    const dispatch = (0, useAppDispatch_1.useAppDispatch)();
    const handleLogout = (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        yield dispatch((0, userSlice_1.logoutByThunk)());
        authContext === null || authContext === void 0 ? void 0 : authContext.setAuthorization(false);
    });
    return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "menu" }, { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "menu__lines" }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: "menu__line" }, { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, Object.assign({ to: types_1.ROUTES.PROFILE, className: "menu__line-link" }, { children: "\u041C\u041E\u0419 \u041F\u0420\u041E\u0424\u0418\u041B\u042C" })) })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "menu__line" }, { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, Object.assign({ to: types_1.ROUTES.GAME_FIELD, className: "menu__line-link" }, { children: "\u0421\u0422\u0410\u0420\u0422" })) })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "menu__line" }, { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, Object.assign({ to: types_1.ROUTES.RULES, className: "menu__line-link" }, { children: "\u041F\u0420\u0410\u0412\u0418\u041B\u0410" })) })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "menu__line" }, { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, Object.assign({ to: types_1.ROUTES.LEADERS, className: "menu__line-link" }, { children: "\u041B\u0418\u0414\u0415\u0420\u042B" })) }))] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "menu__circle" }, { children: [(0, jsx_runtime_1.jsx)("div", { className: "menu__circle-line" }), (0, jsx_runtime_1.jsx)("div", { className: "menu__circle-line" }), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "menu__circle-line" }, { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, Object.assign({ to: "#", onClick: handleLogout, className: "menu__circle-link-user" }, { children: "\u0412\u042B\u0419\u0422\u0418" })) })), (0, jsx_runtime_1.jsx)("div", { className: "menu__circle-line" }), (0, jsx_runtime_1.jsx)("div", { className: "menu__circle-line" }), (0, jsx_runtime_1.jsx)("div", { className: "menu__circle-line" }), (0, jsx_runtime_1.jsx)("div", { className: "menu__circle-line" }), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "menu__circle-line" }, { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, Object.assign({ to: types_1.ROUTES.FORUM, className: "menu__circle-link" }, { children: "\u0424\u041E\u0420\u0423\u041C" })) })), (0, jsx_runtime_1.jsx)("div", { className: "menu__circle-line" })] }))] })));
};
exports.MainPage = MainPage;
