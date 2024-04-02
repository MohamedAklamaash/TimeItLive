'use client'
import { useSidebar } from '@/store/use-sidebar'
import { Follow, User } from '@prisma/client'
import UserItem, { UserItemSkeleton } from './UserItem'

interface FollowingProps {
  data: (Follow & { following: User & { stream: {isLive:boolean} | null } })[]
}

export default function Following({ data }: FollowingProps) {
  const { collapsed } = useSidebar((state) => state)
  if (!data?.length) {
    return null
  }

  return (
    <div>
      {!collapsed && (
        <div className=' pl-6 mb-4 '>
          <p className=' text-sm text-muted-foreground '>Following</p>
        </div>
      )}
      <ul>
        {data.map((d, index) => {
          return (
            <UserItem
              key={d.id}
              username={d.following.username}
              imageUrl={d.following.imageUrl}
              isLive={d.following.stream?.isLive}
            />
          )
        })}
      </ul>
    </div>
  )
}

export const FollowingSkeleton = () => {
  return (
    <ul>
      {[...Array(3)].map((_, index) => {
        return (
          <li key={index}>
            <UserItemSkeleton key={index} />
          </li>
        )
      })}
    </ul>
  )
}
