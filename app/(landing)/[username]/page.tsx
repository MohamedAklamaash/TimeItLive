import { UserPageProps } from '@/types'
import React from 'react'

export default function UserPage({ params: { username } }: UserPageProps) {
  return <div>User:{username}</div>
}
