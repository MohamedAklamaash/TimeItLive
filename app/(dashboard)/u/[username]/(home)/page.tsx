import StreamPlayer from '@/components/stream/StreamUser'
import { getUserByName } from '@/lib/user-service'
import { UserPageProps } from '@/types'
import { currentUser } from '@clerk/nextjs'
import React, { use } from 'react'

async function CreatorPage({ params: { username } }: UserPageProps) {
  const user = await getUserByName(username)
  const externalUser = await currentUser()
  if (!user || externalUser?.id !== user?.externalUserid || !user.stream) {
    throw new Error('Unauthorized access')
  }
  return (
    <div className=' h-full '>
      <StreamPlayer user={user} stream={user.stream} isFollowing={true} />
    </div>
  )
}

export default CreatorPage
