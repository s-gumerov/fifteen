"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditPasswordPage = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const ui_1 = require("../../components/ui");
const material_1 = require("@mui/material");
const formik_1 = require("formik");
const validation_schema_1 = require("./validation-schema");
const useAppDispatch_1 = require("../../hooks/useAppDispatch");
const userSlice_1 = require("../../store/user/userSlice");
const EditPasswordPage = () => {
    const { user } = (0, useAppDispatch_1.useAppSelector)(state => state.user);
    const handleSubmit = (values) => {
        (0, userSlice_1.changePassword)(values);
    };
    return ((0, jsx_runtime_1.jsx)("div", Object.assign({ className: "profile" }, { children: (0, jsx_runtime_1.jsx)(formik_1.Formik, Object.assign({ enableReinitialize: true, initialValues: Object.assign({}, validation_schema_1.INITIAL_FORM_STATE), validationSchema: validation_schema_1.EDIT_PASSWORD_VALIDATION_SCHEMA, onSubmit: handleSubmit }, { children: (0, jsx_runtime_1.jsxs)(formik_1.Form, { children: [(0, jsx_runtime_1.jsx)(material_1.Avatar, { alt: "\u0410\u0432\u0430\u0442\u0430\u0440", src: (user === null || user === void 0 ? void 0 : user.avatar) || "https://mui.com/static/images/avatar/1.jpg", sx: { width: 120, height: 120, mx: "auto", mb: 2 } }), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "profile__form" }, { children: [(0, jsx_runtime_1.jsx)(ui_1.TextFieldProfile, { fullWidth: true, name: "oldPassword", type: "password", label: "\u0421\u0442\u0430\u0440\u044B\u0439 \u043F\u0430\u0440\u043E\u043B\u044C" }), (0, jsx_runtime_1.jsx)(ui_1.TextFieldProfile, { fullWidth: true, name: "newPassword", type: "password", label: "\u041D\u043E\u0432\u044B\u0439 \u043F\u0430\u0440\u043E\u043B\u044C" }), (0, jsx_runtime_1.jsx)(ui_1.TextFieldProfile, { fullWidth: true, name: "password_again", type: "password", label: "\u041F\u043E\u0432\u0442\u043E\u0440\u0438\u0442\u0435 \u043D\u043E\u0432\u044B\u0439 \u043F\u0430\u0440\u043E\u043B\u044C" }), (0, jsx_runtime_1.jsx)(material_1.Button, Object.assign({ variant: "contained", size: "large", type: "submit", sx: { mt: 4 } }, { children: "\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C" }))] }))] }) })) })));
};
exports.EditPasswordPage = EditPasswordPage;
