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
                    company: {
                        create: {
                            companyName: companyName
                        }
                    }
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
        const users = await prisma.user.findUniqueOrThrow({
            where: {kindeId: User.id},
            select: {id: true},
        })

        const company = await Company()
        const name = company?.companyData

        if (name) {
            await prisma.company.update({
                where: {userId: users.id},
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

export type ProfileState = {
    errors?: {
        resume?: string[]
        listingsId?: string[]
    }
    message?: string | null
}

const profileSchema = z.object({
    resume: z
        .instanceof(File)
        .refine((file) => file.size <= 16000000, `Max file size is 16MB`)
        .refine(
            (file) => ["application/pdf"].includes(file.type),
            "Only .pdf formats are supported"
        ),
    listingsId: z.string()
})

export async function createProfile(prevState: ProfileState, formData: FormData) {
    const validatedFields = profileSchema.safeParse({
        resume: formData.get("resume"),
        listingsId: formData.get("listingsId")
    });
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Missing or invalid fields. Failed to create profile.",
        };
    }

    const resumeFile = formData.get("resume") as File
    const resumeBuffer = Buffer.from(await resumeFile.arrayBuffer())

    const {listingsId} = validatedFields.data

    try {
        const User = await user();
        if (User) {
            const company = await Company()
            if (!company) {
                await prisma.user.update({
                    where: {
                        kindeId: User.id,
                    },
                    data: {
                        profile: {
                            create: {
                                resume: resumeBuffer
                            }
                        }
                    }
                })
                await prisma.profile.update({
                    where: {
                        userId: User.id
                    },
                    data: {
                        application: {
                            create: {
                                listingsId: listingsId
                            }
                        }
                    }
                })
            } else {
                return {
                    message: "User already has a company associated. Cannot create a profile.",
                };
            }
        }
    } catch (e) {
        console.error(e);
        return {
            message: "An error occurred while creating the profile.",
        };
    }
    revalidatePath("/dashboard");
    redirect("/dashboard");
}