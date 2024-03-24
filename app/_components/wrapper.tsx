'use client'
import { useSidebar } from '@/store/use-sidebar'
import React from 'react'
import { cn } from '@/lib/utils'
export default function wrapper({ children }: Wrapper) {
  const { collapsed } = useSidebar((state) => state)
  console.log(collapsed)

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
