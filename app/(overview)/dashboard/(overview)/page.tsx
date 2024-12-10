"use server"

import Link from "next/link";

import {Company, Profile, Listings} from "@/lib/data";

import {ReusableCard} from "@/components/components";
import {ApplicationsChart} from "@/components/charts";
import {ScrollArea} from "@/components/ui/scroll-area";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Button} from "@/components/ui/button";

export default async function Page() {
    const company = await Company()
    const profile = await Profile()
    const listings = await Listings()

    return (
        <main className="flex-1 overflow-auto p-4 lg:p-8 space-y-4">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {company && company.companyId && (
                    <>
                        <ReusableCard title={"PROFILE TYPE"}
                                      description={"Business/Company"}
                                      children2={<Link href={"/generate"}>
                                          <Button>{company.companyId ? "POST A JOB" : "REGISTER AS BUSINESS"}</Button>
                                      </Link>}/>
                        <ReusableCard title={"TOTAL ACTIVE LISTINGS"} children2={
                            <Link href={"/"}>
                                <Button variant={"secondary"}>{company.listings.length}</Button>
                            </Link>
                        }/>
                    </>

                )}
                {profile && profile.profileResume && (
                    <ReusableCard title={"RE-UPLOAD RESUME"}/>
                )}
            </div>
            <ReusableCard>
                <div className="h-[300px]">
                    <ApplicationsChart/>
                </div>
            </ReusableCard>
            <ReusableCard>
                <ScrollArea className="h-[300px]">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Title</TableHead>
                                <TableHead>Position</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Location</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {listings ? (listings.map((value, index)=> (
                                <TableRow key={index}>
                                    <TableCell>{value.title}</TableCell>
                                    <TableCell>{value.department}</TableCell>
                                    <TableCell>{value.type}</TableCell>
                                    <TableCell>{value.location}</TableCell>
                                </TableRow>
                            ))): null}
                        </TableBody>
                    </Table>
                </ScrollArea>
            </ReusableCard>
        </main>
    )
}

export type JobApplication = {
    id: string;
    name: string;
    position: string;
    date: string;
    status: 'Pending' | 'Reviewed' | 'Interviewed' | 'Offered' | 'Rejected';
};