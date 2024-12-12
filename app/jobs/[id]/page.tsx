"use server"

import * as React from "react";
import {redirect} from "next/navigation";
import Image from "next/image";

import {ProfileCard} from "@/components/client";
import {Company, Jobs} from "@/lib/data";
import {Label} from "@/components/ui/label";
import {ReusableCard} from "@/components/components";

export default async function Page({params}: { params: { id: string } }) {
    const jobs = await Jobs()
    const filter = jobs?.filter((data) => data.id === params.id)
    let companyName, listingsId
    filter?.map((value) => {
        companyName = value.companyName
        listingsId = value.listingsId
    })
    const companyData = await Company()
    if (companyData) {
        redirect("/jobs")
    } else {
        return (<>
            <ProfileCard listingId={params.id} listingsId={listingsId}>
                <ReusableCard
                    className={"w-full max-w-md"}
                    header={<main className={"flex items-center space-x-4 p-6"}>
                        <Image src={""} alt={""} width={64} height={64}
                               className={"border-2 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-full"}
                               style={{objectFit: "contain"}}/>
                        <Label>
                            {companyName}
                        </Label>
                    </main>}
                />
            </ProfileCard>
        </>)
    }
}