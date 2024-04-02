'use server'
import { db } from '@/lib/db'
import { Stream } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { getSelf } from '@/lib/authService'
import { getStreamByUserId } from '@/lib/stream-service'

export const updateStream = async (values: Partial<Stream>) => {
    try {
        const self = await getSelf()
        const selfstream = await getStreamByUserId(self?.id as string)

        if (!selfstream) {
            throw new Error('Stream not found')
        }

        const validData = {
            name: values.name,
            isChatEnabled: values.isChatEnabled,
            isChatFollowersOnly: values.isChatFollowersOnly,
            isChatDelayed: values.isChatDelayed,
        }
        const stream = await db.stream.update({
            where: {
                id: selfstream.id,
            },
            data: {
                ...validData,
            },
        })

        revalidatePath(`/u/${self?.username}/chat`)
        revalidatePath(`/u/${self?.username}`)
        revalidatePath(`/${self?.username}`)

        return stream
    } catch (error) {
        throw new Error('Internal error: ' + error)
    }
}
