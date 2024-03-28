'use server'

import { Unfollow, followUser } from '@/lib/follow-service'
import { revalidatePath } from 'next/cache'

export const OnFollow = async (id: string) => {
    try {
        const followedUser = await followUser(id)
        revalidatePath('/')
        if (followedUser) {
            revalidatePath(`/${followedUser?.following.username}`)
        }
        return followUser
    } catch (error) { }
}

export const UnFollow = async (id: string): Promise<any> => {
    try {
        const unFollowed = await Unfollow(id)
        revalidatePath('/')
        if (unFollowed) {
            revalidatePath(`/${unFollowed.following.username}`)
        }
        return unFollowed
    } catch (error) {
        return false
    }
}
