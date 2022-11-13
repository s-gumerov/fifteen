"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buttonLeaders = exports.buttonRepeatGame = exports.isTwoDigitNumber = exports.emptyCellValue = exports.fillStyle = exports.smallFontStyle = exports.middleFontStyle = exports.fontStyle = exports.dxTextOffset = exports.dyText = exports.dxText = exports.gameFieldSize = exports.tileWithBorder = exports.canvasBtnAngleRadius = exports.btnPathIndent = exports.tileBorder = exports.tileSize = exports.canvasInBorderSize = void 0;
exports.canvasInBorderSize = 480;
exports.tileSize = 120;
exports.tileBorder = 5;
exports.btnPathIndent = 7;
exports.canvasBtnAngleRadius = 10;
exports.tileWithBorder = exports.tileSize + exports.tileBorder * 2;
exports.gameFieldSize = 4;
exports.dxText = 45;
exports.dyText = 80;
exports.dxTextOffset = 20;
exports.fontStyle = "64px serif";
exports.middleFontStyle = "32px serif";
exports.smallFontStyle = "16px serif";
exports.fillStyle = "#F5F5F5";
exports.emptyCellValue = 0;
const isTwoDigitNumber = (number) => number > 9;
exports.isTwoDigitNumber = isTwoDigitNumber;
exports.buttonRepeatGame = {
    x: 50,
    y: 350,
    width: 170,
    height: 50,
    text: 'Начать сначала'
};
exports.buttonLeaders = {
    x: 260,
    y: 350,
    width: 170,
    height: 50,
    text: 'К таблице лидеров'
};
