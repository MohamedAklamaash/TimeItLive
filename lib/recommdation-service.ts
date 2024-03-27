import { db } from './db'
import { getSelf } from './authService'
import { User } from '@prisma/client'

export const getReccommendedUsers = async () => {
    let userId
    try {
        const self = await getSelf()
        userId = self.id
    } catch (error) {
        userId = null
    }
    let users: User[] | undefined = []
    if (userId) {
        users = await prisma?.user.findMany({
            where: {
                NOT: {
                    id: userId,
                }
            }
        })
    } else {
        users = await db.user.findMany({
            orderBy: {
                username: 'desc',
            },
        })
    }
    return users
}
