"use server"

import prisma from "@/lib/db";
import {user} from "@/lib/kinde-imports";

async function data(){
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

async function company(){
    let companyData
    const data = await Data()
    try {
        if (data?.userData?.id){
            const company = await prisma.company.findUnique({
                where: {
                    companiesId: data.userData.id
                }, select: {
                    companyName: true
                }
            })
            companyData = company?.companyName
            return companyData
        }
    }
    catch (error) {
        console.error(error)
        return null
    }
}

export const Company = company

