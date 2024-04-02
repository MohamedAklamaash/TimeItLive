import { Participant, Track } from 'livekit-client'
import { useRef, useState, useEffect } from 'react'
import { useTracks } from '@livekit/components-react'
import FullScreenControl from './FullScreenControl'
import VolumeControl from './volumeControl'

export default function LiveClient({
  participant,
}: {
  participant: Participant
}) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isFullScreen, setisFullScreen] = useState<boolean>(false)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [volume, setvolume] = useState<number>(0)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'f' || e.key === 'F') {
        toggleFullScreen()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  

  useTracks([Track.Source.Camera, Track.Source.Microphone])
    .filter((track) => track.participant.identity === participant.identity)
    .forEach((track) => {
      if (videoRef.current) {
        track.publication.track?.attach(videoRef.current)
      }
    })

  const toggleFullScreen = () => {
    if (isFullScreen) {
      document.exitFullscreen()
      setisFullScreen(false)
    } else if (wrapperRef.current) {
      wrapperRef.current.requestFullscreen()
      setisFullScreen(true)
    }
  }

  const onVolumeChange = (val: number) => {
    setvolume(+val)
    if (videoRef.current) {
      videoRef.current.muted = val === 0
      videoRef.current.volume = +val * 0.01
    }
  }

  const toggleMute = () => {
    const isMuted = volume === 0
    setvolume(isMuted ? 50 : 0)
    if(videoRef.current){
        videoRef.current.muted = !isMuted
        videoRef.current.volume = isMuted ? 0.5 : 0
    }
  }

  useEffect(()=>{
    setvolume(0)
  },[])

  return (
    <div ref={wrapperRef} className='relative h-full flex'>
      <video
        onKeyDown={(e) => {
          if (e.key === 'f' || e.key === 'F') {
            toggleFullScreen()
          }
        }}
        ref={videoRef}
        width='100%'
      />
      <div className='absolute top-0 h-full w-full opacity-0 hover:opacity-100 hover:transition-all'>
        <div className='absolute bottom-0 flex h-14 w-full items-center justify-between bg-gradient-to-r from-neutral-900'>
          <VolumeControl onChange={onVolumeChange} value={0} onToggle={toggleMute} />
          <FullScreenControl
            isFullScreen={isFullScreen}
            onToggle={toggleFullScreen}
          />
        </div>
      </div>
    </div>
  )
}
