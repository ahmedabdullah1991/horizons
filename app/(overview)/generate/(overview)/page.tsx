import {CompanyNameInputCard, JobPositionInputCard} from "@/components/client";
import {Company} from "@/lib/data";

export default async function Page() {
    const company = await Company()
    if (!company) {
        return (
            <CompanyNameInputCard/>
        )
    } else if (company && company.length > 0) {
        return (
            <JobPositionInputCard/>
        )
    }
}