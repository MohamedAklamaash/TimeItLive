import { SignInButton, UserButton, currentUser } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Clapperboard } from 'lucide-react'
async function Actions() {
  const user = await currentUser()
  return (
    <div className=' flex items-center justify-end  '>
      {!user && (
        <>
          <SignInButton>
            <Button size="sm" variant='ghost'>Login</Button>
          </SignInButton>
        </>
      )}
      {user && (
        <div className=' flex items-center gap-x-5 '>
          <Button
            className=' text-muted-foreground hover:text-primary '
            variant='ghost'
            size='sm'
            asChild
          >
            <Link href={`/u/${user.username}`}>
              <Clapperboard className=' h-5 w-5 lg:mr-2 ' />
              <span className=' hidden lg:block '>DashBoard</span>
            </Link>
          </Button>
          <UserButton />
        </div>
      )}
    </div>
  )
}

export default Actions
