' use client'
import { ReceivedChatMessage } from '@livekit/components-react'
import React from 'react'
import ChatMessage from './ChatMessage'

export default function ChatList({
  messages,
  isHidden,
}: {
  messages: ReceivedChatMessage[]
  isHidden: boolean
}) {
  if (!messages || messages.length === 0 || isHidden) {
    return (
      <div className=' flex flex-1 items-center justify-center '>
        <p className=' text-sm text-muted-foreground '>
          {isHidden ? 'Chat is Disabled' : 'Welcome to the Chat'}
        </p>
      </div>
    )
  }
  return (
    <div className=' flex flex-1 flex-col-reverse overflow-y-auto p-3 h-full '>
      {messages.map((message, index) => {
        return (
          <div key={index}>
            <ChatMessage data={message} key={message.id} />
          </div>
        )
      })}
    </div>
  )
}
