import {CompanyNameInputCard, JobPositionInputCard} from "@/components/client";
import {Company} from "@/lib/data";

export default async function Page() {
    const company = await Company()
    if (!company?.companyData) {
        return (
            <CompanyNameInputCard/>
        )
    } else if (company && company.companyData && company.companyData.length > 0) {
        return (
            <JobPositionInputCard/>
        )
    }
}