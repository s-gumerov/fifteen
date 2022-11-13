"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextFieldAuthStyles = void 0;
const colors_1 = require("@mui/material/colors");
exports.TextFieldAuthStyles = {
    "& .MuiInputBase-root": {
        color: colors_1.grey[300],
        '&:before': {
            borderColor: "white",
        },
        "&:after": {
            borderColor: "white",
        },
        "&:hover:not(.Mui-disabled):before": {
            borderColor: "white",
        },
        "&:placeholder": {
            color: "gray"
        },
    },
    "& .MuiInputLabel-root": {
        color: "gray"
    },
    "& .MuiFormLabel-root.MuiFormLabel-filled": {
        color: "gray"
    },
    "& .MuiFormLabel-root.Mui-focused": {
        color: "white"
    },
};
