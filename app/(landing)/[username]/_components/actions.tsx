'use client'

import { OnFollow, UnFollow } from '@/actions/follow'
import { Button } from '@/components/ui/button'
import { useEffect, useTransition } from 'react'
import { toast } from 'sonner'
export const FollowAction = ({
  userId,
  isFollowing,
}: {
  userId: string
  isFollowing: boolean
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
  return (
    <Button onClick={onClick} variant='secondary'>
      {!isFollowing ? 'Follow' : 'UnFollow'}
    </Button>
  )
}
