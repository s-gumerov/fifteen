"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isError = void 0;
function isError(action) {
    return action.type.endsWith('rejected');
}
exports.isError = isError;
