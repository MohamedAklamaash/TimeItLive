import React from 'react';
import { UserButton } from '@clerk/nextjs';
export default function Home() {
  return (
    <div>
      aklamaash
      <h1>DashBoard</h1>
      <UserButton
      afterSignOutUrl='/'
      />
    </div>
  )
}
