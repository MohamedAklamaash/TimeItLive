'use client'

import { Hint } from '@/components/hints'
import { useDashboardSidebar } from '@/store/use-dashboard-sidebar'
import { ArrowLeft, ArrowRight } from 'lucide-react'
export default function DashboardToggle() {
  const { collapsed, onCollapse, onExpand } = useDashboardSidebar(
    (state) => state,
  )
  const label = collapsed ? 'Expand' : 'Collapse'
  return (
    <div className=' pt-6 '>
      <div className=' flex w-full items-center justify-evenly '>
        {!collapsed && (
          <p className=' textx-sm text-muted-foreground font-bold '>
            DashBoard
          </p>
        )}
        {collapsed && (
          <Hint label={label} side='right'>
            <ArrowRight onClick={() => onExpand()} />
          </Hint>
        )}
        {!collapsed && (
          <Hint label={label} side='right'>
            <ArrowLeft onClick={() => onCollapse()} />
          </Hint>
        )}
      </div>
    </div>
  )
}
