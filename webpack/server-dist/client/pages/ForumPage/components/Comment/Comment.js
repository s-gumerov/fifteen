"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comment = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const Avatar_1 = __importDefault(require("@mui/material/Avatar"));
const styles = require('./styles.module.scss');
const Comment = ({ id, username, avatar, date, message }) => {
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("div", { className: styles.comment__line }), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: styles.comment, id: id }, { children: [(0, jsx_runtime_1.jsx)(Avatar_1.default, { alt: username, src: avatar, variant: "square", sx: { width: 75, height: 75 } }), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: styles.box }, { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ className: styles.box__title }, { children: [(0, jsx_runtime_1.jsx)("span", Object.assign({ className: styles.username }, { children: username })), (0, jsx_runtime_1.jsx)("span", Object.assign({ className: styles.date }, { children: date }))] })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: styles.box__message }, { children: message }))] }))] }))] }));
};
exports.Comment = Comment;
