import { isFollowingUser } from '@/lib/follow-service'
import { getUserByName } from '@/lib/user-service'
import { UserPageProps } from '@/types'
import { notFound } from 'next/navigation'
import React from 'react'
import { FollowAction } from './_components/Followactions'
import { isblockedByUser } from '@/lib/block-service'

export default async function UserPage({
  params: { username },
}: UserPageProps) {
  const user = await getUserByName(username)
  if (!user) {
    notFound()
  }
  const isfollowingUser = await isFollowingUser(user.id)
  const isBlockedByUser = await isblockedByUser(user.id)

  return (
    <div>
      <p>User:{user?.id}</p>
      <p>{JSON.stringify(isfollowingUser)}</p>
      <FollowAction
        userId={user.id}
        isBlocked={isBlockedByUser}
        isFollowing={isfollowingUser}
      />
    </div>
  )
}
