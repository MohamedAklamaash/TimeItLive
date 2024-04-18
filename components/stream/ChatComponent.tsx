import { ChatEnum, useChatSidebar } from '@/store/user-chat-sidebar'
import {
  useChat,
  useConnectionState,
  useRemoteParticipant,
} from '@livekit/components-react'
import { ConnectionState } from 'livekit-client'
import React, { ChangeEventHandler, useEffect, useMemo } from 'react'
import { useState } from 'react'
import { useMediaQuery } from 'usehooks-ts'
import ChatHeader from './ChatHeader'
import ChatForm from './ChatForm'
import ChatList from './ChatList'

function ChatComponent({
  viewerName,
  hostIdentity,
  hostName,
  isFollowing,
  isChatDelayed,
  isChatEnabled,
  isChatFollowersOnly,
}: {
  viewerName: string
  hostName: string
  hostIdentity: string
  isFollowing: boolean
  isChatEnabled: boolean
  isChatDelayed: boolean
  isChatFollowersOnly: boolean
}) {
  const matches = useMediaQuery('(max-width:1024px)')
  const { variant, onExpand } = useChatSidebar((state) => state)
  const connectionState = useConnectionState()
  const participant = useRemoteParticipant(hostIdentity)

  const isOnline = participant && connectionState === ConnectionState.Connected

  const isHidden = !isChatEnabled || !isOnline

  const [value, setvalue] = useState('')
  const { chatMessages: messages, send } = useChat()

  useEffect(() => {
    if (matches) {
      onExpand()
    }
  }, [matches, onExpand])

  const reversedMessages = useMemo(() => {
    return messages.sort((a, b) => b.timestamp - a.timestamp)
  }, [messages])

  const onSubmit = () => {
    if (!send) {
      return
    }
    send(value)
    setvalue('')
  }

  const onChange = (value:string)=>{
    setvalue(value);
  }

  return <div
  className={` flex flex-col bg-background border-l border-b pt-0 h-[calc(100vh-80px)] `}
  >
    <ChatHeader/>
    {variant === ChatEnum.CHAT && (
      <>
      <ChatList
        messages={reversedMessages}
        isHidden = {isHidden }

      />
        <ChatForm
        onSubmit={onSubmit}
        value={value}
        onChange={onChange}
        isHidden={isHidden}
        isFollowersOnly={isChatFollowersOnly}
        isDelayed={isChatDelayed}
        isFollowing={isFollowing}
        />
      </>
    )}
    {
      variant === ChatEnum.COMMUNITY && (
        <div>
          <p>Community Mode</p>
        </div>
      )
    }
  </div>
}

export default ChatComponent
