'use client'
import { useViewerToken } from '@/hooks/use-viewer-token'
import { StreamPlayerProps } from '@/types'
import React from 'react'
import {  LiveKitRoom } from '@livekit/components-react'
import VideoComponent from './VideoComponent'
import { useChatSidebar } from '@/store/user-chat-sidebar'
import { cn } from '@/lib/utils'
import ChatComponent from './ChatComponent'
import ChatToggle from './ChatToggle'
export default function StreamPlayer({
  user,
  stream,
  isFollowing,
}: StreamPlayerProps) {
  const { token, name, identity } = useViewerToken(user?.id as string)
  const { collapsed } = useChatSidebar((state) => state)
  if (!token || !name || !identity) {
    return (
      <div>
        <h1>Cannot Watch the Stream</h1>
      </div>
    )
  }
  return (
    <>
      {collapsed && (
        <div className=' hidden lg:block fixed top-[100px] right-2 '>
          <ChatToggle />
        </div>
      )}
      <LiveKitRoom
        token={token}
        serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_WS_URL}
        className={cn(
          ` grid grid-cols-1 lg:gap-y-0 lg:grid-cols-3 2xl:grid-cols-6 h-full `,
          collapsed && ' lg:grid-cols-2 ',
        )}
      >
        <div className=' space-y-4 col-span-1 lg:col-span-2 2xl:col-span-5 lg:overflow-y-auto hidden-scrollbar pb-10 '>
          <VideoComponent hostIdentity={user?.id} hostName={user?.username} />
        </div>
        <div className={cn(`col-span-1`, collapsed && 'hidden')}>
          <ChatComponent
            viewerName={name}
            hostName={user?.name as string}
            isFollowing={isFollowing}
            hostIdentity={user?.id as string}
            isChatEnabled={stream.isChatEnabled}
            isChatDelayed={stream.isChatDelayed}
            isChatFollowersOnly={stream.isChatFollowersOnly}
          />
        </div>
      </LiveKitRoom>
    </>
  )
}
