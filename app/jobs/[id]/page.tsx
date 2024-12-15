"use server"

import * as React from "react"
import {redirect} from "next/navigation"
import Image from "next/image"

import {Data, Listings} from "@/lib/datas"
import {ProfileCard} from "@/components/client"
import {Label} from "@/components/ui/label"
import {ReusableCard} from "@/components/components"

export default async function Page({params}: { params: { id: string } }) {
    const data = await Data(); const jobs = await Listings()
    const filter = jobs?.listings?.filter((value) => value.id === params.id)

    let companyName, listingsId, companyId
    filter?.map((value)=> {
        companyName = value.companyName
        companyId = value.companyId
        listingsId = value.id
    })

    const company = data?.company
    if (company) {
        redirect("/jobs")
    } else {
        return (
            <>
                <ProfileCard companyId={companyId} listingsId={listingsId}>
                    <ReusableCard
                        className={"w-full max-w-md"}
                        header={
                            <main className={"flex items-center space-x-4 p-6"}>
                                <Image src={""} alt={""} width={64} height={64}
                                       className={"border-2 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-full"}
                                       style={{objectFit: "contain"}}/>
                                <Label>
                                    {companyName}
                                </Label>
                            </main>
                        }
                    />
                </ProfileCard>
            </>
        )
    }
}