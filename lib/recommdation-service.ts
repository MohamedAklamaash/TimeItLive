import { db } from './db'
import { getSelf } from './authService'
import { User } from '@prisma/client'

export const getReccommendedUsers = async () => {
    let userId
    try {
        const self = await getSelf()
        userId = self?.id
    } catch (error) {
        userId = null
    }
    let users: User[] | undefined = []
    if (userId) {
        users = await prisma?.user.findMany({
            where: {
                AND: [
                    {
                        NOT: {
                            id: userId,
                        },
                    },
                    {
                        NOT: {
                            followedBy: {
                                some: {
                                    followerId: userId,
                                },
                            },
                        },
                    },
                    {
                        NOT: {
                            blocking: {
                                some: {
                                    blockedId: userId,
                                },
                            },
                        },
                    },
                ],
            },
            include: {
                stream: {
                    select: {
                        isLive: true
                    }
                },
            },
            orderBy: {
                username: 'desc',
            },
        })
    } else {
        try {
            users = await db.user.findMany({
                orderBy: {
                    username: 'desc',
                },
                include: {
                    stream: true,
                },
            })
        } catch (error) {
            throw new Error('error')
        }
    }
    return users
}
