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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Router = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_router_dom_1 = require("react-router-dom");
const context_1 = require("../context");
const pages_1 = require("../pages");
const types_1 = require("./types");
const layouts_1 = require("../layouts");
const PrivateRoute_1 = require("./PrivateRoute");
const PublicRoute_1 = require("./PublicRoute");
const useAppDispatch_1 = require("../hooks/useAppDispatch");
const userSlice_1 = require("../store/user/userSlice");
const types_2 = require("../store/user/types");
// @ts-ignore
const pirates_of_the_caribbean_mp3_1 = __importDefault(require("../assets/audio/pirates_of_the_caribbean.mp3"));
const PlayAudioToPage_1 = require("../hocs/playAudioToPage/PlayAudioToPage");
const leaderboardSlice_1 = require("../store/leaderboard/leaderboardSlice");
const const_1 = require("../const");
const api_1 = require("../api");
const OAuth_1 = require("../api/OAuth");
const Router = () => {
    const authContext = (0, context_1.useAuth)();
    const dispatch = (0, useAppDispatch_1.useAppDispatch)();
    /* оборачиваем страницу с игрой в HOC, чтобы при каждом её открытии циклически воспроизводилось аудио */
    const GameFieldPageWithAudio = (0, PlayAudioToPage_1.withPlayingAudio)(pages_1.GameFieldPage, pirates_of_the_caribbean_mp3_1.default);
    (0, react_1.useEffect)(() => {
        var _a;
        const OAuthParams = new URLSearchParams(window.location.search);
        const code = (_a = OAuthParams.get('code')) === null || _a === void 0 ? void 0 : _a.toString();
        const yandexOAuth = (code) => __awaiter(void 0, void 0, void 0, function* () {
            const redirect_uri = api_1.REDIRECT_URI;
            const res = yield (0, OAuth_1.authorizeWithYaOAuth)({ code, redirect_uri });
            if (res === 'OK') {
                return setTimeout(() => {
                    checkAuthorization();
                }, 1000);
            }
        });
        const checkAuthorization = () => __awaiter(void 0, void 0, void 0, function* () {
            const userInfo = yield dispatch((0, userSlice_1.getUserInfoByThunk)());
            dispatch((0, leaderboardSlice_1.getLeaderboardByThunk)(const_1.leaderboardDefaultQuery));
            if (userInfo.type !== `${types_2.userReducerTypes.getUserInfo}/rejected`)
                authContext === null || authContext === void 0 ? void 0 : authContext.setAuthorization(true);
            else
                authContext === null || authContext === void 0 ? void 0 : authContext.setAuthorization(false);
        });
        code ? yandexOAuth(code) : checkAuthorization();
    }, []);
    return ((0, jsx_runtime_1.jsxs)(react_router_dom_1.Routes, { children: [(0, jsx_runtime_1.jsx)(react_router_dom_1.Route, Object.assign({ element: (0, jsx_runtime_1.jsx)(PublicRoute_1.PublicRoute, {}) }, { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: types_1.ROUTES.SIGNUP, element: (0, jsx_runtime_1.jsx)(layouts_1.MainLayout, { children: (0, jsx_runtime_1.jsx)(pages_1.SignupPage, {}) }) }) })), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, Object.assign({ element: (0, jsx_runtime_1.jsx)(PublicRoute_1.PublicRoute, {}) }, { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: types_1.ROUTES.AUTH, element: (0, jsx_runtime_1.jsx)(layouts_1.MainLayout, { children: (0, jsx_runtime_1.jsx)(pages_1.AuthPage, {}) }) }) })), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, Object.assign({ element: (0, jsx_runtime_1.jsx)(PrivateRoute_1.PrivateRoute, {}) }, { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: types_1.ROUTES.MAIN, element: (0, jsx_runtime_1.jsx)(layouts_1.MainLayout, { children: (0, jsx_runtime_1.jsx)(pages_1.MainPage, {}) }) }) })), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, Object.assign({ element: (0, jsx_runtime_1.jsx)(PrivateRoute_1.PrivateRoute, {}) }, { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: types_1.ROUTES.GAME_FIELD, element: (0, jsx_runtime_1.jsx)(layouts_1.MainLayout, Object.assign({ backUrl: types_1.ROUTES.MAIN }, { children: (0, jsx_runtime_1.jsx)(GameFieldPageWithAudio, {}) })) }) })), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, Object.assign({ element: (0, jsx_runtime_1.jsx)(PrivateRoute_1.PrivateRoute, {}) }, { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: types_1.ROUTES.LEADERS, element: (0, jsx_runtime_1.jsx)(layouts_1.MainLayout, Object.assign({ backUrl: types_1.ROUTES.MAIN }, { children: (0, jsx_runtime_1.jsx)(pages_1.LeadersPage, {}) })) }) })), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, Object.assign({ element: (0, jsx_runtime_1.jsx)(PrivateRoute_1.PrivateRoute, {}) }, { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: types_1.ROUTES.PROFILE, element: (0, jsx_runtime_1.jsx)(layouts_1.MainLayout, Object.assign({ backUrl: types_1.ROUTES.MAIN }, { children: (0, jsx_runtime_1.jsx)(pages_1.ProfilePage, {}) })) }) })), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, Object.assign({ element: (0, jsx_runtime_1.jsx)(PrivateRoute_1.PrivateRoute, {}) }, { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: types_1.ROUTES.EDIT_PROFILE, element: (0, jsx_runtime_1.jsx)(layouts_1.MainLayout, Object.assign({ backUrl: types_1.ROUTES.PROFILE }, { children: (0, jsx_runtime_1.jsx)(pages_1.EditProfilePage, {}) })) }) })), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, Object.assign({ element: (0, jsx_runtime_1.jsx)(PrivateRoute_1.PrivateRoute, {}) }, { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: types_1.ROUTES.EDIT_PASSWORD, element: (0, jsx_runtime_1.jsx)(layouts_1.MainLayout, Object.assign({ backUrl: types_1.ROUTES.PROFILE }, { children: (0, jsx_runtime_1.jsx)(pages_1.EditPasswordPage, {}) })) }) })), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, Object.assign({ element: (0, jsx_runtime_1.jsx)(PrivateRoute_1.PrivateRoute, {}) }, { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: types_1.ROUTES.FORUM, element: (0, jsx_runtime_1.jsx)(layouts_1.MainLayout, Object.assign({ backUrl: types_1.ROUTES.MAIN }, { children: (0, jsx_runtime_1.jsx)(pages_1.ForumPage, {}) })) }) })), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, Object.assign({ element: (0, jsx_runtime_1.jsx)(PrivateRoute_1.PrivateRoute, {}) }, { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: `${types_1.ROUTES.FORUM}/:id`, element: (0, jsx_runtime_1.jsx)(layouts_1.MainLayout, Object.assign({ backUrl: types_1.ROUTES.FORUM }, { children: (0, jsx_runtime_1.jsx)(pages_1.ForumSubPage, {}) })) }) })), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, Object.assign({ element: (0, jsx_runtime_1.jsx)(PrivateRoute_1.PrivateRoute, {}) }, { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: types_1.ROUTES.RULES, element: (0, jsx_runtime_1.jsx)(layouts_1.MainLayout, Object.assign({ backUrl: types_1.ROUTES.MAIN }, { children: (0, jsx_runtime_1.jsx)(pages_1.RulesPage, {}) })) }) })), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: '*', element: (0, jsx_runtime_1.jsx)(layouts_1.MainLayout, Object.assign({ backUrl: types_1.ROUTES.MAIN }, { children: (0, jsx_runtime_1.jsx)(pages_1.NotFoundPage, {}) })) })] }));
};
exports.Router = Router;
