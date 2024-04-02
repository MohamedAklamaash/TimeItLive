'use client'
import { Maximize, Minimize } from 'lucide-react'
import { Hint } from '../hints'
import { FullScreenProps } from '@/types'

export default function FullScreenControl({
  isFullScreen,
  onToggle,
}: FullScreenProps) {
  const Icon = isFullScreen ? Maximize : Minimize
  const label = isFullScreen ? 'Exit Full Screen' : 'Full Screen'
  return (
    <div className=' flex items-center justify-center gap-4 '>
      <Hint  label={label} asChild>
        <button className=' text-white p-1.5 hover:bg-white/10 rounded-lg ' onClick={onToggle}>
          <Icon className=' h-5 w-5 ' />
        </button>
      </Hint>
    </div>
  )
}
