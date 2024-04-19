'use server'

import { getSelf } from '@/lib/authService'
import { blockUser, unblockUser } from '@/lib/block-service'
import { RoomServiceClient } from 'livekit-server-sdk'
import { revalidatePath } from 'next/cache'

const roomService = new RoomServiceClient(
    process.env.LIVEKIT_API_URL!,
    process.env.LIVEKIT_API_KEY!,
    process.env.LIVEKIT_API_SECRET!,
)

export const onBlock = async (id: string) => {
    try {
        const self = await getSelf()
        try {
            const blockedUser = await blockUser(id)
            revalidatePath('/')
            if (blockedUser) {
                revalidatePath(`/${blockedUser.blocked.username}`)
            }
            await roomService.removeParticipant(self?.id as string, id)
            revalidatePath(`/u/${self?.username}/community`)
            return blockedUser
        } catch (error) {
            throw new Error('Error in blocking the User')
        }

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
