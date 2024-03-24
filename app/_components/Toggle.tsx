'use client'
import React from 'react'
import { ArrowLeftFromLine, ArrowRightFromLine } from 'lucide-react'
import { useSidebar } from '@/store/use-sidebar'
import { Button } from '@/components/ui/button'
import { Hint } from '@/components/hints'
export default function Toggle() {
  const { collapsed, onCollapse, onExpand } = useSidebar((state) => state)
  const label = collapsed ? 'Expand' : 'Collapse'
  return (
    <>
      {!collapsed && (
        <div className=' p-3 flex justify-between items-center '>
          <h2 className=' font-semibold  '>For You </h2>{' '}
          <Hint label={label} side='right' asChild={true}>
            <Button variant='ghost'>
              <ArrowLeftFromLine onClick={onCollapse} />
            </Button>
          </Hint>
        </div>
      )}
      {collapsed && (
        <div className=' p-3'>
          <Hint label={label} side='right' asChild={false}>
            <Button variant='ghost'>
              <ArrowRightFromLine onClick={onExpand} />
            </Button>
          </Hint>
        </div>
      )}
    </>
  )
}
