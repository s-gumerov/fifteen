import {useEffect, useRef, useState} from 'react'
import {isEqual} from 'lodash'
import {useNavigate} from "react-router-dom";
import {transformSecondsCountToWordExpression, updateGameResult} from '../../utils';
import {useTimer} from '../../hooks/useTimer';
import {useLeaders} from "../../context/Leaders";
import {CanvasController} from '../../Controllers';
import {TBoard} from '../../Controllers/CanvasController/types';
import {
    buttonLeaders,
    buttonRepeatGame,
} from '../../Controllers/CanvasController/const';

import "./style.scss";

const Canvas = new CanvasController;

export const GameFieldPage = (): JSX.Element => {
    const [board, setBoard] = useState(Canvas.mixBoard());
    const [stepsCount, setStepsCount] = useState(0);
    const [checkWin, setCheckWin] = useState(false)
    const fieldRef = useRef<HTMLCanvasElement>(null);
    const leaders = useLeaders()
    const navigate = useNavigate()
    const {secondsCount, setSecondsCounter, setToggleSecondsCounter} = useTimer();

    const backgroundPuzzle = Canvas.getBackgroundPuzzle();
    const canvasEngGameHandleClick = (event: React.MouseEvent) => {
        event.preventDefault()
        const mousePos = Canvas.getMousePos(fieldRef.current!, event)
        console.log(typeof mousePos)
        if (Canvas.isInsideButton(mousePos, buttonRepeatGame)) {
            setCheckWin(false)
            setStepsCount(0)
            setSecondsCounter(0)
            setToggleSecondsCounter(true);
            setBoard(Canvas.mixBoard())
            Canvas.buttonRepeatClick(fieldRef, board, backgroundPuzzle)
        }
        if (Canvas.isInsideButton(mousePos, buttonLeaders)) {
            navigate('/leaders')
        }
    }

    const handleClickOnField = (event: React.MouseEvent) => {
        const previousBoard = [[...board[0]], [...board[1]], [...board[2]], [...board[3]]];
        const currentBoard = Canvas.getBoardAfterClick(event, previousBoard);

        if (!isEqual(board, currentBoard)) {
            setStepsCount(stepsCount + 1);
            setBoard(currentBoard);
            Canvas.drawField(fieldRef, currentBoard, backgroundPuzzle);

            if (Canvas.isWin(currentBoard)) {
                setCheckWin(true)
                setToggleSecondsCounter(false)
                leaders?.setLeaders(updateGameResult(leaders!.leaders, stepsCount + 1, secondsCount))
                Canvas.canvasIsWinDraw(fieldRef, leaders!.leaders)
            }
        }
    }

    useEffect(() => {
        Canvas.init(fieldRef, board as TBoard, backgroundPuzzle);
    }, []);

    return (
        <div className="game">
            <canvas ref={fieldRef} onClick={checkWin ? canvasEngGameHandleClick : handleClickOnField} width={505}
                    height={505}/>
            <div className="game__data-wrapper">
                <div className="game__steps">Ходы: {stepsCount}</div>
                <div>Время: {transformSecondsCountToWordExpression(secondsCount)}</div>
            </div>
        </div>
    );
}
