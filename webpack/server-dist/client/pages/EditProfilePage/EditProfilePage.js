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
exports.EditProfilePage = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const ui_1 = require("../../components/ui");
const material_1 = require("@mui/material");
const formik_1 = require("formik");
const validation_schema_1 = require("./validation-schema");
const useAppDispatch_1 = require("../../hooks/useAppDispatch");
const userSlice_1 = require("../../store/user/userSlice");
require("./styles.scss");
const react_router_dom_1 = require("react-router-dom");
const types_1 = require("../../router/types");
const EditProfilePage = () => {
    var _a;
    const dispatch = (0, useAppDispatch_1.useAppDispatch)();
    const navigation = (0, react_router_dom_1.useNavigate)();
    const { user } = (0, useAppDispatch_1.useAppSelector)(state => state.user);
    const handleSubmit = (values) => __awaiter(void 0, void 0, void 0, function* () {
        yield dispatch((0, userSlice_1.changeProfileByThunk)(values));
        navigation(types_1.ROUTES.PROFILE);
    });
    const fileSelectedHandler = (e) => __awaiter(void 0, void 0, void 0, function* () {
        var _b;
        const formData = new FormData();
        const file = (_b = e.target.files) === null || _b === void 0 ? void 0 : _b[0];
        formData.append('avatar', file);
        yield dispatch((0, userSlice_1.changeAvatarByThunk)(formData));
    });
    return ((0, jsx_runtime_1.jsx)("div", Object.assign({ className: "profile" }, { children: (0, jsx_runtime_1.jsx)(formik_1.Formik, Object.assign({ enableReinitialize: true, initialValues: user !== null && user !== void 0 ? user : validation_schema_1.INITIAL_FORM_STATE, validationSchema: validation_schema_1.EDIT_PROFILE_VALIDATION_SCHEMA, onSubmit: handleSubmit }, { children: (0, jsx_runtime_1.jsxs)(formik_1.Form, { children: [(0, jsx_runtime_1.jsxs)("label", Object.assign({ htmlFor: "inputAvatar" }, { children: [(0, jsx_runtime_1.jsx)("input", { accept: "image/*", id: "inputAvatar", type: "file", onChange: fileSelectedHandler }), (0, jsx_runtime_1.jsx)(material_1.Avatar, { alt: "\u0410\u0432\u0430\u0442\u0430\u0440", src: (_a = user === null || user === void 0 ? void 0 : user.avatar) !== null && _a !== void 0 ? _a : "https://mui.com/static/images/avatar/1.jpg", sx: { width: 120, height: 120, mx: "auto", mb: 2 } })] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "profile__form" }, { children: [(0, jsx_runtime_1.jsx)(ui_1.TextFieldProfile, { fullWidth: true, name: "email", type: "text", label: "\u041F\u043E\u0447\u0442\u0430" }), (0, jsx_runtime_1.jsx)(ui_1.TextFieldProfile, { fullWidth: true, name: "login", type: "text", label: "\u041B\u043E\u0433\u0438\u043D" }), (0, jsx_runtime_1.jsx)(ui_1.TextFieldProfile, { fullWidth: true, name: "first_name", type: "text", label: "\u0418\u043C\u044F" }), (0, jsx_runtime_1.jsx)(ui_1.TextFieldProfile, { fullWidth: true, name: "second_name", type: "text", label: "\u0424\u0430\u043C\u0438\u043B\u0438\u044F" }), (0, jsx_runtime_1.jsx)(ui_1.TextFieldProfile, { fullWidth: true, name: "display_name", type: "text", label: "\u041E\u0442\u043E\u0431\u0440\u0430\u0436\u0430\u0435\u043C\u043E\u0435 \u0438\u043C\u044F" }), (0, jsx_runtime_1.jsx)(ui_1.TextFieldProfile, { fullWidth: true, name: "phone", type: "tel", label: "\u0422\u0435\u043B\u0435\u0444\u043E\u043D" }), (0, jsx_runtime_1.jsx)(material_1.Button, Object.assign({ variant: "contained", size: "large", type: "submit", sx: { mt: 4 } }, { children: "\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C" }))] }))] }) })) })));
};
exports.EditProfilePage = EditProfilePage;
