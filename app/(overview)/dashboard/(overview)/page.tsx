"use server"

import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table"
import {ScrollArea} from "@/components/ui/scroll-area"
import {ApplicationsChart} from "@/components/charts";
import {Company, Listings} from "@/lib/data";
import {ReusableCard} from "@/components/components";
import {Button} from "@/components/ui/button";
import Link from 'next/link'

export default async function Dashboard() {
    const listings = await Listings()
    const company = await Company()
    const business = company && company.companyData ? true : false

    return (
        <main className="flex-1 overflow-auto p-4 lg:p-8">
            <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <ReusableCard
                    title={"PROFILE TYPE"}
                    description={business ? "Business/Company" : "User"}
                    children2={<Link
                        href={"/generate"}><Button>{business ? "POST A JOB" : "REGISTER AS BUSINESS"}</Button></Link>}
                />
                <ReusableCard
                    title={"Total Applications"}
                    description={"Total Applications"}
                    children2={<Button variant={"link"}>{}</Button>}
                />
            </div>
            <Card className="mb-6">
                <CardHeader>
                    <CardTitle>Application Trends</CardTitle>
                    <CardDescription>Number of applications received over time</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px]">
                    <ApplicationsChart/>
                </CardContent>
            </Card>
            <Card className="mb-6">
                <CardHeader>
                    <CardTitle>Recent Applications</CardTitle>
                </CardHeader>
                <CardContent>
                    <ScrollArea className="h-[300px]">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Position</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {recentApplications.map((application) => (<TableRow key={application.id}>
                                    <TableCell>{application.name}</TableCell>
                                    <TableCell>{application.position}</TableCell>
                                    <TableCell>{application.date}</TableCell>
                                    <TableCell>{application.status}</TableCell>
                                </TableRow>))}
                            </TableBody>
                        </Table>
                    </ScrollArea>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Active Job Postings</CardTitle>
                </CardHeader>
                <CardContent>
                    <ScrollArea className="h-[300px]">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Title</TableHead>
                                    <TableHead>Department</TableHead>
                                    <TableHead>Applicants</TableHead>
                                    <TableHead>Date Posted</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {listings ? listings.map((value, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{value.title}</TableCell>
                                        <TableCell>{value.department}</TableCell>
                                        <TableCell>{value.location}</TableCell>
                                        <TableCell>{value.type}</TableCell>
                                    </TableRow>
                                )) : <TableRow>
                                    <TableCell>No Job Postings</TableCell>
                                    <TableCell>Start posting your jobs</TableCell>
                                    <TableCell>to get started</TableCell>
                                    <TableCell>with HORIZONS</TableCell>
                                </TableRow>}
                            </TableBody>
                        </Table>
                    </ScrollArea>
                </CardContent>
            </Card>
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

const recentApplications: JobApplication[] = [
    {id: '1', name: 'John Doe', position: 'Software Engineer', date: '2023-11-28', status: 'Pending'},
    {id: '2', name: 'Jane Smith', position: 'Product Manager', date: '2023-11-27', status: 'Reviewed'},
    {id: '3', name: 'Mike Johnson', position: 'UX Designer', date: '2023-11-26', status: 'Interviewed'},
    {id: '4', name: 'Emily Brown', position: 'Data Analyst', date: '2023-11-25', status: 'Offered'},
    {id: '5', name: 'Chris Wilson', position: 'Marketing Specialist', date: '2023-11-24', status: 'Rejected'},
];