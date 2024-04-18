'use client'

import { useState } from 'react'
import { Button } from '../ui/button'
import { cn } from '@/lib/utils'
import { Input } from '../ui/input'
import { Skeleton } from '../ui/skeleton'
import ChatInfo from './ChatInfo'
interface ChatFormProps {
  onSubmit: () => void
  value: string
  onChange: (value: string) => void
  isHidden: boolean
  isDelayed: boolean
  isFollowersOnly: boolean
  isFollowing: boolean
}

export default function ChatForm({
  onChange,
  onSubmit,
  value,
  isDelayed,
  isFollowersOnly,
  isFollowing,
  isHidden,
}: ChatFormProps) {
  const [isDelayBlocked, setisDelayBlocked] = useState<boolean>(false)
  const isFollowersOnlyAndNotFollowing = isFollowersOnly && !isFollowing
  const isDisabled =
    isHidden || isDelayBlocked || isFollowersOnlyAndNotFollowing
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (!value || isDisabled) {
      return
    }
    if (isDelayed && !isDelayBlocked) {
      setisDelayBlocked(true)
      setTimeout(() => {
        setisDelayBlocked(false)
        onSubmit()
      }, 3000)
    } else {
      onSubmit()
    }
  }

  if (isHidden) {
    return null
  }

  return (
    <form
      onSubmit={handleSubmit}
      className=' flex flex-col items-center justify-center gap-y-4 p-3 '
    >
      <div className=' w-full '>
        <ChatInfo isDelayed={isDelayed} isFollowersOnly={isFollowersOnly} />
        <Input
          onChange={(e) => {
            onChange(e.target.value)
          }}
          value={value}
          disabled={isDisabled}
          placeholder='Send a message'
          className={cn(
            ` border-white/10`,
            isFollowersOnly && 'rounded-t-none border-t-0 ',
          )}
        />
      </div>
      <div className=' ml-auto '>
        <Button
          type='submit'
          variant='ghost'
          size='sm'
          disabled={false}
          className=' bg-white text-black '
        >
          Chat
        </Button>
      </div>
    </form>
  )
}

export const ChatFormSkeleton = () => {
  return (
    <div className=' flex flex-col justify-center items-center '>
      <Skeleton className=' w-full h-10 ' />
      <div className='flex items-center gap-x-2 ml-auto '>
        <Skeleton className='h-7 w-7' />
        <Skeleton className=' h-7 w-12 ' />
      </div>
    </div>
  )
}
