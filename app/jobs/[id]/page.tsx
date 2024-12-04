import {Jobs} from "@/lib/data";
import {ApplicationCard} from "@/components/client";

export default async function Page({ params }: { params: { id: string } }){
    const jobsData = await Jobs()
    const filteredData = jobsData?.filter((data) => data.id === params.id)
    return <div>{filteredData?.map((value, index)=> (
        <div key={index}>
            <>
                {value.title}
                <ApplicationCard/>
            </>
        </div>
    ))}</div>
}