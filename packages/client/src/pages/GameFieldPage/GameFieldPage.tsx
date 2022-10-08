import { useEffect, useRef } from "react";
import { drawField, mixBoard, turnGameStep } from "../../Controllers/CanvasController";
import './style.scss';
import img from '../../assets/bgPuzzle.svg';

export const GameFieldPage = (): JSX.Element => {
  const ref = useRef<HTMLCanvasElement>(null);
  const bg = new Image()
  bg.src = img
  const boardNumber: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0];
  const board = mixBoard(boardNumber);
  let steps = 0;

  useEffect(() => {
    const ctx = ref.current?.getContext('2d');
    bg.addEventListener('load', () => {
      ctx && board && drawField(ctx, board, bg);
    });

    const canvas = document.querySelector('canvas');
    const gameSteps = document.querySelector('.game__steps');
    const gameTime = document.querySelector('.game__time');

    const timeStart = Number(new Date);
    setInterval(() => {
      const timeCurrent = Number(new Date);
      const time = timeCurrent - timeStart;
      let timeString = `Время: ${Math.round(time / 1000)} сек`;
      if (time >= 60000) {
        timeString = `Время: ${Math.floor(time / 60000)} мин ${Math.round((time % 60000) / 1000)} сек`;
      }
      if (gameTime) {
        gameTime.textContent = timeString;
      };
    }, 1000)

    ctx && board && canvas?.addEventListener('click', (e) => {
      const stepsIsDone = turnGameStep(e,ctx,board,bg)
      if (gameSteps && stepsIsDone) {
        steps++;
        gameSteps.textContent = `Ходы: ${steps}`
      }
    }), []
  });
  


  return (
    <div className="game">
      <canvas ref={ref} width={505} height={505} />
      <div className="game__data-wrapper">
        <div className="game__steps">Ходы: 0</div>
        <div className="game__time">Время: 0 сек</div>
      </div>
    </div>
  );
}