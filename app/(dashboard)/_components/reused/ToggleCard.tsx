'use client'
import { Switch } from '@/components/ui/switch'
import { ToggleCardProps } from '@/types'
import { toast } from 'sonner'
import { useTransition } from 'react'
import { updateStream } from '@/actions/stream'

export default function ToggleCard({ field, value, label }: ToggleCardProps) {
  const [isPending, startTransition] = useTransition()

  const onChange = () => {
    startTransition(() => {
      updateStream({ [field]: !value })
        .then(() => {
          toast.success('Values are updated')
        })
        .catch(() => {
          toast.error('Error in updating the values')
        })
    })
  }
  return (
    <div className=' rounded-xl bg-muted p-6 '>
      <div className=' flex items-center justify-between'>
        <p>{label}</p>
        <div className=' space-y-2 '>
          <Switch
            disabled={isPending}
            onCheckedChange={onChange}
            checked={value}
          >
            {value ? 'On' : 'Off'}
          </Switch>
        </div>
      </div>
    </div>
  )
}
