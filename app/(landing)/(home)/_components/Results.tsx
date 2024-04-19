import { getStreams } from '@/actions/feeds'
import React from 'react'
import ResultCard, { ResultCardSkeleton } from './ResultCard'
import { Skeleton } from '@/components/ui/skeleton'

export default async function Results() {
  const data = await getStreams()

  return (
    <div>
      <h2 className=' text-lg font-semibold '>
        Streams That we think that you&apos;ll Like
      </h2>
      {data.length === 0 && (
        <div>
          <h2 className=' text-muted-foreground text-sm '>No Streams Found</h2>
        </div>
      )}
      <div className=' grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 '>
        {data.map((d, i) => {
          return <ResultCard key={d.id} data={d} />
        })}
      </div>
    </div>
  )
}

export const ResultsSkeleton = () => {
  return (
    <div>
      <Skeleton className='h-8 w-[290px] mb-4' />
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4'>
        {[...Array(4)].map((_, i) => (
          <ResultCardSkeleton key={i} />
        ))}
      </div>
    </div>
  )
}
