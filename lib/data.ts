"use server"

import prisma from "@/lib/db";
import {user} from "@/lib/kinde-imports";

async function data() {
    let userData
    try {
        const users = await user()
        if (users) {
            const data = await prisma.user.findUnique({
                where: {kindeId: users.id}, select: {id: true, email: true, firstName: true, lastName: true}
            })
            userData = data
        }

        return {
            userData,
        }
    } catch (error) {
        console.error(error)
        return null
    }
}

export const Data = data

async function company() {
    let companyData, companyId, listings
    const data = await Data()
    try {
        if (data?.userData?.id) {
            const company = await prisma.company.findUnique({
                where: {
                    companiesId: data.userData.id
                }, select: {
                    id: true,
                    companyName: true,
                    listings: true
                }
            })
            companyData = company?.companyName
            companyId = company?.id
            listings = company?.listings
            return {
                companyData,
                companyId,
                listings
            }
        }
    } catch (error) {
        console.error(error)
        return null
    }
}

export const Company = company

async function listings() {
    let listingData
    try {
        const company = await Company()
        const companyID = company?.companyId
        if (companyID) {
            const listings = await prisma.listing.findMany({
                where: {
                    listingsId: companyID
                }, select: {
                    title: true,
                    department: true,
                    location: true,
                    type: true,
                    application: true,
                }
            })
            listingData = listings
            return listingData
        }
    } catch (e) {
        console.error(e)
    }
}

export const Listings = listings