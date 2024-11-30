"use server"

import {redirect} from "next/navigation"
import {revalidatePath} from "next/cache"
import {user} from "@/lib/kinde-imports"
import {z} from "zod"
import {PrismaClient} from "@prisma/client"

const prisma = new PrismaClient()

const schema = z.object({
    companyName: z
        .string({
            invalid_type_error: "Invalid Company Name",
            required_error: "Company Name is required",
        })
        .min(5, "Must be 5 characters or more.")
        .max(30, "Must be 30 characters or less.")
        .trim(),
})

export type prevState = {
    errors?: {
        companyName?: string[]
    }
    message?: string | null
}

export async function createCompany(prevState: prevState, formData: FormData) {
    const User = await user()
    const validatedFields = schema.safeParse({
        companyName: formData.get("companyName"),
    })
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: "[missing fields. failed to create to invoice]",
        }
    }
    const {companyName} = validatedFields.data
    try {
        if (User) {
            await prisma.user.update({
                where: {
                    kindeId: User.id,
                },
                data: {
                    companies: {
                        create: {
                            companyName: companyName,
                        },
                    },
                },
            })
        }
    } catch (e) {
        console.error(e)
    }

    revalidatePath("/dashboard")
    redirect("/dashboard")
}