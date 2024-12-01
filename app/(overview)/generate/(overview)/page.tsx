import {Data} from "@/lib/data";

export default async function Page() {
    const data = await Data()
    return (
        <>
            {data? data.email : "null"}
        </>
    )
}