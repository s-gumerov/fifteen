import { useRef } from "react";
import { Timer } from "../../components/ui/Timer";
import { init } from "../../Controllers/CanvasController";
import "./style.scss";

export const GameFieldPage = (): JSX.Element => {
  const ref = useRef<HTMLCanvasElement>(null);
  const refSteps = useRef<HTMLDivElement>(null);
  init(ref, refSteps);

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