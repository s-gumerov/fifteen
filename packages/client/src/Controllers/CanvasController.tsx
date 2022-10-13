import { Board } from "./types";
import { tileSize, tileWithBorder, tileBorder, gameFieldSize, dxText, dyText } from "../const";
import { useEffect, useState } from "react";
import img from '../assets/bgPuzzle.svg';

// Отрисовка игрового поля
const drawField = (ctx: CanvasRenderingContext2D, board: Board, bg: HTMLImageElement): void => {
  for (let i = 0; i < gameFieldSize; i++) {
    for (let j = 0; j < gameFieldSize; j++) {
      let dx = 0;
      if (board[i][j] > 9) {
        dx= 20;
      } else {
        dx = 0;
      };
      ctx.font = "64px serif";
      ctx.fillStyle = '#F5F5F5';
      ctx.fillRect(j * tileSize, i * tileSize, tileWithBorder, tileWithBorder);
      if (board && board[i][j] === 0) {
        ctx.clearRect((tileBorder + j * tileSize), (tileBorder + i * tileSize), tileSize, tileSize);
      } else {
        ctx.drawImage(bg, (tileBorder + j * tileSize), (tileBorder + i * tileSize));
        ctx.fillText(`${board[i][j]}`, dxText - dx + tileSize * j, dyText + tileSize * i);
      }
    }
  } 
};

// Получаем позицию пустой ячейки
const getEmptyCell = (board: Board): {xEmptyCell: number, yEmptyCell: number} | undefined => {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[j][i] === 0) {
        return {
          xEmptyCell: j,
          yEmptyCell: i
        };
      }
    }
  }
};

// Перемешиваем случайным образом пятнашки на поле
const board: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0];
const mixBoard = (): Board | undefined => {
  board.sort(() => Math.random() - 0.5);
  const newBoard = [];
  for (let i = 0; i < gameFieldSize; i++) {
    const subArray = []
    for(let j = i * gameFieldSize; j < (i + 1) * gameFieldSize; j++) {
      subArray.push(board[j]);
    }
    newBoard.push(subArray);
  }
  return newBoard;
};

// Проверка победы
const isWin = (board: Board): boolean => {
  const winBoard = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, 0]
  ];

  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (board[i][j] != winBoard[i][j]) {
        return false;
      }
    }
  }
  return true;
};

// Перемещаем пятнашку на пустое место
const movePuzzleItem = (board: Board, yMouse: number, xMouse: number): {board: Board, stepsIsDone: boolean} => {
  const emptyCell = getEmptyCell(board);
  let stepsIsDone = false;
  if (emptyCell) {
    const {xEmptyCell, yEmptyCell} = emptyCell; 
    if (xEmptyCell === xMouse && (yEmptyCell === yMouse - 1 || yEmptyCell === yMouse + 1)) {
      board[xEmptyCell][yEmptyCell] = board[xMouse][yMouse];
      board[xMouse][yMouse] = 0;
      stepsIsDone = true;
    };
    if (yEmptyCell === yMouse && (xEmptyCell === xMouse - 1 || xEmptyCell === xMouse + 1)) {
      board[xEmptyCell][yEmptyCell] = board[xMouse][yMouse];
      board[xMouse][yMouse] = 0;
      stepsIsDone = true;
    };
  };
  return {
    board: board,
    stepsIsDone: stepsIsDone
  };
};

// Действия по клику
const turnGameStep = (e: MouseEvent, ctx: CanvasRenderingContext2D, board: Board, bg: HTMLImageElement): boolean => {
  const x = (e.pageX - (e.target as HTMLCanvasElement).offsetLeft) / 120 | 0;
  const y = (e.pageY - (e.target as HTMLCanvasElement).offsetTop)  / 120 | 0;
  const newBoard = board && movePuzzleItem(board, x, y);
  board = newBoard.board;
  if (newBoard.stepsIsDone) {
    ctx && board && drawField(ctx, board, bg);
  }
  if (board && isWin(board)) {
    console.log('You win')
  }
  return newBoard.stepsIsDone;
};

const init = (ref: React.RefObject<HTMLCanvasElement>, refSteps: React.RefObject<HTMLDivElement>) => {
  const bg = new Image()
  const [board] = useState(mixBoard())
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
}

export { init }