import { currentUser } from '@clerk/nextjs'
import { db } from './db'

export const getSelf = async () => {
    const self = await currentUser()
    if (!self || !self.username) {
        throw new Error('Unauthorized user')
    }
    //clerk's id is external id in prisma
    const user = await db.user.findUnique({
        where: {
            externalUserid: self.id,
        },
    })
    if (!user) {
        throw new Error('User not found')
    }
    return user
}
