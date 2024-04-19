'use client'

import VerifiedMark from '../VerifiedMark'
import BioModal from './BioModal'

export default function AboutCard({
  hostIdentity,
  hostName,
  viewerIdentity,
  bio,
  followedByCount,
}: {
  hostName: string
  hostIdentity: string
  viewerIdentity: string
  bio: string
  followedByCount: number
}) {
  const hostAsViewer = `host-${hostIdentity}`
  const isHost = viewerIdentity === hostAsViewer
  const followedByLabel = followedByCount === 1 ? 'Follower' : 'Followers'
  return (
    <div className=' px-4 '>
      <div className=' group rounded-xl bg-background p-6 lg:p-10 flex flex-col gap-y-3 '>
        <div className=' flex items-center justify-between '>
          <div className=' flex items-center gap-x-2 font-semibold text-lg lg:text-2xl '>
            About {hostName}
            <VerifiedMark />
          </div>
          {isHost && <BioModal bio={bio} />}
        </div>
        <div className=' text-sm text-muted-foreground '>
          <span className=' font-semibold text-primary '>
            {' '}
            {followedByCount}{' '}
          </span>{' '}
          {followedByLabel}
        </div>
        <p className=' text-sm '>
          {bio || 'This User has No bio about them.Seems Scary '}
        </p>
      </div>
    </div>
  )
}
