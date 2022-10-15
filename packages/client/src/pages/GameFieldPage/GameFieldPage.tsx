import { useEffect, useRef, useState } from 'react'
import { isEqual } from 'lodash'
import { transformSecondsCountToWordExpression } from '../../utils';
import { CanvasController } from '../../Controllers';
import { useTimer } from '../../hooks/useTimer';
import { TBoard } from '../../Controllers/CanvasController/types';
import "./style.scss";

const Canvas = new CanvasController;

export const GameFieldPage = (): JSX.Element => {
  const [board, setBoard] = useState(Canvas.mixBoard());
  const [stepsCount, setStepsCount] = useState(0);
  const fieldRef = useRef<HTMLCanvasElement>(null);
  const { secondsCount, toggleSecondsCounter, setToggleSecondsCounter } = useTimer();

  const backgroundPuzzle = Canvas.getBackgroundPuzzle();

  const handleClickOnField = (event: React.MouseEvent) => {
    const previousBoard = [[...board[0]], [...board[1]], [...board[2]], [...board[3]]];
    const currentBoard = Canvas.getBoardAfterClick(event, previousBoard);

    if(!isEqual(board, currentBoard)) {
      setStepsCount(stepsCount + 1);
      setBoard(currentBoard);
      Canvas.drawField(fieldRef, currentBoard, backgroundPuzzle);

      if(Canvas.isWin(currentBoard)) {
        console.log('You win')
      }
    }
  }

  useEffect(() => {
    Canvas.init(fieldRef, board as TBoard, backgroundPuzzle);
  }, []);

  return (
    <div className="game">
      <canvas ref={fieldRef} onClick={handleClickOnField} width={505} height={505} />
      <div className="game__data-wrapper">
        <div className="game__steps">Ходы: {stepsCount}</div>
        <div>Время: {transformSecondsCountToWordExpression(secondsCount)}</div>
      </div>
    </div>
  );
}