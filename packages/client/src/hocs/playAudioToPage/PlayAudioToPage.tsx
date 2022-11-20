import React from 'react';

export function withPlayingAudio(
    WrappedComponent: React.ComponentType,
    audioUrl: string
) {
    class PlayAudioComponent extends React.Component {
        private audio = typeof window !== 'undefined' ? new Audio(audioUrl) : null

        private playAudio() {
            if (this.audio) {
                this.audio.addEventListener('canplaythrough', event => {
                    /* воспроизвести если аудио может быть воспроизведено (загружено) и если позволяют разрешения */
                    this.audio && this.audio.play()
                    this.repeatPlay()
                })
            }
        }

        private repeatPlay() {
            if (this.audio) {
                this.audio.addEventListener('ended', event => {
                    this.audio && this.audio.play()
                    this.repeatPlay()
                })
            }
        }

        public componentWillUnmount() {
            this.audio && this.audio.pause()
        }

        public render() {
            this.playAudio()
            return <WrappedComponent/>
        }
    }

    return PlayAudioComponent
}
