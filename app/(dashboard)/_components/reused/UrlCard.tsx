import { Input } from '@/components/ui/input'
import { URlCardProps } from '@/types'
import React from 'react'
import CopyButton from './CopyButton'

export default function UrlCard({ value }: URlCardProps) {
  return (
    <div className=' rounded-xl bg-muted  p-6 '>
      <div className='flex items-center gap-x-10'>
        <p className=' shrink-0 font-semibold '>Server URL</p>
        <div className='space-y-2 w-full'>
          <div className='w-full flex items-center gap-x-2'>
            <Input disabled value={value || ''} placeholder='Server URL' />
            <CopyButton value={value || ''} />
          </div>
        </div>
      </div>
    </div>
  )
}
