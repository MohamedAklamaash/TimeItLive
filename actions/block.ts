'use server'

import { blockUser, unblockUser } from '@/lib/block-service'
import { revalidatePath } from 'next/cache'

export const onBlock = async (id: string) => {
    try {

        const blockedUser = await blockUser(id)

        if (blockedUser) {
            revalidatePath(`/${blockedUser.blocked.username}`)
        }

        return blockedUser;
    } catch (error) { }
}

export const onUnBlock = async (id: string) => {
    try {
        const unblockedUser = await unblockUser(id)
        if (unblockedUser) {
            revalidatePath(`/${unblockedUser.blocked.username}`)
        }
        return unblockedUser
    } catch (error) { }
}