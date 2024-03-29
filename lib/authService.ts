import { currentUser, redirectToSignIn } from '@clerk/nextjs'
import { db } from './db'

export const getSelf = async () => {
    try {
        const self = await currentUser()

        if (!self || !self.username) {
            throw new Error('Unauthorized user')
        }
        // Clerk's ID is external ID in Prisma
        const user = await db.user.findUnique({
            where: {
                externalUserid: self.id,
            },
        })

        if (!user) {
            throw new Error('User not found')
        }
        return user
    } catch (error) {
        // redirectToSignIn({ returnBackUrl: "http://localhost:3000" })
    }
}

export const getSelfByUsername = async (username: string) => {
    try {
        const self = await currentUser()

        if (!self || !self.username) {
            throw new Error('Unauthorized user')
        }
        // Clerk's ID is external ID in Prisma
        const user = await db.user.findUnique({
            where: {
                username,
            },
        })

        if (!user) {
            throw new Error('User not found')
        }
        if (self.username !== user.username) {
            throw new Error("Unauthorized user")
        }
        return user;
    } catch (error) { }
}
