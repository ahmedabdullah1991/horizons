"use server"

import Link from "next/link";

import {Applications, Company, Jobs, Listings, Profile} from "@/lib/data";

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

export default async function Page() {
    const company = await Company()
    const profile = await Profile()
    const listings = await Listings()
    const jobs = await Jobs()

    let {listingId, createdAt} = {} as ApplicationModel
    const applications = await Applications({profileId: profile?.profileID})

    applications?.profileData?.map((value) => {
        listingId = value.listingId
        createdAt = value.createdAt
    })

    let profileApplicationsNumber
    if (profile && profile.profileApplications !== undefined) {
        profileApplicationsNumber = profile.profileApplications
    } else {
        profileApplicationsNumber = 0
    }
    const filteredJobs = jobs?.filter((data) => data.id === listingId)
    const applicationCreatedAt = createdAt? createdAt.toISOString().split('T')[0] : null

    const today = new Date()
    const threeMonthsAgo = new Date(today)
    threeMonthsAgo.setMonth(today.getMonth() - 2)

    const dates = []

    let dateString
    while (threeMonthsAgo <= today) {
        dateString = threeMonthsAgo.toISOString().split('T')[0]
        if (applicationCreatedAt === dateString) {
            dates.push({date: dateString, desktopNumbers: profileApplicationsNumber, mobileNumbers: profileApplicationsNumber})
        } else {
            dates.push({date: dateString, desktopNumbers: 0, mobileNumbers: 0})
        }
        threeMonthsAgo.setDate(threeMonthsAgo.getDate() + 1)
    }
    const chartData = dates.map((value) => ({
        date: value.date, desktop: value.desktopNumbers, mobile: value.mobileNumbers
    }))

    return (<main className="flex-1 overflow-auto p-4 lg:p-8 space-y-4">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {company && company.companyId && (<>
                    <ReusableCard title={"PROFILE TYPE"}
                                  description={"Business/Company"}
                                  children2={<Link href={"/generate"}>
                                      <Button>{company.companyId ? "POST A JOB" : "REGISTER AS BUSINESS"}</Button>
                                  </Link>}
                    />
                    <ReusableCard
                        title={"TOTAL ACTIVE LISTINGS"}
                        description={"The total number of jobs you have posted."}
                        children2={<div className={"w-full flex flex-col justify-end"}>
                            <Link href={""} className={"text-right"}>
                                <Button variant={"outline"}
                                        className={"w-1/2 text-right"}>{listings?.length}</Button>
                            </Link>
                        </div>}
                    />
                </>

            )}
            {profile && profile.profileResume && (<>
                <ReusableCard title={"UPDATE RESUME"}/>
                <ReusableCard title={"TOTAL APPLICATIONS"}
                              description={"The total number of applications you have submitted."}
                              children2={<div className={"w-full flex flex-col justify-end"}>
                                  <Link href={""} className={"text-right"}>
                                      <Button variant={"outline"}
                                              className={"w-1/2 text-right"}>{profileApplicationsNumber}</Button>
                                  </Link>
                              </div>}
                />
            </>)}

        </div>
        {profile && <ProfilesChart chartData={chartData} chartDataDesktop={profileApplicationsNumber}
                                   chartDataMobile={profileApplicationsNumber}/>}
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
    </main>)
}