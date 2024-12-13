"use server"

import {Applications, Company, Jobs, Listings, Profile, Requests} from "@/lib/data";

import prisma from "@/lib/db";
import {ReusableCard} from "@/components/components";
import {ProfilesChart} from "@/components/charts";
import {ScrollArea} from "@/components/ui/scroll-area";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Button} from "@/components/ui/button";

interface ApplicationModel {
    applicantsId: string
    requestsId: string
    listingId: string
    createdAt: Date
}

interface RequestModel {
    applicantsId: string
    requestsId: string
    ClistingId: string
    CcreatedAt: Date
}

export default async function Page() {

    const company = await Company()
    const profile = await Profile()
    const listings = await Listings()
    const jobs = await Jobs()

    let {listingId, createdAt} = {} as ApplicationModel
    const applications = await Applications({profileId: profile?.profileID})
    const requests = await Requests({requestsId: company?.companyId})

    applications?.profileData?.map((value) => {
        listingId = value.listingId
        createdAt = value.createdAt
    })

    let {ClistingId, applicantsId} = {} as RequestModel
    requests?.requestsData?.map((value)=> {
        ClistingId = value.listingId
        applicantsId = value.applicantsId
    })
    let user
    try {
        const profile = await prisma.profile.findUnique({
            where: {
                id: applicantsId
            }, select: {
                userId: true,
            }
        })
        if (profile) {
            user = await prisma.user.findUnique({
                where: {
                    id: profile.userId
                }, select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    email: true,
                }
            })
        }
    }
    catch (error) {
        console.error(error)
    }

    let profileApplicationsNumber
    if (profile && profile.profileApplications !== undefined) {
        profileApplicationsNumber = profile.profileApplications
    } else {
        profileApplicationsNumber = 0
    }
    const filteredJobs = jobs?.filter((data) => data.id === listingId)
    const cFilteredJobs = jobs?.filter((data) => data.id === ClistingId)
    const applicationCreatedAt = createdAt ? createdAt.toISOString().split('T')[0] : null

    const today = new Date()
    const threeMonthsAgo = new Date(today)
    threeMonthsAgo.setMonth(today.getMonth() - 2)

    const dates = []

    let dateString
    while (threeMonthsAgo <= today) {
        dateString = threeMonthsAgo.toISOString().split('T')[0]
        if (applicationCreatedAt === dateString) {
            dates.push({
                date: dateString,
                desktopNumbers: profileApplicationsNumber,
                mobileNumbers: profileApplicationsNumber
            })
        } else {
            dates.push({date: dateString, desktopNumbers: 0, mobileNumbers: 0})
        }
        threeMonthsAgo.setDate(threeMonthsAgo.getDate() + 1)
    }
    const profileChartData = dates.map((value) => ({
        date: value.date, desktop: value.desktopNumbers, mobile: value.mobileNumbers
    }))
    const companyChartData = dates.map((value) => ({
        date: value.date, desktop: Math.random() * 100, mobile: Math.random() * 100
    }))
    const randomChartData = dates.map((value) => ({
        date: value.date, desktop: Math.random() * 100, mobile: Math.random() * 100
    }))

    const foo = profile && [
        {title: "UPDATE RESUME", description: "You can update your resume here.", button: "UPDATE"},
        {
            title: "TOTAL APPLICATIONS",
            description: "The total number of applications you have submitted.",
            button: profileApplicationsNumber
        },
    ] || company && [
        {title: "BUSINESS PROFILE", description: "The total number of active listings.", button: "POST A JOB"},
        {title: "TOTAL ACTIVE LISTINGS", description: "Business/Company", button: listings?.length},
    ] || [
        {
            title: "REGISTER AS A BUSINESS/COMPANY",
            description: "Register now to post jobs and hire.",
            button: "REGISTER"
        },
        {title: "TOTAL ACTIVE LISTINGS", description: "The total number of active listings.", button: listings?.length},
    ]

    return (<main className="flex-1 overflow-auto p-4 lg:p-8 space-y-4">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {foo.map((value, index) => (
                <ReusableCard key={index} title={value.title} description={value.description}
                              footer={<Button variant={"outline"} className={"w-1/2"}>{value.button}</Button>}/>
            ))}
        </div>
        <ProfilesChart chartData={(profile && profileChartData) || (company && companyChartData) || (randomChartData)} chartDataDesktop={1}
                                   chartDataMobile={1}/>
        <ReusableCard
            title={profile && profile.profileID ? "APPLICATIONS SUBMITTED" : "LISTINGS POSTED"}
            description={profile && profile.profileID ? "The list of applications you have submitted." : "The list of jobs you have posted."}
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
                        {(() => {
                            switch (true) {
                                case listings && listings.length > 0:
                                    return listings.slice(0, 3).map((value, index) => (
                                        <TableRow key={`listing-${index}`}>
                                            <TableCell>{value.title}</TableCell>
                                            <TableCell>{value.department}</TableCell>
                                            <TableCell>{value.type}</TableCell>
                                            <TableCell>{value.location}</TableCell>
                                        </TableRow>));
                                case applications && applications.profileData.length > 0:
                                    return filteredJobs?.map((value, index) => (<TableRow key={index}>
                                        <TableCell>{value.title}</TableCell>
                                        <TableCell>{value.department}</TableCell>
                                        <TableCell>{value.type}</TableCell>
                                        <TableCell>{value.location}</TableCell>
                                    </TableRow>))
                                default:
                                    return (<TableRow>
                                        <TableCell colSpan={4}>No data available</TableCell>
                                    </TableRow>);
                            }
                        })()}
                    </TableBody>
                </Table>
            </ScrollArea>
        </ReusableCard>
        {company && (
            <>
                <ReusableCard title={"APPLICATION REQUESTS"} description={"The list of people who have applied."}>
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
                                {cFilteredJobs?.map((value, index)=> (
                                    <TableRow key={index}>
                                        <TableCell>{value.title}</TableCell>
                                        <TableCell>{value.department}</TableCell>
                                        <TableCell>{value.type}</TableCell>
                                        <TableCell>{value.location}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                            {user?.email}
                        </Table>
                    </ScrollArea>
                </ReusableCard>
            </>
        )}
    </main>)
}