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
exports.GameFieldPage = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const lodash_1 = require("lodash");
const react_router_dom_1 = require("react-router-dom");
const utils_1 = require("../../utils");
const useTimer_1 = require("../../hooks/useTimer");
const Controllers_1 = require("../../Controllers");
const const_1 = require("../../Controllers/CanvasController/const");
const leaderboardSlice_1 = require("../../store/leaderboard/leaderboardSlice");
require("./style.scss");
const useAppDispatch_1 = require("../../hooks/useAppDispatch");
const const_2 = require("../../const");
const Leaders_1 = require("../../context/Leaders");
const types_1 = require("../../router/types");
const Canvas = new Controllers_1.CanvasController;
const GameFieldPage = () => {
    const { user } = (0, useAppDispatch_1.useAppSelector)(state => state.user);
    const [board, setBoard] = (0, react_1.useState)(Canvas.mixBoard());
    const [stepsCount, setStepsCount] = (0, react_1.useState)(0);
    const [checkWin, setCheckWin] = (0, react_1.useState)(false);
    const fieldRef = (0, react_1.useRef)(null);
    const leaders = (0, Leaders_1.useLeaders)();
    const navigate = (0, react_router_dom_1.useNavigate)();
    const { secondsCount, setSecondsCounter, setToggleSecondsCounter } = (0, useTimer_1.useTimer)();
    const dispatch = (0, useAppDispatch_1.useAppDispatch)();
    const backgroundPuzzle = Canvas.getBackgroundPuzzle();
    const canvasEngGameHandleClick = (event) => {
        event.preventDefault();
        const mousePos = Canvas.getMousePos(fieldRef.current, event);
        if (Canvas.isInsideButton(mousePos, const_1.buttonRepeatGame)) {
            setCheckWin(false);
            setStepsCount(0);
            setSecondsCounter(0);
            setToggleSecondsCounter(true);
            Canvas.buttonRepeatClick(fieldRef, board, backgroundPuzzle);
        }
        if (Canvas.isInsideButton(mousePos, const_1.buttonLeaders)) {
            navigate(types_1.ROUTES.LEADERS);
        }
    };
    const handleClickOnField = (event) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const previousBoard = [[...board[0]], [...board[1]], [...board[2]], [...board[3]]];
        const currentBoard = Canvas.getBoardAfterClick(event, previousBoard);
        if (!(0, lodash_1.isEqual)(board, currentBoard)) {
            setStepsCount(stepsCount + 1);
            setBoard(currentBoard);
            Canvas.drawField(fieldRef, currentBoard, backgroundPuzzle);
            if (Canvas.isWin(currentBoard)) {
                setCheckWin(true);
                setToggleSecondsCounter(false);
                setBoard(Canvas.mixBoard());
                if (user) {
                    const leaderboard = leaders.leaders;
                    const gameResult = {
                        id: user.id,
                        nickname: (_a = user.display_name) !== null && _a !== void 0 ? _a : user.login,
                        moves: stepsCount + 1,
                        time: (0, utils_1.transformSecondsCountToWordExpression)(secondsCount)
                    };
                    const requestData = {
                        data: gameResult,
                        ratingFieldName: const_2.ratingFieldName,
                        teamName: const_2.teamName,
                    };
                    yield dispatch((0, leaderboardSlice_1.addPlayerToLeaderboardByThunk)(requestData));
                    Canvas.canvasIsWinDraw(fieldRef, user.id, leaderboard);
                }
            }
        }
    });
    (0, react_1.useEffect)(() => {
        Canvas.init(fieldRef, board, backgroundPuzzle);
    }, []);
    return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "game" }, { children: [(0, jsx_runtime_1.jsx)("canvas", { ref: fieldRef, onClick: checkWin ? canvasEngGameHandleClick : handleClickOnField, width: 505, height: 505 }), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "game__data-wrapper" }, { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "game__steps" }, { children: ["\u0425\u043E\u0434\u044B: ", stepsCount] })), (0, jsx_runtime_1.jsxs)("div", { children: ["\u0412\u0440\u0435\u043C\u044F: ", (0, utils_1.transformSecondsCountToWordExpression)(secondsCount)] })] }))] })));
};
exports.GameFieldPage = GameFieldPage;
