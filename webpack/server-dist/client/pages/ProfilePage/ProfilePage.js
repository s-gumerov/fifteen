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
exports.ProfilePage = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_router_dom_1 = require("react-router-dom");
const context_1 = require("../../context");
const ui_1 = require("../../components/ui");
const material_1 = require("@mui/material");
const types_1 = require("../../router/types");
const formik_1 = require("formik");
const userSlice_1 = require("../../store/user/userSlice");
const useAppDispatch_1 = require("../../hooks/useAppDispatch");
require("./styles.scss");
const validation_schema_1 = require("../EditProfilePage/validation-schema");
const ProfilePage = () => {
    const authContext = (0, context_1.useAuth)();
    const dispatch = (0, useAppDispatch_1.useAppDispatch)();
    const { user } = (0, useAppDispatch_1.useAppSelector)(state => state.user);
    const handleLogout = (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        yield dispatch((0, userSlice_1.logoutByThunk)());
        authContext === null || authContext === void 0 ? void 0 : authContext.setAuthorization(false);
    });
    return ((0, jsx_runtime_1.jsx)("div", Object.assign({ className: "profile" }, { children: (0, jsx_runtime_1.jsx)(formik_1.Formik, Object.assign({ enableReinitialize: true, initialValues: user !== null && user !== void 0 ? user : validation_schema_1.INITIAL_FORM_STATE, onSubmit: () => {
                console.log(`this console.log of the name of Formik's onSubmit is required option`);
            } }, { children: (0, jsx_runtime_1.jsxs)(formik_1.Form, { children: [(0, jsx_runtime_1.jsx)(material_1.Avatar, { alt: "\u0410\u0432\u0430\u0442\u0430\u0440", src: (user === null || user === void 0 ? void 0 : user.avatar) || "https://mui.com/static/images/avatar/1.jpg", sx: { width: 120, height: 120, mx: "auto", mb: 2 } }), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "profile__form" }, { children: [(0, jsx_runtime_1.jsx)(ui_1.TextFieldProfile, { fullWidth: true, name: "email", type: "text", label: "\u041F\u043E\u0447\u0442\u0430", readOnly: true }), (0, jsx_runtime_1.jsx)(ui_1.TextFieldProfile, { fullWidth: true, name: "login", type: "text", label: "\u041B\u043E\u0433\u0438\u043D", readOnly: true }), (0, jsx_runtime_1.jsx)(ui_1.TextFieldProfile, { fullWidth: true, name: "first_name", type: "text", label: "\u0418\u043C\u044F", readOnly: true }), (0, jsx_runtime_1.jsx)(ui_1.TextFieldProfile, { fullWidth: true, name: "second_name", type: "text", label: "\u0424\u0430\u043C\u0438\u043B\u0438\u044F", readOnly: true }), (0, jsx_runtime_1.jsx)(ui_1.TextFieldProfile, { fullWidth: true, name: "display_name", type: "text", label: "\u041E\u0442\u043E\u0431\u0440\u0430\u0436\u0430\u0435\u043C\u043E\u0435 \u0438\u043C\u044F", readOnly: true }), (0, jsx_runtime_1.jsx)(ui_1.TextFieldProfile, { fullWidth: true, name: "phone", type: "tel", label: "\u0422\u0435\u043B\u0435\u0444\u043E\u043D", readOnly: true }), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, Object.assign({ to: types_1.ROUTES.EDIT_PROFILE }, { children: "\u0418\u0437\u043C\u0435\u043D\u0438\u0442\u044C \u0434\u0430\u043D\u043D\u044B\u0435" })), (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, Object.assign({ to: types_1.ROUTES.EDIT_PASSWORD }, { children: "\u0418\u0437\u043C\u0435\u043D\u0438\u0442\u044C \u043F\u0430\u0440\u043E\u043B\u044C" })), (0, jsx_runtime_1.jsx)("a", Object.assign({ href: "src/client/pages/ProfilePage/ProfilePage#", className: "red", onClick: handleLogout }, { children: "\u0412\u044B\u0439\u0442\u0438" }))] }))] }) })) })));
};
exports.ProfilePage = ProfilePage;
