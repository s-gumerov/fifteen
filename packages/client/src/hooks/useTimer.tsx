import { useState, useEffect } from "react";

const useTimer = (ref: any) => {

  const [timeStart] = useState(Number(new Date));
  const [time, setTime] = useState(0);

  useEffect(() => {
    const gameTime = ref.current;
    const timer = setInterval(() => {
      const timeCurrent = Number(new Date);
      setTime(timeCurrent - timeStart);
      let timeString = `Время: ${Math.round(time / 1000)} сек`;
      if (time >= 60000) {
        timeString = `Время: ${Math.floor(time / 60000)} мин ${Math.round((time % 60000) / 1000)} сек`;
      }
      if (gameTime) {
        gameTime.textContent = timeString;
      };
    }, 1000);
    return () => {
      clearInterval(timer);
    }
  }, [time]);
}

export { useTimer }