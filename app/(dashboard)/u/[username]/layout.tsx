import DashboardNav from '@/app/(dashboard)/_components/sidebar/DashboardNav'
import { getSelfByUsername } from '@/lib/authService'
import React, { Suspense } from 'react'
import DashboardSidebar from '../../_components/sidebar/DashboardSidebar'
import DashBoardContainer from '../../_components/sidebar/DashboardContainer'
import { DashBoardSideBarItemsSkeleton } from '../../_components/sidebar/DashboardNavigation'

interface CreatorLayoutProps {
  children: React.ReactNode
  params: {
    username: string
  }
}

export default async function DashBoardLayout({
  children,
  params: { username },
}: CreatorLayoutProps) {
  const self = await getSelfByUsername(username)

  return (
    <>
      <DashboardNav username={self?.username || ''} />
      <div className=' pt-20 flex h-full '>
        <Suspense fallback={<DashBoardSideBarItemsSkeleton />}>
          <DashboardSidebar />
        </Suspense>
        <DashBoardContainer>{children}</DashBoardContainer>
      </div>
    </>
  )
}
