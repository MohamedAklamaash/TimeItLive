'use client'
import { useAuth } from '@clerk/nextjs'
import { Button } from '../ui/button'
import { HeartIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import { OnFollow, UnFollow } from '@/actions/follow'
import { toast } from 'sonner'
export default function Actions({
  isFollowing,
  hostIdentity,
  isHost,
}: {
  isFollowing: boolean
  hostIdentity: string
  isHost: boolean
}) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const { userId } = useAuth()
  const handleFollow = () => {
    startTransition(() => {
      OnFollow(hostIdentity)
        .then((d) => {
          toast.success(` You are now following the user  `)
        })
        .catch(() => {
          toast.error('Error in following the user')
        })
    })
  }
  const handleUnFollow = () => {
    startTransition(() => {
      UnFollow(hostIdentity)
        .then((d) => {
          toast.success(` You have now unfollowed the user  `)
        })
        .catch(() => {
          toast.error('Error in following the user')
        })
    })
  }
  const toggleFlow = () => {
    if (!userId) {
      return router.push(`/sign-in`)
    }
    if (isHost) {
      return
    }
    if (isFollowing) {
      handleUnFollow()
    } else {
      handleFollow()
    }
  }
  return (
    <Button
      disabled={isPending || isHost}
      onClick={toggleFlow}
      variant='ghost'
      className=' flex bg-white text-black items-center w-full lg:w-auto '
    >
        
      <HeartIcon
        className={cn(' h-4 w-4 mr-2 ', isFollowing ? ' fill-white' : 'fill-none')}
      />
      {isFollowing ? 'UnFollow' : 'Follow'}
    </Button>
  )
}
