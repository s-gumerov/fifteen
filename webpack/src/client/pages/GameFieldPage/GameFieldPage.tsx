import {useEffect, useRef, useState} from 'react'
import {isEqual} from 'lodash'
import {useNavigate} from "react-router-dom";
import {transformSecondsCountToWordExpression} from '../../utils';
import {useTimer} from '../../hooks/useTimer';
import {CanvasController} from '../../Controllers';
import {TBoard} from '../../Controllers/CanvasController/types';
import {
    buttonLeaders,
    buttonRepeatGame,
} from '../../Controllers/CanvasController/const';
import {addPlayerToLeaderboardByThunk} from '../../store/leaderboard/leaderboardSlice';
import {TAddPlayerToLeaderboard} from '../../api/leaderbord';
import "./style.scss";
import {TPlayer} from '../LeadersPage/types';
import {useAppDispatch, useAppSelector} from '../../hooks/useAppDispatch';
import {ratingFieldName, teamName} from '../../const';
import {useLeaders} from '../../context/Leaders';
import {ROUTES} from '../../router/types';

const Canvas = new CanvasController;

export const GameFieldPage = (): JSX.Element => {
    const {user} = useAppSelector(state => state.user);
    const [board, setBoard] = useState(Canvas.mixBoard());
    const [stepsCount, setStepsCount] = useState(0);
    const [checkWin, setCheckWin] = useState(false)
    const fieldRef = useRef<HTMLCanvasElement>(null);
    const leaders = useLeaders();

    const navigate = useNavigate()
    const {secondsCount, setSecondsCounter, setToggleSecondsCounter} = useTimer();
    const dispatch = useAppDispatch();

    const backgroundPuzzle = Canvas.getBackgroundPuzzle();
    const canvasEngGameHandleClick = (event: React.MouseEvent) => {
        event.preventDefault()
        const mousePos = Canvas.getMousePos(fieldRef.current!, event)
        if (Canvas.isInsideButton(mousePos, buttonRepeatGame)) {
            setCheckWin(false)
            setStepsCount(0)
            setSecondsCounter(0)
            setToggleSecondsCounter(true);


            Canvas.buttonRepeatClick(fieldRef, board, backgroundPuzzle)
        }
        if (Canvas.isInsideButton(mousePos, buttonLeaders)) {
            navigate(ROUTES.LEADERS);
        }
    }

    const handleClickOnField = async (event: React.MouseEvent) => {
        const previousBoard = [[...board[0]], [...board[1]], [...board[2]], [...board[3]]];
        const currentBoard = Canvas.getBoardAfterClick(event, previousBoard);

        if (!isEqual(board, currentBoard)) {
            setStepsCount(stepsCount + 1);
            setBoard(currentBoard);
            Canvas.drawField(fieldRef, currentBoard, backgroundPuzzle);

            if (Canvas.isWin(currentBoard)) {
                setCheckWin(true)
                setToggleSecondsCounter(false)


                setBoard(Canvas.mixBoard())

                if (user) {
                    const leaderboard = leaders!.leaders!;
                    const gameResult: TPlayer = {
                        id: user.id,
                        nickname: user.display_name ?? user.login,
                        moves: stepsCount + 1,
                        time: transformSecondsCountToWordExpression(secondsCount)
                    };

                    const requestData: TAddPlayerToLeaderboard = {
                        data: gameResult,
                        ratingFieldName: ratingFieldName,
                        teamName: teamName,
                    }

                    await dispatch(addPlayerToLeaderboardByThunk(requestData));
                    Canvas.canvasIsWinDraw(fieldRef, user.id, leaderboard)
                }

            }
        }
    };

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
