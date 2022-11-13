"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const context_1 = require("./context");
const Leaders_1 = require("./context/Leaders");
const Router_1 = require("./router/Router");
// import { withErrorBoundary } from 'react-error-boundary';
// import { ErrorFallback } from './services/errorBoundary/ErrorFallback';
require("./styles.scss");
function startServiceWorker() {
    if ("serviceWorker" in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register("/serviceWorker.ts").then(registration => {
                console.log("ServiceWorker registration successful with  scope: ", registration.scope);
            }).catch((error) => {
                console.log("ServiceWorker registration failed: ", error);
            });
        });
    }
}
function App() {
    // useEffect(() => {
    //   const fetchServerData = async () => {
    //     const url = `http://localhost:${__SERVER_PORT__}`
    //     const response = await fetch(url)
    //     const data = await response.json()
    //     console.log(data)
    //   }
    //
    //   fetchServerData()
    // }, [])
    return ((0, jsx_runtime_1.jsx)(context_1.AuthProvider, { children: (0, jsx_runtime_1.jsx)(Leaders_1.LeadersProvider, { children: (0, jsx_runtime_1.jsx)(Router_1.Router, {}) }) }));
}
exports.default = App;
