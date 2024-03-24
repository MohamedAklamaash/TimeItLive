import React from 'react'
import Navbar from '../_components/Navbar'

export default function HomeLayout({children}:{children:React.ReactNode}) {
  return (
    <>
        <div className=' h-full pt-20 flex flex-col  '>
            <Navbar/>
            {children}
        </div>
    </>
  )
}
