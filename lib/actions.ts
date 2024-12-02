"use server"

import {redirect} from "next/navigation"
import {revalidatePath} from "next/cache"
import {user} from "@/lib/kinde-imports"
import {z} from "zod"
import {PrismaClient} from "@prisma/client"
import {Company} from "@/lib/data"

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

const listingSchema = z.object({
    title: z
        .string()
        .min(5, {message: "Title should be 5 characters or more"})
        .max(30, {message: "Title should be 30 characters or less"})
        .trim(),
    department: z
        .string()
        .min(10, {message: "Department should be 10 characters or more"})
        .max(30, {message: "Department should be 30 characters or less"})
        .trim(),
    location: z
        .string()
        .min(3, {message: "Location should be 3 characters or more"})
        .max(50, {message: "Location should be 50 characters or less"})
        .trim(),
    type: z
        .string()
        .min(3, {
            message: "Employment type should be 3 characters or more",
        })
        .max(20, {message: "Employment type should be 20 characters or less"})
        .trim(),
})

export type ListingState = {
    errors?: {
        title?: string[]
        department?: string[]
        location?: string[]
        type?: string[]
    }
    message?: string | null
}

export async function createListing(
    prevState: ListingState,
    formData: FormData
) {
    const validatedFields = listingSchema.safeParse({
        title: formData.get("title"),
        department: formData.get("department"),
        location: formData.get("location"),
        type: formData.get("type"),
    })

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Missing or invalid fields. Failed to create listing.",
        }
    }

    const {title, department, location, type} = validatedFields.data

    try {
        const User = await user()
        const userId = await prisma.user.findUniqueOrThrow({
            where: {kindeId: User.id},
            select: {id: true},
        })

        const company = await Company()
        const name = company?.companyData

        if (name) {
            await prisma.company.update({
                where: {companiesId: userId.id},
                data: {
                    listing: {
                        create: {
                            title,
                            department,
                            location,
                            type,
                            companyName: name,
                        },
                    },
                },
            })
        }
    } catch (error) {
        console.error("Failed to create listing:", error)
        return {
            message: `Database Error: Failed to create a listing.`,
        }
    }
    revalidatePath("/dashboard")
    redirect("/dashboard")
}