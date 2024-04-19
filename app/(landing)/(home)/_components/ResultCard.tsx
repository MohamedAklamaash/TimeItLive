import { Stream, User } from '@prisma/client'
import Link from 'next/link'
import React from 'react'
import Thumbnail, { ThumbnailSkeleton } from './Thumbnail'
import LiveBadge from '@/components/LiveBadge'
import UserAvatar, { UserAvatarSkeleton } from '@/components/UserAvatar'
import { Skeleton } from '@/components/ui/skeleton'

export default function ResultCard({
  data,
}: {
  data: Stream & { user: User }
}) {
  return (
    <Link href={`/${data.user.username}`}>
      <div className=' h-full w-full space-y-4 '>
        <Thumbnail
          src={data.thumbnailUrl as string}
          fallback={data.user.imageUrl}
          isLive={data.isLive}
          username={data.user.username}
        />
        
        <div className='flex gap-x-3 '>
          <UserAvatar
            username={data.user.username}
            imageUrl={data.user.imageUrl}
            isLive={data.isLive}
          />
          <div className='flex flex-col text-sm overflow-hidden'>
            <p className='truncate font-semibold hover:text-blue-500'>
              {data.name}
            </p>
            <p className='text-muted-foreground'>{data.user.username}</p>
          </div>
        </div>
      </div>
    </Link>
  )
}

export const ResultCardSkeleton = () => {
    return (
      <div className="h-full w-full space-y-4">
        <ThumbnailSkeleton />
        <div className="flex gap-x-3">
          <UserAvatarSkeleton />
          <div className="flex flex-col gap-y-1">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-24" />
          </div>
        </div>
      </div>
    );
  };