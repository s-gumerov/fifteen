"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useTimer = void 0;
const react_1 = require("react");
const useTimer = () => {
    const [secondsCount, setSecondsCounter] = (0, react_1.useState)(0);
    const [toggleSecondsCounter, setToggleSecondsCounter] = (0, react_1.useState)(true);
    (0, react_1.useEffect)(() => {
        const timer = toggleSecondsCounter ? setInterval(() => setSecondsCounter(secondsCount + 1), 1000) : null;
        return () => {
            if (timer)
                return clearInterval(timer);
        };
    }, [secondsCount, toggleSecondsCounter]);
    return { secondsCount, setSecondsCounter, toggleSecondsCounter, setToggleSecondsCounter };
};
exports.useTimer = useTimer;
