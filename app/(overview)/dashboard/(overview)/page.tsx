"use server"

import { Data} from "@/lib/datas"
import prisma from "@/lib/db"

import { ReusableCard } from "@/components/components"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ProfilesChart } from "@/components/charts"
import { Badge } from "@/components/ui/badge"
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip"

interface Application {
    applicationsCreatedAt: Date
}

interface Request {
    requestsCreatedAt: Date
    requestsNumber: number
}

export default async function Page() {
    const data = await Data()
    const specificListings = await prisma.listing.findMany({
        where: { request: { some: { profileId: data?.profile?.id } } },
    })

    let { applicationsCreatedAt } = {} as Application
    data?.application?.map((value) => {
        applicationsCreatedAt = value.createdAt
    })

    let { requestsCreatedAt, requestsNumber } = {} as Request
    data?.listings?.map((value) => {
        value.request.map((value) => {
            requestsCreatedAt = value.createdAt
        })
        requestsNumber = value.request.length
    })

    const profileIds: string[] = []
    data?.listings?.map((value) => {
        value.request.forEach((value) => {
            profileIds.push(value.profileId)
        })
    })

    const specificUsers = await prisma.user.findMany({
        where: { profile: { id: { in: profileIds } } },
        select: {
            email: true,
            firstName: true,
            lastName: true,
            profile: {
                select: { application: { select: { listingsId: true } } },
            },
        },
    })

    const listingsIds: string[] = []
    specificUsers.map((value) => {
        value.profile?.application.forEach((value) => {
            listingsIds.push(value.listingsId)
        })
    })
    const specificCompanyListings = await prisma.listing.findMany({
        where: { id: { in: listingsIds } },
    })

    const foo = (data?.profile && [
        {
            title: "UPDATE RESUME",
            link: "",
            description: "You can update your resume here.",
            button: "UPDATE",
        },
        {
            title: "TOTAL APPLICATIONS",
            link: "",
            description: "The total number of applications you have submitted.",
            button: data?.profile?.applications,
        },
    ]) ||
        (data?.company && [
            {
                title: "BUSINESS PROFILE",
                link: "/generate",
                description: "",
                button: "POST A JOB",
            },
            {
                title: "TOTAL ACTIVE LISTINGS",
                link: "",
                description: "Business/Company",
                button: data?.company?.listings,
            },
        ]) || [
            {
                title: "REGISTER AS A BUSINESS",
                link: "/generate",
                description: "Register now to post jobs and hire.",
                button: "REGISTER",
            },
            {
                title: "TOTAL ACTIVE LISTINGS",
                link: "",
                description: "The total number of active listings.",
                button: data?.company?.listings,
            },
        ]

    const dates = []
    const today = new Date()
    const twoMonthsAgo = new Date(today)
    twoMonthsAgo.setMonth(today.getMonth() - 2)

    let dateString
    const profileApplicationsNumber = data?.profile?.applications
    const applicationCreatedAt = applicationsCreatedAt
        ? applicationsCreatedAt.toISOString().split("T")[0]
        : ""
    const requestCreatedAt = requestsCreatedAt
        ? requestsCreatedAt.toISOString().split("T")[0]
        : ""
    while (twoMonthsAgo <= today) {
        dateString = twoMonthsAgo.toISOString().split("T")[0]
        if (applicationCreatedAt === dateString) {
            dates.push({
                date: dateString,
                desktop: profileApplicationsNumber || 0,
                mobile: profileApplicationsNumber || 0,
            })
        } else if (requestCreatedAt === dateString) {
            dates.push({
                date: dateString,
                desktop: requestsNumber,
                mobile: requestsNumber,
            })
        } else {
            dates.push({ date: dateString, desktop: 0, mobile: 0 })
        }
        twoMonthsAgo.setDate(twoMonthsAgo.getDate() + 1)
    }

    const P_C_D = dates.map((value) => ({
        date: value.date,
        desktop: value.desktop,
        mobile: Math.random() * 100,
    }))
    const C_C_D = dates.map((value) => ({
        date: value.date,
        desktop: value.desktop,
        mobile: value.mobile,
    }))
    const R_C_D = dates.map((value) => ({
        date: value.date,
        desktop: Math.random() * 100,
        mobile: Math.random() * 100,
    }))

    return (
        <main className={"flex-1 overflow-auto p-4 lg:p-8 space-y-4"}>
            <div>
                {specificUsers.map((value, index) => (
                    <div key={index}>
                        <div>{value.email}</div>
                    </div>
                ))}
            </div>
            <div className={"grid gap-4 sm:grid-cols-2 lg:grid-cols-4"}>
                {foo.map((value, index) => (
                    <ReusableCard
                        key={index}
                        title={value.title}
                        description={value.description}
                        footer={
                            <Link href={value.link}>
                                <Button variant={"outline"}>
                                    {value.button}
                                </Button>
                            </Link>
                        }
                    />
                ))}
            </div>
            <ProfilesChart
                chartData={
                    (data?.profile && P_C_D) ||
                    (data?.company && C_C_D) ||
                    R_C_D
                }
                chartDataDesktop={1}
                chartDataMobile={1}
                description={
                    data?.profile
                        ? "Showing total applications for the last two months"
                        : "The list of jobs you have posted."
                }
            />
            <ReusableCard
                title={
                    data?.profile ? "APPLICATIONS SUBMITTED" : "LISTINGS POSTED"
                }
                description={
                    data?.profile
                        ? "The list of applications you have submitted."
                        : "The list of jobs you have posted."
                }
                footer={<Button variant={"outline"}>VIEW ALL</Button>}
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
                                    case data?.listings !== null:
                                        return data?.listings
                                            ?.slice(0, 3)
                                            .map((value, index) => (
                                                <TableRow key={index}>
                                                    <TableCell>
                                                        {value.title}
                                                    </TableCell>
                                                    <TableCell>
                                                        {value.department}
                                                    </TableCell>
                                                    <TableCell>
                                                        {value.type}
                                                    </TableCell>
                                                    <TableCell>
                                                        {value.location}
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                    case data?.application !== null:
                                        return specificListings.map(
                                            (value, index) => (
                                                <TableRow key={index}>
                                                    <TableCell>
                                                        {value.title}
                                                    </TableCell>
                                                    <TableCell>
                                                        {value.department}
                                                    </TableCell>
                                                    <TableCell>
                                                        {value.type}
                                                    </TableCell>
                                                    <TableCell>
                                                        {value.location}
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        )
                                    default:
                                        return (
                                            <TableRow>
                                                <TableCell colSpan={4}>
                                                    No data available
                                                </TableCell>
                                            </TableRow>
                                        )
                                }
                            })()}
                        </TableBody>
                    </Table>
                </ScrollArea>
            </ReusableCard>
            {data?.company && (
                <ReusableCard
                    title={"REQUESTS SUBMITTED"}
                    description={"The list of people who have applied."}
                    footer={<Button variant={"outline"}>VIEW ALL</Button>}
                >
                    <ScrollArea className="max-h-[300px]">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead className="text-right">Applied Positions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {specificUsers.map((user, index) => (
                                    <TableRow key={index}>
                                        <TableCell>
                                            {user.firstName} {user.lastName}
                                        </TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell className="flex flex-row gap-2 justify-end">
                                            {specificCompanyListings.map(
                                                (value, index) => (
                                                    <TooltipProvider
                                                        key={index}
                                                    >
                                                        <Tooltip>
                                                            <TooltipTrigger >
                                                                <Badge>
                                                                    {
                                                                        value.title
                                                                    }
                                                                </Badge>
                                                            </TooltipTrigger>
                                                            <TooltipContent>
                                                                <p></p>
                                                            </TooltipContent>
                                                        </Tooltip>
                                                    </TooltipProvider>
                                                )
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </ScrollArea>
                </ReusableCard>
            )}
        </main>
    )
}