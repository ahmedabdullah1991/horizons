import {CompanyNameInputCard, JobPositionInputCard} from "@/components/client"
import {Data} from "@/lib/datas";

export default async function Page() {
    const data = await Data()
    if (!data?.company) {
        return (
            <CompanyNameInputCard/>
        )
    } else if (data?.company) {
        return (
            <JobPositionInputCard/>
        )
    }
}