import {Jobs} from "@/lib/data";
import {ProfileCard, ApplicationCard} from "@/components/client";
import {Company, Companies, Profile} from "@/lib/data";
import {redirect} from "next/navigation";
import Image from "next/image";
import {Label} from "@/components/ui/label";
import {ReusableCard} from "@/components/components";
import * as React from "react";

export default async function Page({ params }: { params: { id: string } }){
    const jobsData = await Jobs()
    const profile = await Profile()
    const filteredData = jobsData?.filter((data) => data.id === params.id)
    let companyName
    filteredData?.map((value)=> {
        companyName = value.companyName
    })
    const companyId = await Companies({companyName: companyName})
    const companyData = await Company()
    if (companyData) {
        redirect("/jobs")
    } else if (profile) {
        return (
            <>
                <ApplicationCard listingsId={params.id}>
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
                </ApplicationCard>
            </>
        )
    } else {
        return <>
            <ProfileCard listingsId={params.id} companyId={companyId.returnedCompanyId}>
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
        </>
    }
}