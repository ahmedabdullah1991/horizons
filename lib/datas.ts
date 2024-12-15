"use server"

import {user} from "@/lib/kinde-imports";
import prisma from "@/lib/db";

async function data(){
    try {
        const currentUser = await user()
        if (!currentUser) {
            return null
        }
        const data = await prisma.user.findUnique({
            where: {kindeId: currentUser.id},
            select: {
                id: true, email: true, firstName: true, lastName: true,
                profile: {select: {id: true, resume: true, applications: true,}},
                company: {select: {id: true, userId: true, companyName: true, listings: true,
                        listing: {select: {id: true, companyId: true, companyName: true, updatedAt: true, createdAt: true, title: true, department: true, type: true, location: true,}}
                    }
                }
            }
        })
        if (!data) {
            return null
        }
        return {
            user: {
                id: data.id,
                email: data.email,
                firstName: data.firstName,
                lastName: data.lastName,
            },
            company: data && data.company? data.company : null,
            listings: data && data.company && data.company.listing ? data.company.listing : null,
            profile: data && data.profile ? data.profile : null,
        }
    }
    catch (error) {
        console.error(error)
    }
}

export const Data = data

async function listings() {
    try {
        const data = await prisma.listing.findMany({
            select: {
                id: true, companyId: true, companyName: true, title: true, location: true, department: true, type: true, createdAt: true
            }
        })
        return {
            listings: data
        }
    }
    catch (error) {
        console.error(error)
    }
}

export const Listings = listings