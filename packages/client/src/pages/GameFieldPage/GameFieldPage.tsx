import { useEffect, useRef, useState } from "react";
import { drawField, mixBoard, turnGameStep } from "../../Controllers/CanvasController";
import { Timer } from "../../components/ui/Timer";
import './style.scss';
import img from '../../assets/bgPuzzle.svg';

export const GameFieldPage = (): JSX.Element => {
  const ref = useRef<HTMLCanvasElement>(null);
  const refSteps = useRef<HTMLDivElement>(null);
  const bg = new Image()
  const boardNumber: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0];
  const [board] = useState(mixBoard(boardNumber))
  bg.src = img
  let steps = 0;
  useEffect(() => {
    const ctx = ref.current?.getContext('2d');
    bg.addEventListener('load', () => {
      ctx && board && drawField(ctx, board, bg);
    });
  },[])

  useEffect(() => {
    const ctx = ref.current?.getContext('2d');
    const canvas = ref.current;
    const handleCLick = (e: MouseEvent) => {
      const stepsIsDone = ctx && board && turnGameStep(e,ctx,board,bg)
      if (refSteps.current && stepsIsDone) {
        steps++;
        refSteps.current.textContent = `Ходы: ${steps}`;
      }
    }
    canvas?.addEventListener('click', (e) => handleCLick(e));

    return () => {
      canvas?.removeEventListener('click', (e) => handleCLick(e));
    }
  }, [steps])
  

  return (
    <div className="game">
      <canvas ref={ref} width={505} height={505} />
      <div className="game__data-wrapper">
        <div ref={refSteps} className="game__steps">Ходы: 0</div>
        <Timer />
      </div>
    </div>
  );
}