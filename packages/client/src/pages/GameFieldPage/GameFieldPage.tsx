import { useEffect, useRef } from "react";
import img from '../../assets/bgPuzzle.svg'

export const GameFieldPage = (): JSX.Element => {
  const ref = useRef<HTMLCanvasElement>(null);
  const bg = new Image()
  bg.src = img

  useEffect(() => {
      const ctx = ref.current?.getContext('2d');
      let cardNumber = 1;
      bg.onload = function() {
        for (let i = 0; i < 4; i++) {
          for (let j = 0; j < 4; j++) {
            let dx = 0;
            if (cardNumber > 9) {
              dx= 40;
            } else {
              dx = 0;
            }
            if (ctx) {
              ctx.font = "128px serif";
              ctx.fillStyle = '#F5F5F5';
              ctx.fillRect(j * 200, i * 200, 210, 210);
              if (cardNumber === 16) {
                ctx.clearRect((5 + i * 200), (5 + j * 200), 200, 200);
                break;
              };
              ctx.drawImage(bg, (5 + j * 200), (5 + i * 200));
              ctx.fillText(`${cardNumber}`, 65 - dx + 200 * j, 150 + 200 * i);
              cardNumber++;
  
            }

            
          }
        }
      }
      
  }, []);

  return (
      <canvas ref = {ref} width={825} height={825} />
  );
}