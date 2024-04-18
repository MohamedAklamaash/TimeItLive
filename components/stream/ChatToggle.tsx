import React from 'react'
import { ArrowLeftFromLine, ArrowRightFromLine } from 'lucide-react'
import { Hint } from '../hints'
import { Button } from '../ui/button'
import { useChatSidebar } from '@/store/user-chat-sidebar'
export default function ChatToggle() {
  const { collapsed, onExpand, onCollapse } = useChatSidebar((state) => state)
  const Icon = collapsed ? ArrowLeftFromLine : ArrowRightFromLine
  const onToggle = () => {
    if (collapsed) {
      onExpand()
    } else {
      onCollapse()
    }
  }
  const label = collapsed ? 'Expand' : 'Collapse'
  return (
    <>
      <Hint label={label} asChild side='left'>
        <Button
          onClick={onToggle}
          variant='ghost'
          className=' h-auto p-2 hover:bg-white/10 hover:text-primary bg-transparent '
        >
          <Icon className=' h-4 w-4 ' />
        </Button>
      </Hint>
    </>
  )
}
