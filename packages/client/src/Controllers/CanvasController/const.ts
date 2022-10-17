import { BoardValues, CanvasButton } from './types';
export const canvasInBorderSize = 480;
export const tileSize = 120;
export const tileBorder = 5;
export const btnPathIndent = 7
export const canvasBtnAngleRadius = 10
export const tileWithBorder = tileSize + tileBorder * 2;
export const gameFieldSize = 4;
export const dxText = 45;
export const dyText = 80;
export const dxTextOffset = 20;
export const fontStyle = "64px serif";
export const middleFontStyle = "32px serif"
export const smallFontStyle = "16px serif"
export const fillStyle = "#F5F5F5";
export const emptyCellValue = 0;
export const isTwoDigitNumber = (number: BoardValues): boolean => number > 9;

export const buttonRepeatGame: CanvasButton = {
  x: 50,
  y: 350,
  width: 170,
  height: 50,
  text: 'Начать сначала'
}

export const buttonLeaders: CanvasButton = {
  x: 260,
  y: 350,
  width: 170,
  height: 50,
  text: 'К таблице лидеров'
}

