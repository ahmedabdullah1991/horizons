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
                profile: {select: {id: true, resume: true, applications: true, application: {select: {id: true, createdAt: true, profileId: true, listingsId: true, companyId: true}}}},
                company: {select: {id: true, userId: true, companyName: true, listings: true,
                        listing: {select: {id: true, companyId: true, companyName: true, updatedAt: true, createdAt: true, title: true, department: true, type: true, location: true, request: {select: {id: true, createdAt: true, listingsId: true, profileId: true}}}}
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
            application: data && data.profile && data.profile.application ? data.profile.application : null,
            request: data && data.company && data.company.listing && data.company.listing.map((value) => {
                return value.request
            }) || null,
        }
    }
    catch (error) {
        console.error(error)
    }
}

export const Data = data

async function listings() {
    try {
        const data = await prisma.listing.findMany({})
        return {
            listings: data
        }
    }
    catch (error) {
        console.error(error)
    }
}

export const Listings = listings

interface Applications {
    profileId?: string
}

async function applications({profileId}: Applications) {
    try {
        const data = await prisma.application.findMany({
            where: {profileId: profileId}, select: {id: true, createdAt: true, profileId: true, listingsId: true, companyId: true}
        })
        return {
            applications: data
        }
    }
    catch (error) {
        console.error(error)
    }
}

export const Applications = applications

interface Requests {
    listingsId?: string
}

async function requests({listingsId}: Requests) {
    try {
        const data = await prisma.request.findMany({
            where: {listingsId: listingsId}, select: {id: true, createdAt: true, listingsId: true, profileId: true}
        })
        return {
            requests: data
        }
    }
    catch (error) {
        console.error(error)
    }
}

export const Requests = requests