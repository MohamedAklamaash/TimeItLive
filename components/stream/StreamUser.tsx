'use client'
import { useViewerToken } from '@/hooks/use-viewer-token'
import { StreamPlayerProps } from '@/types'
import React from 'react'
import { LiveKitRoom } from '@livekit/components-react'
import VideoComponent, { VideoComponentSkeleton } from './VideoComponent'
import { useChatSidebar } from '@/store/user-chat-sidebar'
import { cn } from '@/lib/utils'
import ChatComponent, { ChatSkeleton } from './ChatComponent'
import ChatToggle from './ChatToggle'
import Header, { HeaderSkeleton } from './Header'
import InfoComponent from './InfoComponent'
import AboutCard from './AboutCard'
export default function StreamPlayer({
  user,
  stream,
  isFollowing,
}: StreamPlayerProps) {
  const { token, name, identity } = useViewerToken(user?.id as string)
  const { collapsed } = useChatSidebar((state) => state)
  if (!token || !name || !identity) {
    return (
      <>
        <StreamPlayerSkeleton />
      </>
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
          <Header
            hostIdentity={user?.id as string}
            hostName={user?.username as string}
            viewerIdentity={identity}
            imageUrl={user?.imageUrl as string}
            isFollowing={isFollowing}
            name={stream.name}
          />
          <InfoComponent
            hostIdentity={user?.id as string}
            viewerIdentity={identity}
            name={stream.name}
            thumbnailUrl={stream.thumbnailUrl as string}
          />
          <AboutCard 
          viewerIdentity={identity}
          hostIdentity={user?.id as string}
          hostName={user?.username as string}
          bio={user?.bio as string}
          followedByCount={0}
          />
        </div>
        <div className={cn(`col-span-1`, collapsed && 'hidden')}>
          <ChatComponent
            viewerName={name}
            hostName={user?.username as string}
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

export const StreamPlayerSkeleton = () => {
  return (
    <div className='grid grid-cols-1 lg:gap-y-0 lg:grid-cols-3 2xl:grid-cols-6 h-full '>
      <div className=' space-y-4 col-span-1 lg:col-span-2 2xl:col-span-5 lg:overflow-y-auto hidden-scrollbar pb-10  '>
        <VideoComponentSkeleton />
        <HeaderSkeleton />
      </div>
      <div className=' col-span-1 bg-background '>
        <ChatSkeleton />
      </div>
    </div>
  )
}
