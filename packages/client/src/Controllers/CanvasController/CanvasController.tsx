import {
  gameFieldSize,
  dxText,
  dyText,
  tileBorder,
  tileSize,
  tileWithBorder,
  dxTextOffset,
  fontStyle,
  fillStyle,
  emptyCellValue,
  isTwoDigitNumber,
  canvasInBorderSize,
  buttonRepeatGame,
  buttonLeaders,
} from './const'
import { BoardValues, CanvasButton, TBoard } from './types';
import img from '../../assets/bgPuzzle.svg';
import {getRatingResult} from "../../utils";
import {tempUsers} from "../../pages";

export class CanvasController {
  getEmptyCell(board: TBoard): { xEmptyCell: number, yEmptyCell: number } | undefined {
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
  }

  getBackgroundPuzzle(): HTMLImageElement {
    const backgroundPuzzle = new Image();
    backgroundPuzzle.src = img;
    return backgroundPuzzle;
  }

  mixBoard(): TBoard {
    const board: BoardValues[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0];
    board.sort(() => Math.random() - 0.5);
    const generatedBoard = [];
    for (let i = 0; i < gameFieldSize; i++) {
      const subArray = []
      for(let j = i * gameFieldSize; j < (i + 1) * gameFieldSize; j++) {
        subArray.push(board[j]);
      }
      generatedBoard.push(subArray);
    }
    if(this.isWin(generatedBoard as TBoard)) return this.mixBoard();
    else return generatedBoard as TBoard;
  }

  drawField(fieldRef: React.RefObject<HTMLCanvasElement>, board: TBoard, backgroundPuzzle: HTMLImageElement): void {
    const canvas = fieldRef.current;
    const ctx = canvas?.getContext("2d") as CanvasRenderingContext2D;

    for (let i = 0; i < gameFieldSize; i++) {
      for (let j = 0; j < gameFieldSize; j++) {
        const dx = isTwoDigitNumber(board[i][j]) ? dxTextOffset : 0;
        ctx.font = fontStyle;
        ctx.fillStyle = fillStyle;
        ctx!.textAlign = 'start'
        ctx.textBaseline = 'alphabetic'
        ctx.fillRect(j * tileSize, i * tileSize, tileWithBorder, tileWithBorder);
        if (board[i][j] === emptyCellValue) {
          ctx.clearRect((tileBorder + j * tileSize), (tileBorder + i * tileSize), tileSize, tileSize);
        } else {
          ctx.drawImage(backgroundPuzzle, (tileBorder + j * tileSize), (tileBorder + i * tileSize));
          ctx.fillText(`${board[i][j]}`, dxText - dx + tileSize * j, dyText + tileSize * i);
        }
      }
    }
  }

  getBoardAfterClick(event: React.MouseEvent, board: TBoard): TBoard {
    const yMouse = (event.pageX - (event.target as HTMLCanvasElement).offsetLeft) / tileSize | 0;
    const xMouse = (event.pageY - (event.target as HTMLCanvasElement).offsetTop)  / tileSize | 0;

    const emptyCell = this.getEmptyCell(board);
    if (emptyCell) {
      const {xEmptyCell, yEmptyCell} = emptyCell;
      if (xEmptyCell === xMouse && (yEmptyCell === yMouse - 1 || yEmptyCell === yMouse + 1)) {
        board[xEmptyCell][yEmptyCell] = board[xMouse][yMouse];
        board[xMouse][yMouse] = emptyCellValue;
      }
      if (yEmptyCell === yMouse && (xEmptyCell === xMouse - 1 || xEmptyCell === xMouse + 1)) {
        board[xEmptyCell][yEmptyCell] = board[xMouse][yMouse];
        board[xMouse][yMouse] = emptyCellValue;
      }
    }
    return board;
  }

  isWin(board: TBoard): boolean {
    const winBoard = [
      [1, 2, 3, 4],
      [5, 6, 7, 8],
      [9, 10, 11, 12],
      [13, 14, 15, 0]
    ];

    for (let i = 0; i < gameFieldSize; i++) {
      for (let j = 0; j < gameFieldSize; j++) {
        if (board[i][j] != winBoard[i][j]) {
          return false;
        }
      }
    }
    return true;
  }

  isInsideButton = (pos: any, rect: any) => {
    return pos.x > rect.x && pos.x < rect.x+rect.width && pos.y < rect.y + rect.height && pos.y > rect.y
  }

  getMousePos = (canvas: HTMLCanvasElement, event: React.MouseEvent) => {
    const rect = canvas.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    }
  }

  drawButton = (ctx:CanvasRenderingContext2D, btnName: CanvasButton, color: string) => {
    ctx.fillStyle = color
    ctx.strokeStyle = '#F5F5F5'
    ctx.beginPath();
    ctx.moveTo(btnName.x + btnName.width - 7, btnName.y + btnName.height)
    ctx.arcTo(btnName.x, btnName.y + btnName.height, btnName.x, btnName.y, 10);
    ctx.arcTo(btnName.x, btnName.y, btnName.width + btnName.x, btnName.y, 10);
    ctx.arcTo(btnName.width + btnName.x, btnName.y, btnName.x + btnName.width, btnName.y + btnName.height, 10);
    ctx.arcTo(btnName.width + btnName.x, btnName.y + btnName.height, btnName.x, btnName.y + btnName.height, 10);
    ctx.lineWidth = 4
    ctx.stroke()
    ctx.fill()
    ctx.font = "16px serif";
    ctx.fillStyle = '#F5F5F5';
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(btnName.text, (btnName.x + btnName.width + btnName.x)/2, (btnName.y + btnName.y + btnName.height)/2)
  }

  buttonRepeatClick = (fieldRef: React.RefObject<HTMLCanvasElement>, board: TBoard, backgroundPuzzle: HTMLImageElement) => {
    const canvas = fieldRef.current;
    const ctx = canvas?.getContext("2d") as CanvasRenderingContext2D;
    ctx.clearRect(tileBorder, tileBorder, (tileSize * gameFieldSize), (tileSize * gameFieldSize));
    this.drawField(fieldRef, this.mixBoard(), backgroundPuzzle);
  }

  canvasIsWinDraw = (fieldRef: React.RefObject<HTMLCanvasElement>) => {
    const ctx = fieldRef.current?.getContext("2d") as CanvasRenderingContext2D;
    ctx!.clearRect(tileBorder, tileBorder, (tileSize * gameFieldSize), (tileSize * gameFieldSize));
    ctx!.font = "64px serif";
    ctx!.fillStyle = '#F5F5F5';
    ctx!.textAlign = 'center'
    ctx!.fillText(`Вы победили!`, canvasInBorderSize / 2, canvasInBorderSize / 4);
    ctx!.font = "32px serif";
    ctx!.fillText(`Ваша позиция в рейтинге - ${getRatingResult(tempUsers)}`, canvasInBorderSize / 2, canvasInBorderSize / 2);
    this.drawButton(ctx!, buttonRepeatGame, '#1976d2')
    this.drawButton(ctx!, buttonLeaders, 'green')
  }


  init(fieldRef: React.RefObject<HTMLCanvasElement>, board: TBoard, backgroundPuzzle: HTMLImageElement): void {
    backgroundPuzzle.addEventListener('load', () => {
      this.drawField(fieldRef, board, backgroundPuzzle);
    })
  }
}
