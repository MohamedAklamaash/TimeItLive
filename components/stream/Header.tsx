'use client'

import { hostname } from 'os'
import UserAvatar, { UserAvatarSkeleton } from '../UserAvatar'
import VerifiedMark from '../VerifiedMark'
import {
  useParticipants,
  useRemoteParticipant,
} from '@livekit/components-react'
import { UserIcon } from 'lucide-react'
import Actions from './Actions'
import { Skeleton } from '../ui/skeleton'

export default function Header({
  hostIdentity,
  hostName,
  viewerIdentity,
  imageUrl,
  isFollowing,
  name,
}: {
  hostName: string
  hostIdentity: string
  viewerIdentity: string
  imageUrl: string
  isFollowing: boolean
  name: string
}) {
  const participants = useParticipants()
  const participant = useRemoteParticipant(hostIdentity)
  const isLive = !!participant
  const participantCount = participants.length - 1
  const hostAsViewer = `host-${hostIdentity}`
  const isHost = hostName === hostAsViewer
  return (
    <div className=' flex flex-col lg:flex-row gap-y-4 lg:gap-y-0 items-start justify-between px-4 '>
      <div className=' flex items-center gap-x-3  '>
        <UserAvatar
          username={hostName}
          size='lg'
          isLive={isLive}
          imageUrl={imageUrl}
          showBadge
        />
        <div className='space-y-1  '>
          <div className='flex items-center gap-x-2'>
            <h2 className=' text-lg font-semibold '>{hostName}</h2>
            <VerifiedMark />
          </div>
          <p className=' text-sm font-semibold '>{name}</p>
          {isLive ? (
            <div className=' flex gap-x-1 font-semibold items-center text-xs text-rose-500 '>
              <UserIcon className=' h-4 w-4 ' />
              <p>
                {participantCount}{' '}
                {participantCount <= 1 ? 'viewer' : 'viewers'}{' '}
              </p>
            </div>
          ) : (
            <p className=' font-semibold text-xs text-muted-foreground '>
              Offline
            </p>
          )}
        </div>
      </div>
      <Actions
        hostIdentity={hostIdentity}
        isHost={isHost}
        isFollowing={isFollowing}
      />
    </div>
  )
}

export const HeaderSkeleton = () => {
  return (
    <div className=' flex flex-col lg:flex-row gap-y-4 lg:gap-y-0 items-start justify-between px-4 '>
      <div className='flex items-center gap-x-2 '>
        <UserAvatarSkeleton size='lg' />
        <div className='space-y-2'>
          <Skeleton className=' h-6 w-32 ' />
          <Skeleton className=' h-6 w-32 ' />
        </div>
      </div>{' '}
      <Skeleton className=' h-10 w-full lg:w-24 ' />
    </div>
  )
}
