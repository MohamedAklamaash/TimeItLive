'use client'

import { onBlock, onUnBlock } from '@/actions/block'
import { OnFollow, UnFollow } from '@/actions/follow'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { useEffect, useTransition } from 'react'
import { toast } from 'sonner'
export const FollowAction = ({
  userId,
  isFollowing,
  isBlocked,
}: {
  userId: string
  isFollowing: boolean
  isBlocked: boolean
}) => {
  const [isPending, startTransition] = useTransition()
  const handleFollow = () => {
    startTransition(async () => {
      await OnFollow(userId)
        .then((data) => {
          toast.success(` You are now following The User `)
        })
        .catch(() => {
          toast.error('Error in following the user')
        })
    })
  }
  const handleUnfollow = () => {
    startTransition(async () => {
      await UnFollow(userId)
        .then((data) => {
          toast.success(` You are now unFollowd The User `)
        })
        .catch(() => {
          toast.error('Error in following the user')
        })
    })
  }
  const onClick = () => {
    if (!isFollowing) {
      handleFollow()
    } else {
      handleUnfollow()
    }
  }
  const handleBlockUser = () => {
    startTransition(async () => {
      await onBlock(userId)
        .then((d) => {
          toast.success(`You have successfully blocked the user`)
        })
        .catch((err) => {
          toast.error(`You can't block the user`)
        })
    })
  }

  const handleUnBlockUser = () => {
    startTransition(async () => {
      await onUnBlock(userId)
        .then((d) => {
          toast.success(`You have successfully Unblocked the user`)
        })
        .catch((err) => {
          toast.error(`You can't unblock the user`)
        })
    })
  }

  const handleBlock = () => {
    if (isBlocked) {
      handleUnBlockUser()
    }
    if (!isBlocked) {
      handleBlockUser()
    }
  }
  return (
    <>
      <Button onClick={onClick} variant='secondary'>
        {!isFollowing ? 'Follow' : 'UnFollow'}
      </Button>
      {JSON.stringify(isBlocked)}
      <Button onClick={handleBlock}>{isBlocked ? 'Unblock' : 'Block'}</Button>
    </>
  )
}
