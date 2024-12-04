import {Jobs} from "@/lib/data";

export default async function Page({ params }: { params: { id: string } }){


    const jobsData = await Jobs()
    const filteredData = jobsData?.filter((data) => data.id === params.id)
    return <div>{filteredData?.map((value, index)=> (
        <div key={index}>
            <>
                {value.title}
            </>
        </div>
    ))}</div>
}