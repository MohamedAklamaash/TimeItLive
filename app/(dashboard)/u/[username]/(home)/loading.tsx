import { StreamPlayerSkeleton } from '@/components/stream/StreamUser'
import React from 'react'

export default function loading() {
  return (
    <div className=' h-full '>
      <StreamPlayerSkeleton />
    </div>
  )
}
