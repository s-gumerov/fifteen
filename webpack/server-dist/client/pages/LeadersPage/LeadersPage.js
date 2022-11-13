"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeadersPage = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const material_1 = require("@mui/material");
require("./styles.scss");
const Leaders_1 = require("../../context/Leaders");
const useAppDispatch_1 = require("../../hooks/useAppDispatch");
const LeadersPage = () => {
    const [page, setPage] = (0, react_1.useState)(1);
    const [rowsPerPage] = (0, react_1.useState)(5);
    const leadersContext = (0, Leaders_1.useLeaders)();
    const { user } = (0, useAppDispatch_1.useAppSelector)(state => state.user);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "leaders" }, { children: [(0, jsx_runtime_1.jsx)("h1", Object.assign({ className: "leaders__title title" }, { children: "\u041B\u0438\u0434\u0435\u0440\u044B" })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "leaders__table" }, { children: (0, jsx_runtime_1.jsx)(material_1.TableContainer, { children: (0, jsx_runtime_1.jsxs)(material_1.Table, Object.assign({ sx: { minWidth: 650 } }, { children: [(0, jsx_runtime_1.jsx)(material_1.TableHead, { children: (0, jsx_runtime_1.jsxs)(material_1.TableRow, { children: [(0, jsx_runtime_1.jsx)(material_1.TableCell, Object.assign({ align: "center", component: "th" }, { children: "\u041F\u043E\u0437\u0438\u0446\u0438\u044F" })), (0, jsx_runtime_1.jsx)(material_1.TableCell, Object.assign({ align: "center", component: "th" }, { children: "\u0418\u0433\u0440\u043E\u043A" })), (0, jsx_runtime_1.jsx)(material_1.TableCell, Object.assign({ align: "center", component: "th" }, { children: "\u0425\u043E\u0434\u044B" })), (0, jsx_runtime_1.jsx)(material_1.TableCell, Object.assign({ align: "center", component: "th" }, { children: "\u0412\u0440\u0435\u043C\u044F" }))] }) }), (0, jsx_runtime_1.jsx)(material_1.TableBody, { children: leadersContext.leaders &&
                                    leadersContext.leaders
                                        .slice((page - 1) * rowsPerPage, (page - 1) * rowsPerPage + rowsPerPage)
                                        .map((usr, index) => {
                                        return ((0, jsx_runtime_1.jsxs)(material_1.TableRow, Object.assign({ className: usr.data.id === user.id ? "userCell" : "" }, { children: [(0, jsx_runtime_1.jsx)(material_1.TableCell, Object.assign({ sx: { width: 70 }, component: "td", scope: "row", align: "center" }, { children: leadersContext.leaders &&
                                                        leadersContext.leaders.indexOf(usr) + 1 })), (0, jsx_runtime_1.jsx)(material_1.TableCell, Object.assign({ sx: { width: 300 }, component: "td", scope: "row", align: "center" }, { children: usr.data.nickname })), (0, jsx_runtime_1.jsx)(material_1.TableCell, Object.assign({ component: "td", scope: "row", align: "center" }, { children: usr.data.moves })), (0, jsx_runtime_1.jsx)(material_1.TableCell, Object.assign({ component: "td", scope: "row", align: "center" }, { children: usr.data.time }))] }), index));
                                    }) })] })) }) })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "leaders__footer" }, { children: (0, jsx_runtime_1.jsx)(material_1.Pagination, { variant: "outlined", shape: "rounded", color: "primary", count: leadersContext.leaders ? Math.ceil(leadersContext.leaders.length / rowsPerPage) : undefined, page: page, onChange: handleChangePage }) }))] })));
};
exports.LeadersPage = LeadersPage;
