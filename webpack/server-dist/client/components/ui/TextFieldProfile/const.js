"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextFieldProfileStyles = void 0;
const colors_1 = require("@mui/material/colors");
exports.TextFieldProfileStyles = {
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
    },
    "& .MuiInputAdornment-standard p": {
        color: "gray"
    },
    "& .MuiInputBase-input": {
        textAlign: "right"
    },
    mt: 2
};
