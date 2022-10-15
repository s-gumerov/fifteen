import { useState, useEffect } from "react";

export const useTimer = () => {
  const [secondsCount, setSecondsCounter] = useState(0);
  const [toggleSecondsCounter, setToggleSecondsCounter] = useState(true);

  useEffect(() => {
    const timer = toggleSecondsCounter ? setInterval(() => setSecondsCounter(secondsCount + 1), 1000) : null
    return () => {
      if(timer) return clearInterval(timer);
    }
  }, [secondsCount, toggleSecondsCounter]);

  return { secondsCount, toggleSecondsCounter, setToggleSecondsCounter }
}