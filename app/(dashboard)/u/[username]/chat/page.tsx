import ToggleCard from '@/app/(dashboard)/_components/reused/ToggleCard'
import { Skeleton } from '@/components/ui/skeleton'
import { getSelf } from '@/lib/authService'
import { getStreamByUserId } from '@/lib/stream-service'
import React from 'react'

export default async function ChatPage() {
  const self = await getSelf()
  const stream = await getStreamByUserId(self?.id as string)
  if (!stream) {
    throw new Error('Stream not found')
  }
  return (
    <div className=' p-6 '>
      <div className=' mb-4'>
        <h1 className=' text-2xl font-bold '>Chat Settings</h1>
      </div>
      <div className=' space-y-4 '>
        <ToggleCard
          field='isChatEnabled'
          label='Enable Chat'
          value={stream.isChatEnabled}
        />
        <ToggleCard
          field='isChatDelayed'
          label='Enable Chat Delay'
          value={stream.isChatDelayed}
        />
        <ToggleCard
          field='isChatFollowersOnly'
          label='Enable isChatFollowersOnly'
          value={stream.isChatFollowersOnly}
        />
      </div>
    </div>
  )
}

export const ToggleCardSkeleton = () => {
  return <Skeleton className=' rounded-xl p-10 w-full ' />
}
