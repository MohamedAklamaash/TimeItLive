import Link from 'next/link'
import React from 'react'

export default function NotFound() {
  return (
    <div className=' h-full flex flex-col items-center justify-center space-y-4 text-muted-foreground '>
      <h1 className=' text-xl '>404</h1>
      <p className=' text-md '>
        We couldn&apos;t find the user you are looking for
      </p>
      <Link className=' text-md hover:underline  ' href='/'>Go Back Home</Link>
    </div>
  )
}
