"use server"

import {PrismaClient} from "@prisma/client";
import {user} from "@/lib/kinde-imports";

const prisma = new PrismaClient()

const data = async () => {
    let userData
    try {
        const User = await user()
        if (User) {
            const data = await prisma.user.findUnique({
                where: {
                    kindeId: User.id
                },
                select: {
                    id: true,
                    kindeId: true,
                    email: true,
                    firstName: true,
                    lastName: true,
                }
            })
            userData = data
            return {
                userData
            }
        }
    }
    catch (e) {
        console.error(e)
    }
}

export const Data = data