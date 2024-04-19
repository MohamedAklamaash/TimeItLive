import StreamPlayer from '@/components/stream/StreamUser'
import { isblockedByUser } from '@/lib/block-service'
import { isFollowingUser } from '@/lib/follow-service'
import { getUserByName } from '@/lib/user-service'
import { UserPageProps } from '@/types'
import { notFound } from 'next/navigation'

export default async function UserPage({
  params: { username },
}: UserPageProps) {
  const user = await getUserByName(username)
  if (!user || !user.stream) {
    return notFound()
  }
  const isFollowing = await isFollowingUser(user.id)
  const isBlockedByUser = await isblockedByUser(user.id)
  if (isBlockedByUser) {
    return notFound()
  }

  return (
    <div
    className=' overflow-y-hidden '
    >
      <StreamPlayer
        user={user}
        isFollowing={isFollowing}
        stream={user.stream}
      />
    </div>
  )
}
