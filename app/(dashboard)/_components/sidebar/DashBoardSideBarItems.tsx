'use client'
import { Hint } from '@/components/hints'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useDashboardSidebar } from '@/store/use-dashboard-sidebar'
import { LucideIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
interface DashboardSideBarItems {
  icon: LucideIcon
  label: string
  href: string
  isActive: boolean
}
export default function DashBoardSideBarItems({
  icon: Icon,
  label,
  href,
  isActive,
}: DashboardSideBarItems) {
  const { collapsed } = useDashboardSidebar((state) => state)
  return (
    <Button
      asChild
      variant='ghost'
      className={cn(
        ' w-full h-12',
        collapsed ? 'justify-center' : 'justify-start',
        isActive && 'bg-accent',
      )}
    >
      <Link prefetch href={href}>
        <div className=' w-full flex items-center gap-x-5 '>
          {!collapsed && <Icon />}
          <h1 className={cn('text-sm', collapsed && 'hidden')}>{label}</h1>

          {collapsed && (
            <Hint label={label} side="right">
              <Icon />
            </Hint>
          )}
        </div>
      </Link>
    </Button>
  )
}
