import Image from 'next/image'
import Link from 'next/link'
import clerkLogo from '@/public/cloud-backup-svgrepo-com.svg'
import { cn } from '@/lib/utils'
import { Poppins } from 'next/font/google'

const font = Poppins({
  subsets: ['latin'],
  weight: ['600', '200', '300', '400', '500', '700', '800'],
})

export default function NavLogo() {
  return (
    <div>
      <Link href={'/'}>
        <div className='  lg:flex space-x-3  items-center justify-center hover:opacity-75 transition '>
          <div className='rounded-full bg-white p-1 max-lg:mr-3 shrink-0'>
            <Image src={clerkLogo} alt='Logo' width={34} height={32} />
          </div>
          <div className={cn(font.className,"max-lg:hidden")}>
            <p className=' text-lg font-semibold '>TIME IT!</p>
            <p className=' text-xs text-muted-foreground '>Let &apos;s Play</p>
          </div>
        </div>
      </Link>
    </div>
  )
}
