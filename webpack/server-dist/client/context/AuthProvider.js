"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthProvider = exports.useAuth = exports.AuthContext = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
exports.AuthContext = (0, react_1.createContext)(null);
const useAuth = () => (0, react_1.useContext)(exports.AuthContext);
exports.useAuth = useAuth;
const AuthProvider = ({ children }) => {
    const [isAuthorized, setAuthorization] = (0, react_1.useState)(true);
    return ((0, jsx_runtime_1.jsx)(exports.AuthContext.Provider, Object.assign({ value: { isAuthorized, setAuthorization } }, { children: children })));
};
exports.AuthProvider = AuthProvider;
