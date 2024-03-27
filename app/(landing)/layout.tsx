import React, { Suspense } from 'react'
import Navbar from '../_components/Navbar'
import SideBar, { SideBarSkeleton } from '../_components/SideBar'
import Container from '../_components/Container'

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <div className=' h-full pt-20 flex flex-col  '>
        <Navbar />
        <Suspense fallback={<SideBarSkeleton />}>
          <SideBar />
        </Suspense>
        <Container>{children}</Container>
      </div>
    </>
  )
}
