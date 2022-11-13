"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.withPlayingAudio = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importDefault(require("react"));
function withPlayingAudio(WrappedComponent, audioUrl) {
    class PlayAudioComponent extends react_1.default.Component {
        constructor() {
            super(...arguments);
            this.audio = new Audio(audioUrl);
        }
        playAudio() {
            this.audio.addEventListener('canplaythrough', event => {
                /* воспроизвести если аудио может быть воспроизведено (загружено) и если позволяют разрешения */
                this.audio.play();
                this.repeatPlay();
            });
        }
        repeatPlay() {
            this.audio.addEventListener('ended', event => {
                this.audio.play();
                this.repeatPlay();
            });
        }
        componentWillUnmount() {
            this.audio.pause();
        }
        render() {
            this.playAudio();
            return (0, jsx_runtime_1.jsx)(WrappedComponent, {});
        }
    }
    return PlayAudioComponent;
}
exports.withPlayingAudio = withPlayingAudio;
