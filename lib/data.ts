import prisma from "@/lib/db"
import {user} from "@/lib/kinde-imports"

async function data() {
    try {
        let userData, companyData, listingData
        const User = await user()
        if (User) {
            const data = await prisma.user.findUniqueOrThrow({
                where: {
                    kindeId: User.id,
                },
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    email: true,
                },
            })
            const company = await prisma.company.findUniqueOrThrow({
                where: {
                    companiesId: data.id,
                },
                select: {
                    id: true,
                    companiesId: true,
                    companyName: true,
                },
            })
            const listings = await prisma.listing.findMany({
                where: {
                    listingsId: company.id,
                },
                select: {
                    title: true,
                    department: true,
                    location: true,
                    type: true,
                    application: true,
                    profile: {
                        select: {
                            address: true,
                            phoneNumber: true,
                            resume: true,
                        },
                    }
                },
            })
            userData = data
            companyData = company
            listingData = listings
            return {
                userData,
                companyData,
                listingData
            }
        }
        if (!User) {
            return null
        }
    } catch (e) {
        console.error(e)
    }
}

export const Data = data
