import { db } from './db'
import { getSelf } from './authService'

export const isblockedByUser = async (id: string) => {
    try {
        const self = await getSelf()
        const otherUser = await db.user.findUnique({
            where: {
                id,
            },
        })
        if (!otherUser) {
            throw new Error('User not found')
        }
        if (otherUser.id === self?.id) {
            return false
        }
        const existingBlock = await db.block.findUnique({
            where: {
                blockedId_blockerId: {
                    blockerId: self?.id as string,
                    blockedId: otherUser.id,
                },
            },
        })
        return !!existingBlock
    } catch (error) {
        return false
    }
}

export const blockUser = async (id: string) => {
    try {
        const self = await getSelf()

        const otherUser = await db.user.findUnique({
            where: {
                id,
            },
        })

        if (!otherUser) {
            throw new Error('User not found')
        }
        if (otherUser.id === self?.id) {
            return false
        }

        const existingBlock = await db.block.findUnique({
            where: {
                blockedId_blockerId: {
                    blockerId: self?.id as string,
                    blockedId: otherUser.id,
                },
            },
        })

        if (!!existingBlock) {
            throw new Error('Block already exists')
        }

        const block = await db.block.create({
            data: {
                blockedId: otherUser.id,
                blockerId: self?.id as string,
            },
            include: {
                blocked: true,
            },
        })
        console.log('block:', block)

        return block
    } catch (error) {
        throw new Error('Error blocking the user: ')
    }
}

export const unblockUser = async (id: string) => {
    try {
        const self = await getSelf()
        const otherUser = await db.user.findUnique({
            where: {
                id,
            },
        })
        if (!otherUser) {
            throw new Error('User not found')
        }
        if (otherUser.id === self?.id) {
            return false
        }
        const existingBlock = await db.block.findUnique({
            where: {
                blockedId_blockerId: {
                    blockerId: self?.id as string,
                    blockedId: otherUser.id,
                },
            },
        })
        if (!existingBlock) {
            throw new Error('Block doesn`t exists')
        }
        const unblock = await db.block.delete({
            where: {
                id: existingBlock.id,
            },
            include: {
                blocked: true,
            },
        })

        return unblock
    } catch (error) {
        throw new Error('Error in unblocking the user')
    }
}

export const areYouBlockedBySomeUser = async (id: string) => {
    try {
        const self = await getSelf()
        const otherUser = await db.user.findUnique({
            where: {
                id,
            },
        })
        if (!otherUser) {
            throw new Error('User not found')
        }
        if (otherUser.id === self?.id) {
            return false
        }
        const existingBlock = await db.block.findUnique({
            where: {
                blockedId_blockerId: {
                    blockerId: otherUser.id,
                    blockedId: self?.id as string,
                },
            },
        })
        return !!existingBlock
    } catch (error) {
        return false
    }
}
