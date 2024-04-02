'use client'
import { useViewerToken } from '@/hooks/use-viewer-token'
import { StreamPlayerProps } from '@/types'
import React from 'react'
import { LiveKitRoom } from '@livekit/components-react'
import VideoComponent from './VideoComponent'
export default function StreamPlayer({
  user,
  stream,
  isFollowing,
}: StreamPlayerProps) {
  const { token, name, identity } = useViewerToken(user?.id as string)
  console.log(identity)

  if (!token || !name || !identity) {
    return (
      <div>
        <h1>Cannot Watch the div</h1>
      </div>
    )
  }
  return (
    <>
      <LiveKitRoom
        token={token}
        serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_WS_URL}
        className=' grid grid-cols-1 lg:gap-y-0 lg:grid-cols-3 2xl:grid-cols-6 h-full '
      >
        <div className=' space-y-4 col-span-1 lg:col-span-2 2xl:col-span-5 lg:overflow-y-auto hidden-scrollbar pb-10 '>
          <VideoComponent hostIdentity={user?.id} hostName={user?.username} />
        </div>
      </LiveKitRoom>
    </>
  )
}
