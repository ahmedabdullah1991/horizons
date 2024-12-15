import * as React from "react";
import {Listings} from "@/lib/datas";
import {Suspense} from "react";
import ListingsComponent from "@/app/jobs/client";

async function ListingsData() {
    const data = await Listings()

    const listings = data?.listings.map((value)=> {
        return {
            id: value.id,
            companyId: value.companyId,
            companyName: value.companyName,
            title: value.title,
            department: value.department,
            location: value.location,
            type: value.type,
            createdAt: value.createdAt
        }
    })

    return (
        <>
            <ListingsComponent listings={listings || []}/>
        </>
    )
}

export default function Page() {
    return (
        <>
            <Suspense fallback={<div>Loading...</div>}>
                <ListingsData/>
            </Suspense>
        </>
    )
}