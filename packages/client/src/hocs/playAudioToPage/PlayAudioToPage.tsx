import React from 'react'

export function withPlayingAudio(
  WrappedComponent: React.ComponentType,
  audioUrl: string
) {
  class PlayAudioComponent extends React.Component {
    private audio = new Audio(audioUrl)

    private playAudio() {
      if (typeof window !== 'undefined') {
        this.audio.addEventListener('canplaythrough', event => {
          /* воспроизвести если аудио может быть воспроизведено (загружено) и если позволяют разрешения */
          this.audio.play()
          this.repeatPlay()
        })
      }

    }

    private repeatPlay() {
      if (typeof window !== 'undefined') {
        this.audio.addEventListener('ended', event => {
          this.audio.play()
          this.repeatPlay()
        })
      }

    }

    public componentWillUnmount() {
      this.audio.pause()
    }

    public render() {
      this.playAudio()
      return <WrappedComponent />
    }
  }

  return PlayAudioComponent
}
