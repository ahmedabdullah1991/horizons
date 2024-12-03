"use client"

import * as React from "react";
import {useEffect, useState} from "react";
import {Jobs} from "@/lib/data";
import {ReusableCard} from "@/components/components";
import {Label} from "@/components/ui/label";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Briefcase, MapPin} from "lucide-react";
import {Badge} from "@/components/ui/badge";


export default function Page() {

    interface Listing {
        createdAt: Date
        title: string
        department: string
        location: string
        type: string
        companyName: string,
    }

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
    }, []);

    const handleJobClick = (job: Listing) => {
        setSelectedJob(job)
    }

    const [data, setData] = useState<Listing[]>([])
    const [selectedJob, setSelectedJob] = useState<Listing | null>(null)
    const skills = ["React", "TypeScript", "Next.js", "Tailwind"]
    return (
        <>
            <div className={"flex flex-row items-start justify-between container max-w-6xl mx-auto gap-4 p-4"}>
                <div className={"w-1/2 h-96 overflow-y-scroll flex flex-col gap-2"}>
                    {data.map((value, index) => (
                        <div key={index} onClick={() => handleJobClick(value)}>
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
                            </>} footer={"remove"}
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
                                            </Badge>
                                        ))}
                                    </div>
                                </section>
                            </ReusableCard>
                        </div>
                    ))}
                </div>
                <div className={"w-full"}>
                    {selectedJob && (
                        <ReusableCard title={selectedJob.title} description={selectedJob.department}/>
                    )}
                </div>
            </div>
        </>

    )
}