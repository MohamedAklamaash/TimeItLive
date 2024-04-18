import React from 'react'

export default function Header({
  hostIdentity,
  hostName,
  viewerIdentity,
  imageUrl,
  isFollowing,
  name,
}: {
  hostName: string
  hostIdentity: string
  viewerIdentity: string
  imageUrl: string
  isFollowing: boolean
  name: string
}) {
  return <div>Header</div>
}
