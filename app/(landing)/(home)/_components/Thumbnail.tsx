import LiveBadge from '@/components/LiveBadge'
import UserAvatar from '@/components/UserAvatar'
import { Skeleton } from '@/components/ui/skeleton'
import Image from 'next/image'
import React from 'react'

export default function Thumbnail({
  src,
  fallback,
  isLive,
  username,
}: {
  src: string
  fallback: string
  isLive: boolean
  username: string
}) {
  let content
  if (!src) {
    content = (
      <div className=' bg-background flex flex-col items-center justify-center gap-y-4 h-full w-full transition-transform group-hover:translate-x-2 group-hover:-translate-y-1 rounded-md '>
        <UserAvatar
          size='lg'
          showBadge
          username={username}
          imageUrl={fallback}
          isLive={isLive}
        />
      </div>
    )
  } else {
    content = (
      <Image
        src={src as string}
        fill
        alt='Image'
        className=' object-cover transition-transform group-hover:translate-x-2 group-hover:-translate-y-2 rounded-md '
      />
    )
  }
  return (
    <div className=' group aspect-video relative rounded-md cursor-pointer '>
      <div className=' rounded-md absolute inset-0 bg-blue-600 hover:opacity-100 transition-opacity flex items-center justify-center   '>
        {content}
        {isLive && (
          <div className=' absolute top-2 left-2 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform '>
            <LiveBadge className={''} />
          </div>
        )}
      </div>
    </div>
  )
}

export const ThumbnailSkeleton = () => {
  return (
    <div className=' aspect-video group relative rounded-xl cursor-pointer '>
      <Skeleton className=' h-full w-full ' />
    </div>
  )
}
