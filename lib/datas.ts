import {user} from "@/lib/kinde-imports";
import prisma from "@/lib/db";

interface Applications {
    applicantsId?: string
    requestsId?: string
}

const data = async () => {
    let userData, companyData, listingsData, profileData
    try {
        const users = await user()
        if (users) {
            const data = await prisma.user.findUnique({
                where: {kindeId: users.id}, select: {id: true, email: true, firstName: true, lastName: true,}
            })
            if (data) {
                const company = await prisma.company.findUnique({
                    where: {userId: data.id},
                    select: {id: true, userId: true, companyName: true,}
                })
                if (company) {
                    const listings = await prisma.listing.findMany({
                        where: {listingsId: company.id},
                        select: {
                            id: true,
                            listingsId: true,
                            title: true,
                            location: true,
                            department: true,
                            type: true,
                            createdAt: true,
                            companyId: true,
                            companyName: true
                        }
                    })
                    if (listings) {
                        listingsData = listings
                        return {listingsData}
                    }
                    companyData = company
                    return {companyData}
                }
                const profile = await prisma.profile.findUnique({
                    where: {userId: data.id}, select: {id: true, userId: true, resume: true, applications: true}
                });
                if (profile) {
                    profileData = profile
                    return {profileData}
                }
                userData = data
                return {userData}
            } else {
                return null
            }
        } else {
            return null
        }
    } catch (error) {
        console.error(error)
    }
}

export const Data = data

const applications = async ({applicantsId}: Applications) => {
    try {
        const applications = await prisma.application.findMany({
            where: {applicantsId: applicantsId}, select: { id: true, applicantsId: true, requestsId: true, listingId: true, createdAt: true,}
        })
        if (applications) {
            return {applicationsData: applications}
        }
        else {
            return null
        }
    }
    catch (error) {
        console.error(error)
    }
}

export const Applications = applications

const requests = async ({requestsId}: Applications) => {
    try {
        const requests = await prisma.application.findMany({
            where: {requestsId: requestsId}, select: { id: true, applicantsId: true, requestsId: true, listingId: true, createdAt: true,}
        })
        if (requests) {
            return {requestsData: requests}
        }
        else {
            return null
        }
    }
    catch (error) {
        console.error(error)
    }
}

export const Requests = requests