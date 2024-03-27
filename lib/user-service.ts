import { db } from "./db";

export const getUserByName = async (username: string) => {
    const user = await db.user.findUnique({
        where: {
            username
        }
    });
    return user;
}