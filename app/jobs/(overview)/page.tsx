"use client"

import * as React from "react";
import {useEffect, useState} from "react";
import {Jobs, Company} from "@/lib/data";
import {ReusableCard} from "@/components/components";
import {Label} from "@/components/ui/label";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Briefcase, Clock, DollarSign, MapPin} from "lucide-react";
import {Badge} from "@/components/ui/badge";
import Link from "next/link";
import {Button} from "@/components/ui/button";

interface Listing {
    id: string
    createdAt: Date
    title: string
    department: string
    location: string
    type: string
    companyName: string,
}

interface CompanyId {
    companyId: string
}

export default function Page() {
    useEffect(() => {
        const data = () => {
            Jobs().then((data) => {
                if (data) {
                    setData(data)
                }
            }).catch((error) => {
                console.error(error)
            })
        }
        data()
        const fetchData = async () => {
            try {
                const companyData = await Company();
                if (companyData && companyData.companyId) {
                    setCompany({ companyId: companyData.companyId });
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData().catch((error) => {
            console.error('Error fetching data:', error);
        });
    }, []);

    const handleJobClick = (job: Listing) => {
        setSelectedJob(job)
    }

    const [company, setCompany] = useState<CompanyId>({companyId: ""})
    const [data, setData] = useState<Listing[]>([])
    const [selectedJob, setSelectedJob] = useState<Listing | null>(null)
    const skills = ["React", "TypeScript", "Next.js", "Tailwind"]
    return (<>
            <div
                className={"flex-row items-start justify-between container max-w-6xl mx-auto gap-4 p-4 hidden lg:flex"}>
                <div className={"w-1/2 h-[700px] overflow-y-scroll flex flex-col gap-2"}>
                    {data.map((value, index) => (<div key={index} onClick={() => handleJobClick(value)}>
                        <ReusableCard key={index} title={<>
                            <div className="flex flex-row items-center gap-4">
                                <Avatar className="w-12 h-12">
                                    <AvatarImage src={""} alt={""}/>
                                    <AvatarFallback className={"bg-gradient-to-br from-teal-400 to-cyan-500"}/>
                                </Avatar>
                                <div className="flex flex-col">
                                    <Label className="text-base">{value.title}</Label>
                                    <Label className="text-muted-foreground">{value.department}</Label>
                                </div>
                            </div>
                        </>}
                        >
                            <section className="grid gap-4">
                                <div className="flex flex-wrap gap-2 sm:gap-4 text-muted-foreground text-sm">
                                    <div className="flex items-center">
                                        <MapPin className="mr-1 h-4 w-4"/>
                                        {value.location}
                                    </div>
                                    <div className="flex items-center text-gray-500">
                                        <Briefcase className="mr-1 h-4 w-4"/>
                                        {value.type}
                                    </div>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {skills.map((skill) => (
                                        <Badge key={skill} variant="outline" className={"text-foreground"}>
                                            {skill}
                                        </Badge>))}
                                </div>
                            </section>
                        </ReusableCard>
                    </div>))}
                </div>
                <div className={"w-full"}>
                    {selectedJob && (<ReusableCard title={<>
                        <div className="flex flex-row items-center gap-4">
                            <Avatar className="w-12 h-12">
                                <AvatarImage src={""} alt={""}/>
                                <AvatarFallback className={"bg-gradient-to-br from-teal-400 to-cyan-500"}/>
                            </Avatar>
                            <div className="flex flex-col">
                                <Label className="text-base">{selectedJob.title}</Label>
                                <Label className="text-muted-foreground">{selectedJob.department}</Label>
                            </div>
                        </div>
                    </>}
                                                   children2={company?.companyId ? null : <Link
                                                       href={{
                                                           pathname: `/jobs/${selectedJob.id}`,

                                                       }}
                                                       scroll={false}
                                                       prefetch={true}
                                                   >
                                                       <Button>APPLY</Button>
                                                   </Link>}
                    >
                        <section className="grid gap-4">
                            <div className="flex flex-wrap gap-2 sm:gap-4 text-sm">
                                <div className="flex items-center">
                                    <MapPin className="mr-1 h-4 w-4"/>
                                    {selectedJob.location}
                                </div>
                                <div className="flex items-center">
                                    <Briefcase className="mr-1 h-4 w-4"/>
                                    {selectedJob.type}
                                </div>
                                <div className="flex items-center">
                                    <DollarSign className="mr-1 h-4 w-4"/>
                                    {selectedJob.department}
                                </div>
                                <div className="flex items-center">
                                    <Clock className="mr-1 h-4 w-4"/>
                                    {selectedJob.createdAt.toLocaleDateString()}
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {skills.map((skill) => (
                                    <Badge key={skill} variant="outline">
                                        {skill}
                                    </Badge>
                                ))}
                            </div>
                            <div className={"text-muted-foreground"}>
                                <Label>
                                    The sun set behind the mountains, casting a golden hue over the landscape. Birds
                                    flew in formation, signaling the end of the day. As the stars began to appear,
                                    the
                                    air grew cooler, and the peaceful silence settled in.
                                </Label>
                            </div>
                        </section>
                    </ReusableCard>)}
                </div>
            </div>
            <div className={"px-4"}>
                <div className={"overflow-y-scroll h-[685px] max-w-6xl mx-auto space-y-4 p-4 lg:hidden"}>
                    {data.map((value, index) => (<div key={index}>
                        <ReusableCard title={<>
                            <div className="flex flex-row items-center gap-4">
                                <Avatar className="w-12 h-12">
                                    <AvatarImage src={""} alt={""}/>
                                    <AvatarFallback className={"bg-gradient-to-br from-teal-400 to-cyan-500"}/>
                                </Avatar>
                                <div className="flex flex-col">
                                    <Label className="text-base">{value.title}</Label>
                                    <Label className="text-muted-foreground">{value.department}</Label>
                                </div>
                            </div>
                        </>}
                                      children2={<Link
                                          href={{
                                              pathname: `/jobs/${value.id}`,
                                          }}
                                          scroll={false}
                                          prefetch={true}
                                      >
                                          <Button>APPLY</Button>
                                      </Link>}
                        >
                            <section className="grid gap-4">
                                <div className="flex flex-wrap gap-2 sm:gap-4 text-sm">
                                    <div className="flex items-center">
                                        <MapPin className="mr-1 h-4 w-4"/>
                                        {value.location}
                                    </div>
                                    <div className="flex items-center">
                                        <Briefcase className="mr-1 h-4 w-4"/>
                                        {value.type}
                                    </div>
                                    <div className="flex items-center">
                                        <DollarSign className="mr-1 h-4 w-4"/>
                                        {value.department}
                                    </div>
                                    <div className="flex items-center">
                                        <Clock className="mr-1 h-4 w-4"/>
                                        {value.createdAt.toLocaleDateString()}
                                    </div>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {skills.map((skill) => (
                                        <Badge key={skill} variant="outline">
                                            {skill}
                                        </Badge>
                                    ))}
                                </div>
                                <div className={"text-muted-foreground"}>
                                    <Label>
                                        The sun set behind the mountains, casting a golden hue over the landscape. Birds
                                        flew in formation, signaling the end of the day. As the stars began to appear,
                                        the
                                        air grew cooler, and the peaceful silence settled in.
                                    </Label>
                                </div>
                            </section>
                        </ReusableCard>
                    </div>))}
                </div>
            </div>
        </>

    )
}