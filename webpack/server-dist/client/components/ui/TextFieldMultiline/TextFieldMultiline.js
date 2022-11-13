"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextFieldMultiline = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const TextField_1 = __importDefault(require("@mui/material/TextField"));
const const_1 = require("./const");
const TextFieldMultiline = ({ label, placeholder, rows, id, name }) => ((0, jsx_runtime_1.jsx)(TextField_1.default, { id: id, name: name, label: label, placeholder: placeholder, multiline: true, rows: rows, variant: "standard", sx: const_1.TextFieldMultilineStyles }));
exports.TextFieldMultiline = TextFieldMultiline;
