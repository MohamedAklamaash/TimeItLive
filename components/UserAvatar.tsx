import { UserItemProps } from '@/types'
import { cva, VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { Skeleton } from './ui/skeleton'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import LiveBadge from '@/components/LiveBadge'

const avatarSizes = cva('', {
  variants: {
    size: {
      default: ' w-8 h-8',
      lg: ' h-14 w-14 ',
    },
  },
  defaultVariants: {
    size: 'default',
  },
})

// Define props for UserAvatar component
type UserAvatarProps = UserItemProps & VariantProps<typeof avatarSizes>

export default function UserAvatar({
  imageUrl,
  username,
  isLive,
  showBadge,
  size,
}: UserAvatarProps) {
  const canShowBadge = showBadge && isLive

  return (
    <div className=' relative '>
      <Avatar
        className={cn(
          isLive && ' ring-2 ring-green-500 border border-background ',
          avatarSizes({ size }),
        )}
      >
        <AvatarImage src={imageUrl as string} className=' object-cover ' />
        <AvatarFallback>
          {username[0]}
          {username[username.length - 1]}
        </AvatarFallback>
      </Avatar>
      {canShowBadge && (
        <div className='  absolute transform -translate-x-1/2 left-1/2 '>
          <LiveBadge classname='' />
        </div>
      )}
    </div>
  )
}

interface UserAvatarSkeletonProps extends VariantProps<typeof avatarSizes> {}

export const userSkeleton = ({ size }: UserAvatarSkeletonProps) => {
  return <Skeleton className={cn(' rounded-full ', avatarSizes({ size }))} />
}
