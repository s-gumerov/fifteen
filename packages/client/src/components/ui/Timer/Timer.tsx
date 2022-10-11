import { useRef } from "react";
import { useTimer } from "../../../hooks/useTimer";

export const Timer = (): JSX.Element => {
  const refTime = useRef<HTMLDivElement>(null);
  useTimer(refTime)

  return (
    <div ref={refTime}>Время: 0 сек</div>
)}