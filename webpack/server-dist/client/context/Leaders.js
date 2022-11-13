"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeadersProvider = exports.useLeaders = exports.LeadersContext = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const useAppDispatch_1 = require("../hooks/useAppDispatch");
exports.LeadersContext = (0, react_1.createContext)(null);
const useLeaders = () => (0, react_1.useContext)(exports.LeadersContext);
exports.useLeaders = useLeaders;
const LeadersProvider = ({ children }) => {
    const { leaderboard } = (0, useAppDispatch_1.useAppSelector)(state => state.leaderboard);
    const [leaders, setLeaders] = (0, react_1.useState)(null);
    (0, react_1.useEffect)(() => {
        if (leaderboard) {
            /* если есть данные для отрисовки тогда сортировка по количеству ходов */
            const unfrozenLeaderboard = [...leaderboard]
                .sort((a, b) => a.data.moves > b.data.moves ? 1 : -1);
            setLeaders(unfrozenLeaderboard);
        }
    }, [leaderboard]);
    return ((0, jsx_runtime_1.jsx)(exports.LeadersContext.Provider, Object.assign({ value: { leaders, setLeaders } }, { children: children })));
};
exports.LeadersProvider = LeadersProvider;
