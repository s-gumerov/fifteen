import { BoardValues } from './types';

export const tileSize = 120;
export const tileBorder = 5;
export const tileWithBorder = tileSize + tileBorder * 2;
export const gameFieldSize = 4;
export const dxText = 45;
export const dyText = 80;
export const dxTextOffset = 20;
export const fontStyle = "64px serif";
export const fillStyle = "#F5F5F5";
export const emptyCellValue = 0;
export const isTwoDigitNumber = (number: BoardValues): boolean => number > 9;