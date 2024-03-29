'use client'
import React from 'react'
import { cn } from '@/lib/utils'
import { Wrapper } from '@/types'
import { useDashboardSidebar } from '@/store/use-dashboard-sidebar'
export default function DashboardWrapper({ children }: Wrapper) {
  const { collapsed } = useDashboardSidebar((state) => state)

  return (
    <aside
      className={cn(
        ' fixed w-60  border-r border-[#2D2E35] z-50 left-0 h-screen flex flex-col bg-background ',
        collapsed && 'w-[70px]',
      )}
    >
      {children}
    </aside>
  )
}
