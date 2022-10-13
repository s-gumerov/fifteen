import { useRef } from "react";
import { init } from "../../Controllers/CanvasController";
import { useTimer } from '../../hooks/useTimer';
import { transformSecondsCountToWordExpression } from '../../utils';
import "./style.scss";

export const GameFieldPage = (): JSX.Element => {
  const ref = useRef<HTMLCanvasElement>(null);
  const refSteps = useRef<HTMLDivElement>(null);
  const { counter } = useTimer();
  init(ref, refSteps);

  return (
    <div className="game">
      <canvas ref={ref} width={505} height={505} />
      <div className="game__data-wrapper">
        <div ref={refSteps} className="game__steps">Ходы: 0</div>
        <div>Время: {transformSecondsCountToWordExpression(counter)}</div>
      </div>
    </div>
  );
}