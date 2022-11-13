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
exports.AuthPage = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_router_dom_1 = require("react-router-dom");
const material_1 = require("@mui/material");
const formik_1 = require("formik");
const ui_1 = require("../../components/ui");
const types_1 = require("../../router/types");
const validation_schema_1 = require("./validation-schema");
const api_1 = require("../../api");
const context_1 = require("../../context");
const useAppDispatch_1 = require("../../hooks/useAppDispatch");
const userSlice_1 = require("../../store/user/userSlice");
require("./styles.scss");
const OAuth_1 = require("../../api/OAuth");
const img = require('../../assets/yaAuthBtn.svg');
const AuthPage = () => {
    const authContext = (0, context_1.useAuth)();
    const navigation = (0, react_router_dom_1.useNavigate)();
    const dispatch = (0, useAppDispatch_1.useAppDispatch)();
    const yaAuth = new Image();
    yaAuth.src = img;
    const handleSubmit = (values) => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield dispatch((0, userSlice_1.authorizeByThunk)(values));
        if (res.payload === "OK") {
            authContext === null || authContext === void 0 ? void 0 : authContext.setAuthorization(true);
            navigation(types_1.ROUTES.MAIN);
        }
    });
    const handleSubmitOAuth = () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, OAuth_1.getServiceId)();
        const { service_id } = res;
        if (service_id) {
            window.location.replace(`https://oauth.yandex.ru/authorize?response_type=code&client_id=${service_id}&redirect_uri=${api_1.REDIRECT_URI}`);
        }
    });
    return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "auth" }, { children: [(0, jsx_runtime_1.jsx)("h1", Object.assign({ className: "auth__title title" }, { children: "\u0410\u0432\u0442\u043E\u0440\u0438\u0437\u0430\u0446\u0438\u044F" })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "auth__form" }, { children: [(0, jsx_runtime_1.jsx)(formik_1.Formik, Object.assign({ initialValues: Object.assign({}, validation_schema_1.INITIAL_FORM_STATE), validationSchema: validation_schema_1.AUTH_VALIDATION_SCHEMA, onSubmit: handleSubmit }, { children: (0, jsx_runtime_1.jsxs)(formik_1.Form, { children: [(0, jsx_runtime_1.jsx)(ui_1.TextFieldAuth, { fullWidth: true, name: "login", type: "text", label: "\u041B\u043E\u0433\u0438\u043D" }), (0, jsx_runtime_1.jsx)(ui_1.TextFieldAuth, { fullWidth: true, name: "password", type: "password", label: "\u041F\u0430\u0440\u043E\u043B\u044C" }), (0, jsx_runtime_1.jsx)(material_1.Button, Object.assign({ fullWidth: true, type: "submit", variant: "contained", size: "large", sx: { mt: 4 } }, { children: "\u0412\u043E\u0439\u0442\u0438" }))] }) })), (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, Object.assign({ to: types_1.ROUTES.SIGNUP }, { children: "\u0417\u0430\u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0438\u0440\u043E\u0432\u0430\u0442\u044C\u0441\u044F" }))] })), (0, jsx_runtime_1.jsx)(material_1.Button, Object.assign({ className: "yaOAuth", onClick: handleSubmitOAuth, fullWidth: true, type: "submit", variant: "contained", size: "large", sx: { mt: 4 } }, { children: (0, jsx_runtime_1.jsx)("img", { src: img, alt: "" }) }))] })));
};
exports.AuthPage = AuthPage;
