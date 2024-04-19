import React from 'react'

export default function AboutCard({
  hostIdentity,
  hostName,
  viewerIdentity,
  bio,
  followedByCount,
}: {
  hostName: string
  hostIdentity: string
  viewerIdentity: string
  bio: string
  followedByCount: number
}) {
  return <div>AboutCard</div>
}
