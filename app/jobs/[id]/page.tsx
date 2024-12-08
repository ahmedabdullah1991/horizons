import {Jobs} from "@/lib/data";
import {ApplicationCard} from "@/components/client";
import {Company} from "@/lib/data";
import {redirect} from "next/navigation";

export default async function Page({ params }: { params: { id: string } }){
    const jobsData = await Jobs()
    const filteredData = jobsData?.filter((data) => data.id === params.id)
    let companyName
    filteredData?.map((value)=> {
        companyName = value.companyName
    })
    const companyData = await Company()
    if (companyData) {
        redirect("/jobs")
    } else {
        return <ApplicationCard companyName={companyName} listingsId={params.id}/>
    }
}