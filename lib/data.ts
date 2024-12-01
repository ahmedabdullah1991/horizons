"use server"

import prisma from "@/lib/db";
import {user} from "@/lib/kinde-imports";

async function data(){
    try {
        const users = await user()
        const data = await prisma.user.findUnique({
            where: {kindeId: users.id}, select: {id: true, email: true}
        })
        return data
    } catch (error) {
        console.error(error)
        return null
    }
}

export const Data = data