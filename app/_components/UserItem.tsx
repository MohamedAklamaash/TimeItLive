import { UserItemProps } from '@/types'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { useSidebar } from '@/store/use-sidebar'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import UserAvatar from '../../components/UserAvatar'
import LiveBadge from '@/components/LiveBadge'

export default function UserItem({
  key,
  username,
  imageUrl,
  isLive,
}: UserItemProps) {
  const pathName = usePathname()
  const { collapsed } = useSidebar((state) => state)
  const href = `/${username}`
  const isActive = pathName === href
  return (
    <Button
      asChild
      variant='ghost'
      className={cn(
        ' w-full h-12',
        collapsed ? 'justify-center' : ' justify-start',
        isActive && 'bg-accent',
      )}
    >
      <Link prefetch href={href}>
        <div
          className={cn(
            ' flex items-center w-full gap-x-4 ',
            collapsed && 'justify-center',
          )}
        >
          <UserAvatar
            username={username}
            imageUrl={imageUrl}
            showBadge={true}
            isLive={isLive}
            size='default'
          />
          {!collapsed && <p className=' truncate'>{username}</p>}
          {!collapsed && isLive && <LiveBadge classname=' ml-auto ' />}
        </div>
      </Link>
    </Button>
  )
}

export const UserItemSkeleton = () => {
  return (
    <li className=' flex items-center gap-x-3 px-3 py-2 '>
      <Skeleton className=' min-h-[32px] min-w-[32px] rounded-full ' />
      <div className=' flex-1 '>
        <Skeleton className=' h-6 ' />
      </div>
    </li>
  )
}
