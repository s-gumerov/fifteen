// Отрисовка игрового поля
const drawField = (ctx: CanvasRenderingContext2D, board: number[][], bg: HTMLImageElement): void => {
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      let dx = 0;
      if (board && board[i][j] > 9) {
        dx= 20;
      } else {
        dx = 0;
      };
      if (ctx) {
        ctx.font = "64px serif";
        ctx.fillStyle = '#F5F5F5';
        ctx.fillRect(j * 120, i * 120, 130, 130);
        if (board && board[i][j] === 0) {
          ctx.clearRect((5 + j * 120), (5 + i * 120), 120, 120);
        } else {
          ctx.drawImage(bg, (5 + j * 120), (5 + i * 120));
          ctx.fillText(`${board[i][j]}`, 45 - dx + 120 * j, 80 + 120 * i);
        }
      }
    }
  } 
};

// Получаем позицию пустой ячейки
const getEmptyCell = (board: number[][]): {xEmptyCell: number, yEmptyCell: number} | undefined => {
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
const mixBoard = (board: number[]): number[][] | undefined => {
  board.sort(() => Math.random() - 0.5);
  const newBoard = [];
  for (let i = 0; i < 4; i++) {
    const subArray = []
    for(let j = i * 4 + 0; j < (i + 1) * 4; j++) {
      subArray.push(board[j]);
    }
    newBoard.push(subArray);
  }
  return newBoard;
};

// Проверка победы
const isWin = (board: number[][]): boolean => {
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
const movePuzzleItem = (board: number[][], yMouse: number, xMouse: number): {board: number[][], stepsIsDone: boolean} => {
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
const turnGameStep = (e: MouseEvent, ctx: CanvasRenderingContext2D, board: number[][], bg: HTMLImageElement) => {
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

export { drawField, mixBoard, turnGameStep };