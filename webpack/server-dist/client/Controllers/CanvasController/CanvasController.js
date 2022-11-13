"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CanvasController = void 0;
const const_1 = require("./const");
const utils_1 = require("../../utils");
const img = require('../../assets/bgPuzzle.svg');
class CanvasController {
    constructor() {
        this.isInsideButton = (pos, rect) => {
            return pos.x > rect.x && pos.x < rect.x + rect.width && pos.y < rect.y + rect.height && pos.y > rect.y;
        };
        this.getMousePos = (canvas, event) => {
            const rect = canvas.getBoundingClientRect();
            return {
                x: event.clientX - rect.left,
                y: event.clientY - rect.top
            };
        };
        this.drawButton = (ctx, btnName, color) => {
            ctx.fillStyle = color;
            ctx.strokeStyle = const_1.fillStyle;
            ctx.beginPath();
            ctx.moveTo(btnName.x + btnName.width - const_1.btnPathIndent, btnName.y + btnName.height);
            ctx.arcTo(btnName.x, btnName.y + btnName.height, btnName.x, btnName.y, const_1.canvasBtnAngleRadius);
            ctx.arcTo(btnName.x, btnName.y, btnName.width + btnName.x, btnName.y, const_1.canvasBtnAngleRadius);
            ctx.arcTo(btnName.width + btnName.x, btnName.y, btnName.x + btnName.width, btnName.y + btnName.height, const_1.canvasBtnAngleRadius);
            ctx.arcTo(btnName.width + btnName.x, btnName.y + btnName.height, btnName.x, btnName.y + btnName.height, const_1.canvasBtnAngleRadius);
            ctx.lineWidth = const_1.gameFieldSize;
            ctx.stroke();
            ctx.fill();
            ctx.font = const_1.smallFontStyle;
            ctx.fillStyle = const_1.fillStyle;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(btnName.text, (btnName.x + btnName.width + btnName.x) / 2, (btnName.y + btnName.y + btnName.height) / 2);
        };
        this.buttonRepeatClick = (fieldRef, board, backgroundPuzzle) => {
            const canvas = fieldRef.current;
            const ctx = canvas === null || canvas === void 0 ? void 0 : canvas.getContext("2d");
            ctx.clearRect(const_1.tileBorder, const_1.tileBorder, (const_1.tileSize * const_1.gameFieldSize), (const_1.tileSize * const_1.gameFieldSize));
            this.drawField(fieldRef, this.mixBoard(), backgroundPuzzle);
        };
        this.canvasIsWinDraw = (fieldRef, userId, leaderboard) => {
            const canvas = fieldRef.current;
            const ctx = canvas === null || canvas === void 0 ? void 0 : canvas.getContext("2d");
            ctx.clearRect(const_1.tileBorder, const_1.tileBorder, (const_1.tileSize * const_1.gameFieldSize), (const_1.tileSize * const_1.gameFieldSize));
            ctx.font = const_1.fontStyle;
            ctx.fillStyle = const_1.fillStyle;
            ctx.textAlign = 'center';
            ctx.fillText(`Вы победили!`, const_1.canvasInBorderSize / 2, const_1.canvasInBorderSize / 4);
            ctx.font = const_1.middleFontStyle;
            userId ? ctx.fillText(`Ваша позиция в рейтинге -  ${(0, utils_1.getRatingResult)(userId, leaderboard)}`, const_1.canvasInBorderSize / 2, const_1.canvasInBorderSize / 2)
                : null;
            this.drawButton(ctx, const_1.buttonRepeatGame, '#1976d2');
            this.drawButton(ctx, const_1.buttonLeaders, 'green');
        };
    }
    getEmptyCell(board) {
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
    getBackgroundPuzzle() {
        const backgroundPuzzle = new Image();
        backgroundPuzzle.src = img;
        return backgroundPuzzle;
    }
    isSolvable(arr, emptyCellIndex = arr.indexOf(0)) {
        const holeRow = Math.ceil((emptyCellIndex + 1) / 4);
        let k = 0;
        arr.forEach((value, index) => {
            if (value !== 0) {
                for (let i = index + 1; i < arr.length; i++) {
                    if (arr[i] < value && arr[i] !== 0) {
                        k++;
                    }
                }
            }
        });
        return !((k + holeRow) % 2);
    }
    mixBoard() {
        const board = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0];
        do {
            board.sort(() => Math.random() - 0.5);
        } while (!this.isSolvable(board));
        const generatedBoard = [];
        for (let i = 0; i < const_1.gameFieldSize; i++) {
            const subArray = [];
            for (let j = i * const_1.gameFieldSize; j < (i + 1) * const_1.gameFieldSize; j++) {
                subArray.push(board[j]);
            }
            generatedBoard.push(subArray);
        }
        if (this.isWin(generatedBoard))
            return this.mixBoard();
        else
            return generatedBoard;
    }
    drawField(fieldRef, board, backgroundPuzzle) {
        const canvas = fieldRef.current;
        const ctx = canvas.getContext("2d");
        for (let i = 0; i < const_1.gameFieldSize; i++) {
            for (let j = 0; j < const_1.gameFieldSize; j++) {
                const dx = (0, const_1.isTwoDigitNumber)(board[i][j]) ? const_1.dxTextOffset : 0;
                ctx.font = const_1.fontStyle;
                ctx.fillStyle = const_1.fillStyle;
                ctx.textAlign = 'start';
                ctx.textBaseline = 'alphabetic';
                ctx.fillRect(j * const_1.tileSize, i * const_1.tileSize, const_1.tileWithBorder, const_1.tileWithBorder);
                if (board[i][j] === const_1.emptyCellValue) {
                    ctx.clearRect((const_1.tileBorder + j * const_1.tileSize), (const_1.tileBorder + i * const_1.tileSize), const_1.tileSize, const_1.tileSize);
                }
                else {
                    ctx.drawImage(backgroundPuzzle, (const_1.tileBorder + j * const_1.tileSize), (const_1.tileBorder + i * const_1.tileSize));
                    ctx.fillText(`${board[i][j]}`, const_1.dxText - dx + const_1.tileSize * j, const_1.dyText + const_1.tileSize * i);
                }
            }
        }
    }
    getBoardAfterClick(event, board) {
        const yMouse = (event.pageX - event.target.offsetLeft) / const_1.tileSize | 0;
        const xMouse = (event.pageY - event.target.offsetTop) / const_1.tileSize | 0;
        const emptyCell = this.getEmptyCell(board);
        if (emptyCell) {
            const { xEmptyCell, yEmptyCell } = emptyCell;
            if (xEmptyCell === xMouse && (yEmptyCell === yMouse - 1 || yEmptyCell === yMouse + 1)) {
                board[xEmptyCell][yEmptyCell] = board[xMouse][yMouse];
                board[xMouse][yMouse] = const_1.emptyCellValue;
            }
            if (yEmptyCell === yMouse && (xEmptyCell === xMouse - 1 || xEmptyCell === xMouse + 1)) {
                board[xEmptyCell][yEmptyCell] = board[xMouse][yMouse];
                board[xMouse][yMouse] = const_1.emptyCellValue;
            }
        }
        return board;
    }
    isWin(board) {
        const winBoard = [
            [1, 2, 3, 4],
            [5, 6, 7, 8],
            [9, 10, 11, 12],
            [13, 14, 15, 0]
        ];
        for (let i = 0; i < const_1.gameFieldSize; i++) {
            for (let j = 0; j < const_1.gameFieldSize; j++) {
                if (board[i][j] != winBoard[i][j]) {
                    return false;
                }
            }
        }
        return true;
    }
    init(fieldRef, board, backgroundPuzzle) {
        backgroundPuzzle.addEventListener('load', () => {
            this.drawField(fieldRef, board, backgroundPuzzle);
        });
    }
}
exports.CanvasController = CanvasController;
