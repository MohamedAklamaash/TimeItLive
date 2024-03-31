import ConnectModal from '@/app/(dashboard)/_components/reused/ConnectModal'
import KeyCard from '@/app/(dashboard)/_components/reused/KeyCard'
import UrlCard from '@/app/(dashboard)/_components/reused/UrlCard'
import { getSelf } from '@/lib/authService'
import { getStreamByUserId } from '@/lib/stream-service'
import React from 'react'

export default async function DashboardKeys() {
  const self = await getSelf()
  const stream = await getStreamByUserId(self?.id as string)

  if (!stream) {
    throw new Error('Stream not found')
  }

  return (
    <div className=' p-6 '>
      <div className='flex items-center justify-between mb-4 '>
        <h1 className=' font-bold text-2xl  '>Keys & URLs</h1>
        <ConnectModal />
      </div>
      <div className='space-y-4'>
        <UrlCard value={stream.serverUrl as string} />
        <KeyCard value={stream.streamkey as string} />
      </div>
    </div>
  )
}
