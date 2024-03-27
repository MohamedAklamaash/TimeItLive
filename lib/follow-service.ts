"use server"
import { db } from './db'
import { getSelf } from './authService'

export const isFollowingUser = async (id: string) => {
    try {
        const self = await getSelf()
        const otherUser = await db.user.findUnique({
            where: { id },
        })
        if (!otherUser) {
            throw new Error(`User ${id} does not exist `)
        }
        if (otherUser.id === self.id) {
            return true
        }
        const existingFollow = await db.follow.findFirst({
            where: {
                followerId: self.id,
                followingId: otherUser.id,
            },
        })
        return !!existingFollow
    } catch (error) {
        return false
    }
}

export const followUser = async (id: string) => {
    const self = await getSelf()
    const otherUser = await db.user.findUnique({
        where: { id },
    })
    if (!otherUser) {
        throw new Error(`User ${id} does not exist `)
    }
    if (otherUser.id === self.id) {
        throw new Error(`User cannot be followed by Himself ${self.id}`)
    }
    const existingFollow = await db.follow.findFirst({
        where: {
            followerId: self.id,
            followingId: otherUser.id,
        },
    })
    if (existingFollow) {
        throw new Error('Already Following the User')
    }
    const follow = await db.follow.create({
        data: {
            followerId: self.id,
            followingId: otherUser.id,
        },
        include: {
            follower: true,
            following: true,
        },
    })
    return follow
}

export const Unfollow = async (id: string) => {
    const self = await getSelf()
    const otherUser = await db.user.findUnique({
        where: {
            id,
        },
    })
    if (!otherUser) {
        throw new Error('User not found')
    }
    if (self.id === otherUser.id) {
        throw new Error('Cannot follow Yourself')
    }
    const existingFollow = await db.follow.findFirst({
        where: {
            followerId: self.id,
            followingId: otherUser.id,
        },
    })
    if (!existingFollow) {
        throw new Error('Follower Not Found')
    }
    const follow = await db.follow.delete({
        where: {
            id: existingFollow.id,
        },
        include: {
            following: true,
        },
    })
    return follow
}

export const getFollowedUsers = async () => {
    const self = await getSelf();
    try {
        const followedUsers = await db.follow.findMany({
            where: {
                followerId: self.id,
            },
            include: {
                following: true,
            }
        });
        return followedUsers;
    } catch (error) {
        return []
    }
}