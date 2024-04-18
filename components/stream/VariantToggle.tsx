import React from 'react'
import {
  ArrowLeftFromLine,
  ArrowRightFromLine,
  MessageSquare,
  Users,
} from 'lucide-react'
import { Hint } from '../hints'
import { Button } from '../ui/button'
import { ChatEnum, useChatSidebar } from '@/store/user-chat-sidebar'
export default function VariantToggle() {
  const { variant, onChangeVariant } = useChatSidebar((state) => state)
  const Icon = variant === ChatEnum.CHAT ? Users : MessageSquare
  const isChat = variant === ChatEnum.CHAT
  const onToggle = () => {
    if (onChangeVariant) {
      const newVariant = isChat ? ChatEnum.COMMUNITY : ChatEnum.CHAT
      onChangeVariant(newVariant)
    }
  }
  const label = isChat ? 'Community' : 'Go Back to Chat'
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
