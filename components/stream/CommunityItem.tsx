'use client'

import { toast } from 'sonner'
import { useTransition } from 'react'
import { MinusCircle } from 'lucide-react'
import { Hint } from '../hints'
import { onBlock } from '@/actions/block'
import { cn, StringToColor } from '@/lib/utils'
import { Button } from '../ui/button'

export default function CommunityItem({
  viewerName,
  hostName,
  participantIdentity,
  participantName,
}: {
  viewerName: string
  hostName: string
  participantName: string
  participantIdentity: string
}) {
  const color = StringToColor(participantName ?? '')
  const [isPending, startTransition] = useTransition()
  const self = viewerName === participantName
  const isHost = viewerName === participantName
  const handleBlock = () => {
    if (!participantName || self || !isHost) return
    startTransition(() => {
      onBlock(participantIdentity).then(() => {
        toast.success(`Blocked ${participantName}`)
      })
    })
  }
  return (
    <div
      className={cn(
        ' group flex items-center justify-between w-full p-2 rounded-md text-sm hover:bg-white/5  ',
        isPending && " opacity-50 pointer-events-none " 
      )}
    >
      <p style={{ color: color }}>{participantName}</p>
      {isHost && !self && (
        <Hint label='Block'>
          <Button
          variant="ghost"
            disabled={isPending}
            onClick={handleBlock}
            className=' h-auto w-auto p-1 opacity-0 group-hover:opacity-100 transition '
          >
            <MinusCircle className=' h-4 w-4 text-muted-foreground ' />
          </Button>
        </Hint>
      )}
    </div>
  )
}
