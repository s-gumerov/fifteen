"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextFieldProfile = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const material_1 = require("@mui/material");
const InputAdornment_1 = __importDefault(require("@mui/material/InputAdornment"));
const const_1 = require("./const");
const formik_1 = require("formik");
const TextFieldProfile = (_a) => {
    var { name, label, readOnly } = _a, propsWithoutNameAndLabel = __rest(_a, ["name", "label", "readOnly"]);
    const [field, meta] = (0, formik_1.useField)(name);
    const configTextField = Object.assign(Object.assign({}, field), propsWithoutNameAndLabel);
    if (meta && meta.touched && meta.error) {
        configTextField.error = true;
        configTextField.helperText = meta.error;
    }
    return ((0, jsx_runtime_1.jsx)(material_1.TextField, Object.assign({}, configTextField, { variant: "standard", sx: const_1.TextFieldProfileStyles, InputProps: {
            startAdornment: (0, jsx_runtime_1.jsx)(InputAdornment_1.default, Object.assign({ position: "start" }, { children: label })),
            readOnly
        } })));
};
exports.TextFieldProfile = TextFieldProfile;
