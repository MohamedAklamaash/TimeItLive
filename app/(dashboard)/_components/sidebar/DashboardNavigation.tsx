'use client'
import { useUser } from '@clerk/nextjs'
import { usePathname } from 'next/navigation'
import { Fullscreen, KeyRound, MessageSquare, Users } from 'lucide-react'
import DashBoardSideBarItems from './DashBoardSideBarItems'
import { Skeleton } from '@/components/ui/skeleton'
export default function DashboardNavigation() {
  const pathname = usePathname()
  const { user } = useUser()
  const routes = [
    {
      label: 'stream',
      href: `/u/${user?.username}`,
      icon: Fullscreen,
    },
    {
      label: 'Keys',
      href: `/u/${user?.username}/keys`,
      icon: KeyRound,
    },
    {
      label: 'Chat',
      href: `/u/${user?.username}/chat`,
      icon: MessageSquare,
    },
    {
      label: 'Community',
      href: `/u/${user?.username}/community`,
      icon: Users,
    },
  ]

  if (!user?.username) {
    return (
      <ul className=' space-y-2 '>
        {[
          Array(4).map((_, index) => {
            return <DashBoardSideBarItemsSkeleton key={index} />
          }),
        ]}
      </ul>
    )
  }

  return (
    <ul className=' py-4 '>
      {routes.map((route, index) => {
        return (
          <li key={index} className=' py-4 '>
            <DashBoardSideBarItems
              key={route.href}
              label={route.label}
              icon={route.icon}
              href={route.href}
              isActive={pathname === route.href}
            />
          </li>
        )
      })}
    </ul>
  )
}

export const DashBoardSideBarItemsSkeleton = () => {
  return (
    <li className=' flex items-center gap-x-4 px-3 py-2 '>
      <Skeleton className=' min-h-[48px] min-w-[48px] rounded-md ' />
      <div className=' flex-1 hidden lg:block '>
        <Skeleton className='h-6' />
      </div>
    </li>
  )
}
