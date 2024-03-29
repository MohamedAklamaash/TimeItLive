import { Button } from '@/components/ui/button'
import NavLogo from '../../../_components/NavLogo'
import Link from 'next/link'
import { LogOutIcon } from 'lucide-react'
import { UserButton } from '@clerk/nextjs'
export default function DashboardNav({ username }: { username: string }) {
  return (
    <nav className=' flex w-full bg-[#252731] z-50 fixed top-0 justify-between items-center h-20 px-3 lg:px-4 shadow-sm '>
      <NavLogo />
      <h1 className=' text-lg text-center uppercase text-muted-foreground hover:text-primary active:text-primary max-lg:tracking-wide lg:tracking-widest cursor-crosshair   '>
        <span className=' uppercase'>{username}</span> DashBoard
      </h1>
      <div className=' flex space-x-5 items-center '>
        <Button variant='ghost'>
          <Link href='/'>
            <LogOutIcon />
            <p className=' '>Exit</p>
          </Link>
        </Button>
        <UserButton afterSignOutUrl='/' />
      </div>
    </nav>
  )
}
