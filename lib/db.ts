import {PrismaClient} from "@prisma/client";

declare global{
    var prisma : PrismaClient | undefined
}

export const db = globalThis.prisma || new PrismaClient();

//globalthis is not affected by hot reload

if(process.env.NODE_ENV !== 'production'){
    globalThis.prisma = db;
}