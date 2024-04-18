import { StringToColor } from '@/lib/utils'
import { ReceivedChatMessage } from '@livekit/components-react'
import React from 'react'
import {format} from "date-fns"
export default function ChatMessage({ data }: { data: ReceivedChatMessage }) {
  const color = StringToColor(data.from?.name || '')

  return (
    <div className=' flex gap-2 p-2 rounded-md text-muted-foreground  '>
      <p>
        {format(data.timestamp,"HH:MM")}
      </p>
      <div
      className=' flex flex-wrap items-baseline gap-1 grow '
      >
        <p
        className=' text-sm whitespace-nowrap font-semibold '
        >
            <span
            className=' truncate '
            style={{color: color}}
            >
                {data.from?.name }
            </span>:
        </p>
        <p
        className=' text-sm break-all '
        >
            {data.message}
        </p>
      </div>
    </div>
  )
}
