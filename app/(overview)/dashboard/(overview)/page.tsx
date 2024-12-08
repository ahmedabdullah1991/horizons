"use server"

import {Company, Profile} from "@/lib/data";

import {ReusableCard} from "@/components/components";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {ApplicationsChart} from "@/components/charts";
import {ScrollArea} from "@/components/ui/scroll-area";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Button} from "@/components/ui/button";

export default async function Page() {
    const company = await Company()
    const profile = await Profile()

    return (
        <main className="flex-1 overflow-auto p-4 lg:p-8">
            <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {company && company.companyId && (
                    <ReusableCard title={"PROFILE TYPE"}
                                  children2={
                                      <Button>{company.companyId ? "POST A JOB" : "REGISTER AS BUSINESS"}</Button>}/>
                )}
                {profile && profile.profileResume && (
                    <ReusableCard title={"RE-UPLOAD RESUME"}/>
                )}
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