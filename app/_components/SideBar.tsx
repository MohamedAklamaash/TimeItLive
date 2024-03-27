import React from 'react'
import Wrapper from './wrapper'
import Toggle from './Toggle'
import RecommenedUsers, { RecommenedUserSkeleton } from './RecommenedUser'
import { getReccommendedUsers } from '@/lib/recommdation-service'

export default async function SideBar() {
  const recommendedUsers = await getReccommendedUsers()

  return (
    <Wrapper>
      <Toggle />
      <div className=' space-y-4 pt-4 lg:pt-0 '>
        <RecommenedUsers data={recommendedUsers} />
      </div>
    </Wrapper>
  )
}

export const SideBarSkeleton = () => {
  return (
    <aside className=' fixed left-0 w-[70px] lg:w-60 border-r border-[#2D2E35] z-50 h-screen flex flex-col bg-background '>
      <RecommenedUserSkeleton />
    </aside>
  )
}
