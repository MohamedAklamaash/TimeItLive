'use client'

import { useParticipants } from '@livekit/components-react'
import { useMemo, useState } from 'react'
import { useDebounceValue } from 'usehooks-ts'
import { Input } from '../ui/input'
import { ScrollArea } from '../ui/scroll-area'
import CommunityItem from './CommunityItem'
import { LocalParticipant, RemoteParticipant } from 'livekit-client'
export default function ChatCommunity({
  viewerName,
  hostName,
  isHidden,
}: {
  viewerName: string
  hostName: string
  isHidden: boolean
}) {
  const [value, setvalue] = useState('')
  const participants = useParticipants()
  const deboundedValue = useDebounceValue<string>(value, 500)
  const onChange = (newValue: string) => {
    setvalue(newValue)
  }
  const filteredParticipants = useMemo(()=>{
    const deduped = participants.reduce((acc,participant)=>{
        const hostAsViewer = `host-${participant.identity}`
        if(!acc.some((p)=>p.identity===hostAsViewer)){
            acc.push(participant)
        }
        return acc
    },[] as (RemoteParticipant | LocalParticipant)[] )
    return deduped.filter((p)=>{
        return p.name?.toLowerCase().includes(deboundedValue[0].toLowerCase())
    })
  },[participants,deboundedValue])
  if (isHidden) {
    return (
      <div className='flex items-center justify-center flex-1 '>
        <p className=' text-sm text-muted-foreground '>Community is Disabled</p>
      </div>
    )
  }
  return (
    <div className=' p-4 '>
      <Input
        onChange={(e) => {
          onChange(e.target.value)
        }}
        placeholder='Search Community'
        className=' border-white/10  '
      />
      <ScrollArea>
        <p className=' text-center text-sm hidden text-muted-foreground last:block p-2 '>
          No results found
        </p>
        {filteredParticipants.map((participant) => {
          return (
            <CommunityItem
              key={participant.identity}
              hostName={hostName}
              viewerName={viewerName}
              participantIdentity={participant.identity}
              participantName={participant.name ?? ''}
            />
          )
        })}
      </ScrollArea>
    </div>
  )
}
