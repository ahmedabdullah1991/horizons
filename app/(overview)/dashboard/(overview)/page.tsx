"use server"

import {Data} from "@/lib/datas";

import {ReusableCard} from "@/components/components";
import {ScrollArea} from "@/components/ui/scroll-area";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Button} from "@/components/ui/button";
import Link from "next/link";

export default async function Page() {

    const data = await Data()

    const foo = data?.profile && [ {title: "UPDATE RESUME", link: "", description: "You can update your resume here.", button: "UPDATE"},
        {title: "TOTAL APPLICATIONS", link: "", description: "The total number of applications you have submitted.", button: data?.profile?.applications},
    ] || data?.company && [ {title: "BUSINESS PROFILE", link: "/generate", description: "", button: "POST A JOB"},
        {title: "TOTAL ACTIVE LISTINGS", link: "", description: "Business/Company", button: data?.company?.listings},
    ] || [ {title: "REGISTER AS A BUSINESS", link: "/generate", description: "Register now to post jobs and hire.", button: "REGISTER"},
        {title: "TOTAL ACTIVE LISTINGS", link: "", description: "The total number of active listings.", button: data?.company?.listings}]

    return (
        <main className={"flex-1 overflow-auto p-4 lg:p-8 space-y-4"}>
            <div className={"grid gap-4 sm:grid-cols-2 lg:grid-cols-4"}>
                {foo.map((value, index) => (
                    <ReusableCard key={index} title={value.title} description={value.description}
                        footer={
                            <Link href={value.link}>
                                <Button variant={"outline"}>{value.button}
                                </Button>
                            </Link>}/>
                        )
                    )
                }
            </div>
            <ReusableCard
                title={data?.profile ? "APPLICATIONS SUBMITTED" : "LISTINGS POSTED"}
                description={data?.profile ? "The list of applications you have submitted." : "The list of jobs you have posted."}
                children2={<Button variant={"outline"}>VIEW ALL</Button>}
            >
                <ScrollArea className="max-h-[300px]">
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
                            {data?.listings?.map((value, index)=> (
                                <TableRow key={index}>
                                    <TableCell>{value.title}</TableCell>
                                    <TableCell>{value.department}</TableCell>
                                    <TableCell>{value.type}</TableCell>
                                    <TableCell>{value.location}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </ScrollArea>
            </ReusableCard>
        </main>
    )
}