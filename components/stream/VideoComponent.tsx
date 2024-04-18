'use client'
import { VideoComponentProps } from '@/types'
import React from 'react'
import { ConnectionState, Track } from 'livekit-client'
import {
  useConnectionState,
  useRemoteParticipant,
  useTracks,
} from '@livekit/components-react'
import OfflineVideo from './OfflineVideo'
import LoadingVideo from './LoadingVideo'
import LiveClient from './LiveClient'
import { Skeleton } from '../ui/skeleton'
export default function VideoComponent({
  hostIdentity,
  hostName,
}: VideoComponentProps) {
  const connectionState = useConnectionState()
  const participant = useRemoteParticipant(hostIdentity as string)
  const tracks = useTracks([
    Track.Source.Camera,
    Track.Source.Microphone,
  ]).filter((track) => track.participant.identity === hostIdentity)
  let content
  if (!participant && connectionState === ConnectionState.Connected) {
    content = <OfflineVideo username={hostName as string} />
  } else if (!participant || tracks.length === 0) {
    content = <LoadingVideo label='Loading' />
  } else {
    content = <LiveClient participant={participant} />
  }
  return <div className=' aspect-video border-b group relative '>{content}</div>
}

export const VideoComponentSkeleton = ()=>{
  return(
    <div
    className=' aspect-video border-x border-background '
    >
      <Skeleton className=' h-full w-full rounded-none ' />
    </div>
  )
}