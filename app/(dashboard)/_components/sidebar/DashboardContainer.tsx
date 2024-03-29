'use client'

import { cn } from '@/lib/utils'
import { useDashboardSidebar } from '@/store/use-dashboard-sidebar'
import { Wrapper } from '@/types'
import { useEffect } from 'react'
import { useMediaQuery } from 'usehooks-ts'
export default function DashBoardContainer({ children }: Wrapper) {
  const { collapsed, onCollapse, onExpand } = useDashboardSidebar(
    (state) => state,
  )
  const matches = useMediaQuery('(max-width:1024px)')

  useEffect(() => {
    if (matches) {
      onCollapse()
    } else {
      onExpand()
    }
  }, [matches, onCollapse, onExpand])

  return (
    <div
      className={cn('flex-1', collapsed ? 'ml-[70px]' : ' ml-[70px] lg:ml-60 ')}
    >
      {children}
    </div>
  )
}
