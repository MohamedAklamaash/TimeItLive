'use server'

import { getSelf } from '@/lib/authService'
import { db } from '@/lib/db'

export const getStreams = async () => {
    let userId
    try {
        const self = await getSelf()
        userId = self?.id
    } catch (error) {
        userId = null
    }
    let streams = []
    if (userId) {
    } else {
        streams = await db.stream.findMany({
            include: {
                user: true,
            },
            orderBy: [
                {
                    isLive: 'desc',
                },
                {
                    updatedAt: 'desc',
                },
            ],
        })
    }
}
