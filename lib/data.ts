"use server"

import prisma from "@/lib/db";
import {user} from "@/lib/kinde-imports";

async function data() {
    try {
        const users = await user();
        if (!users) {
            console.error("Error fetching user data");
            return null;
        }
        const data = await prisma.user.findUnique({
            where: { kindeId: users.id },
            select: { id: true },
        });
        if (!data) {
            console.error("Error fetching user data");
            return null;
        }
        return { userData: data.id };
    } catch (error) {
        console.error('Error fetching user data:', error);
        // return { error: { message: error.message } };
    }
}

export const Data = data

async function company() {
    let companyData, companyId, listings
    try {
        const data = await Data()
        if (!data) {
            return null
        } else {
            const company = await prisma.company.findUnique({
                where: {
                    userId: data.userData
                }, select: {
                    id: true,
                    companyName: true,
                    listing: true
                }
            })
            if (company) {
                companyData = company.companyName
                companyId = company.id
                listings = company.listing
                return {companyData, companyId, listings}
            } else {
                return null
            }
        }

    } catch (error) {
        console.error("Error fetching company data:", error);
        return null
    }
}

export const Company = company

async function listings(){
    let listingData
    try {
        const company = await Company()
        if (!company) {
            console.error("No company found");
            return null
        } else {
            const companyID = company.companyId
            if (!companyID) {
                console.error("No company ID found");
            } else {
                const listings = await prisma.listing.findMany({
                    where: {
                        listingsId: companyID
                    },  select: {
                        title: true,
                        department: true,
                        location: true,
                        type: true,
                        application: true,
                    }
                })
                if (listings) {
                    listingData = listings
                } else {
                    console.error("No listings found");
                    return null
                }
                return listingData
            }
        }
    }

    catch (e) {
        console.error(e)
    }
}

export const Listings = listings

async function jobs() {
    let listingData
    try {
        const listings = await prisma.listing.findMany({
            select: {
                id: true,
                title: true,
                location: true,
                department: true,
                type: true,
                createdAt: true,
                companyName: true
            }
        })
        if (!listings) {
            return null
        } else if (listings) {
            listingData = listings
        }
        return listingData
    }
    catch (error) {
        console.error(error)
    }
}

export const Jobs = jobs

async function profile() {
    let profileData, profileResume
    try {
        const data = await Data()
        if (!data) {
            return null
        } else {
            const profile = await prisma.profile.findUnique({
                where: {
                    userId: data.userData
                },
                select: {
                    id: true,
                    resume: true
                }
            })
            if (profile) {
                profileData = profile.id
                profileResume = profile.resume
            } else {
                return null
            }
        }
        return {
            profileData, profileResume
        }
    }
    catch (e) {
        console.error(e)
        return null
    }
}

export const Profile = profile