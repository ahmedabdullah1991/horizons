"use server"

import {redirect} from "next/navigation"
import {revalidatePath} from "next/cache"
import {user} from "@/lib/kinde-imports"
import {z} from "zod"
import {PrismaClient} from "@prisma/client"
import {Data} from "@/lib/datas"

const prisma = new PrismaClient()

const schema = z.object({
    companyName: z
        .string({
            invalid_type_error: "Invalid Company Name", required_error: "Company Name is required",
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
    const users = await user()
    const data = await Data()

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
        if (users) {
            if (data?.profile?.id) {
                redirect("app/dashboard")
            } else {
                await prisma.user.update({
                    where: {
                        kindeId: users.id,
                    }, data: {
                        company: {
                            create: {
                                companyName: companyName
                            }
                        }
                    },
                })
            }
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
        .trim(), department: z
        .string()
        .min(10, {message: "Department should be 10 characters or more"})
        .max(30, {message: "Department should be 30 characters or less"})
        .trim(), location: z
        .string()
        .min(3, {message: "Location should be 3 characters or more"})
        .max(50, {message: "Location should be 50 characters or less"})
        .trim(), type: z
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

export async function createListing(prevState: ListingState, formData: FormData) {
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
        const data = await Data()
        const dataId = data?.user?.id
        const companyName = data?.company?.companyName
        if (dataId && companyName) {
            await prisma.company.update({
                where: {userId: dataId}, data: {listings: {increment: 1}, listing: {create: {title: title, department: department, location: location, type: type, companyName: companyName}}}
            })
        } else {}

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
        companyId?: string[]
    }
    message?: string | null
}

const profileSchema = z.object({
    resume: z
        .instanceof(File)
        .refine((file) => file.size <= 16000000, `Max file size is 16MB`)
        .refine((file) => ["application/pdf"].includes(file.type), "Only .pdf formats are supported"),
    listingsId: z.string(), companyId: z.string(),
})

export async function createProfile(prevState: ProfileState, formData: FormData) {

    const validatedFields = profileSchema.safeParse({
        resume: formData.get("resume"), listingsId: formData.get("listingsId"), companyId: formData.get("companyId")
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Missing or invalid fields. Failed to create profile.",
        };
    }

    const resumeFile = formData.get("resume") as File
    const resumeBuffer = Buffer.from(await resumeFile.arrayBuffer())
    const {listingsId, companyId} = validatedFields.data

    try {
        const users = await user();
        if (users) {
            const data = await Data()
            const dataId = data?.user?.id

            if (data?.user?.id) {
                redirect("/jobs");
            } else {
                if (dataId) {
                    const profile = await prisma.profile.upsert({
                        where: {userId: dataId}, create: {userId: dataId, resume: resumeBuffer, applications: 1},
                        update: {resume: resumeBuffer, applications: {increment: 1}}
                    })
                    await prisma.application.create({
                        data: {
                            profileId: profile.id,
                            listingsId: listingsId,
                            companyId: companyId,
                        }
                    })
                    await prisma.request.create({
                        data: {
                            listingsId: listingsId,
                            profileId: profile.id,
                        }
                    })
                }
            }
        }
    }
    catch (e) {
        console.error(e);
        return {
            message: "An error occurred while creating the profile.",
        };
    }
    revalidatePath("/dashboard");
    redirect("/dashboard");
}