'use client'
import { useSidebar } from '@/store/use-sidebar'
import { RecommdationService } from '@/types'
import UserItem, { UserItemSkeleton } from './UserItem'

export default function RecommenedUsers({ data }: RecommdationService) {
  const { collapsed } = useSidebar((state) => state)
  const showLabel = !collapsed && data.length > 0

  return (
    <div>
      {showLabel && (
        <div className=' pl-6 mb-4 '>
          <p className=' text-sm text-muted-foreground '>Recommended</p>
        </div>
      )}
      <ul className=' space-y-2 px-2 '>
        {data.map((d, index) => {
          return (
            <div key={index}>
              <UserItem
                key={d.id}
                username={d.username}
                imageUrl={d.imageUrl}
                isLive={false}
              />
            </div>
          )
        })}
      </ul>
    </div>
  )
}

export const RecommenedUserSkeleton = () => {
  return (
    <ul className=' px-2 '>
      {[...Array(3)].map((_, index) => {
        return (
          <div key={index}>
            <UserItemSkeleton key={index} />
          </div>
        )
      })}
    </ul>
  )
}
