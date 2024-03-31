'use client'

import { Input } from '@/components/ui/input'
import CopyButton from './CopyButton'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
export default function KeyCard({ value }: { value: string }) {
  const [show, setshow] = useState(false)
  return (
    <div className=' bg-muted rounded-lg p-6 '>
      <div className='flex items-start gap-x-10'>
        <p className=' font-semibold shrink-0 '>Stream Key</p>
        <div className=' space-y-2 w-full '>
          <div className=' w-full flex items-center space-x-2 '>
            <Input
              value={value || ''}
              placeholder='Stream key'
              type={show ? 'text' : 'password'}
              disabled
            />
            <CopyButton value={value || ''} />
          </div>
          <Button
            size='sm'
            variant='link'
            onClick={() => {
              setshow(!show)
            }}
          >
            {show ? 'Hide' : 'Show'}
          </Button>
        </div>
      </div>
    </div>
  )
}
