import {BarChart} from 'lucide-react'
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table"
import {ScrollArea} from "@/components/ui/scroll-area"
import {ApplicationsChart} from "@/components/charts";

export default function Dashboard() {
    return (
        <main className="flex-1 overflow-auto p-4 lg:p-8">
            <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {statistics.map((stat) => (<Card key={stat.label}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
                        <BarChart className="h-4 w-4 text-muted-foreground"/>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stat.value}</div>
                        <p className={`text-xs ${stat.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                            {stat.change >= 0 ? '+' : ''}{stat.change}% from last month
                        </p>
                    </CardContent>
                </Card>))}
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
                                {jobPostings.map((job) => (<TableRow key={job.id}>
                                    <TableCell>{job.title}</TableCell>
                                    <TableCell>{job.department}</TableCell>
                                    <TableCell>{job.applicants}</TableCell>
                                    <TableCell>{job.datePosted}</TableCell>
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

export type JobPosting = {
    id: string;
    title: string;
    department: string;
    applicants: number;
    datePosted: string;
};

export type Statistic = {
    label: string;
    value: number;
    change: number;
};

const recentApplications: JobApplication[] = [
    {id: '1', name: 'John Doe', position: 'Software Engineer', date: '2023-11-28', status: 'Pending'},
    {id: '2', name: 'Jane Smith', position: 'Product Manager', date: '2023-11-27', status: 'Reviewed'},
    {id: '3', name: 'Mike Johnson', position: 'UX Designer', date: '2023-11-26', status: 'Interviewed'},
    {id: '4', name: 'Emily Brown', position: 'Data Analyst', date: '2023-11-25', status: 'Offered'},
    {id: '5', name: 'Chris Wilson', position: 'Marketing Specialist', date: '2023-11-24', status: 'Rejected'},
];

const jobPostings: JobPosting[] = [
    {id: '1', title: 'Senior Software Engineer', department: 'Engineering', applicants: 45, datePosted: '2023-11-20'},
    {id: '2', title: 'Product Manager', department: 'Product', applicants: 32, datePosted: '2023-11-22'},
    {id: '3', title: 'UX/UI Designer', department: 'Design', applicants: 28, datePosted: '2023-11-23'},
    {id: '4', title: 'Data Scientist', department: 'Data', applicants: 37, datePosted: '2023-11-21'},
    {id: '5', title: 'Marketing Manager', department: 'Marketing', applicants: 23, datePosted: '2023-11-24'},
];

const statistics: Statistic[] = [
    {label: 'Total Applications', value: 1234, change: 12},
    {label: 'Interviews Scheduled', value: 56, change: -5},
    {label: 'Offers Extended', value: 23, change: 8},
    {label: 'New Job Postings', value: 7, change: 2},
];