"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Topic = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_router_dom_1 = require("react-router-dom");
const types_1 = require("../../../../router/types");
const styles = require('./styles.module.scss');
const commentSvg = require('../../../../assets/icons/comment.svg');
const Topic = ({ id, title, description, comments_count, date, owner, last_message }) => {
    return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: styles.container, id: id }, { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ className: styles.topic }, { children: [(0, jsx_runtime_1.jsx)(react_router_dom_1.Link, Object.assign({ to: `${types_1.ROUTES.FORUM}/${id}`, className: styles.topic__title }, { children: title })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: styles.topic__description }, { children: description })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: styles.info }, { children: [(0, jsx_runtime_1.jsxs)("span", Object.assign({ className: styles.info__commentsCount }, { children: [(0, jsx_runtime_1.jsx)("img", { src: commentSvg, alt: "commentsCount" }), comments_count] })), (0, jsx_runtime_1.jsx)("span", Object.assign({ className: styles.date }, { children: date })), (0, jsx_runtime_1.jsx)("span", Object.assign({ className: styles.info__text }, { children: "\u043E\u0442" })), (0, jsx_runtime_1.jsx)("span", Object.assign({ className: styles.username }, { children: owner }))] }))] })), (0, jsx_runtime_1.jsx)("div", { className: styles.topic__border }), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: styles.topic__lastMessage }, { children: [(0, jsx_runtime_1.jsx)("span", Object.assign({ className: styles.username }, { children: last_message.author })), (0, jsx_runtime_1.jsx)("span", Object.assign({ className: styles.date }, { children: last_message.date }))] }))] })));
};
exports.Topic = Topic;
