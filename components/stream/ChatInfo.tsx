import React, { useMemo } from 'react'
import { Info } from 'lucide-react'
import { Hint } from '../hints'
import { ChatInfoProps } from '@/types'

export default function ChatInfo({
  isDelayed,
  isFollowersOnly,
}: ChatInfoProps) {
  const hint = useMemo(() => {
    if (isFollowersOnly && !isDelayed) {
      return 'Only followers Can Chat'
    }
    if (!isFollowersOnly && isDelayed) {
      return 'Messages are delayed by 3 seconds '
    }
    if (isFollowersOnly && isDelayed) {
      return ' Only followers Can Chat. Messages are delayed by 3 seconds'
    }
    return ''
  }, [isDelayed])
  const label = useMemo(() => {
    if (isFollowersOnly && !isDelayed) {
      return 'Followers Only'
    }
    if (!isFollowersOnly && isDelayed) {
      return 'Slow Mode '
    }
    if (isFollowersOnly && isDelayed) {
      return ' Followers Only and Slow Mode '
    }
    return ''
  }, [isDelayed])
  if (!isDelayed && !isFollowersOnly) {
    return null
  }
  return (
    <div className=' p-2 text-muted-foreground bg-white/5 border border-white/10 w-full rounded-t-md flex items-center gap-y-2 '>
      <Hint label={hint}>
        <Info className=' h-4 w-4 ' />
      </Hint>
      <p className=' text-xs font-semibold '>{label}</p>
    </div>
  )
}
