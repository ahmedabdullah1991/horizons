"use client"

import * as React from "react";
import {useEffect, useState} from "react";
import {Jobs} from "@/lib/data";
import {ReusableCard} from "@/components/components";
import {Label} from "@/components/ui/label";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {BookmarkPlus, Briefcase, MapPin} from "lucide-react";
import {Badge} from "@/components/ui/badge";
import Link from "next/link";
import {Button} from "@/components/ui/button";

export default function Page() {

    interface Listing {
        id: string
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
            <div className={"flex-row items-start justify-between container max-w-6xl mx-auto gap-4 p-4 hidden lg:flex"}>
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
                        <ReusableCard title={selectedJob.title} description={selectedJob.department}
                            children2={<Link
                                href={{
                                    pathname: `/jobs/${selectedJob.id}`,
                                }}
                                scroll={false}
                                prefetch={true}
                            >
                                <Button>APPLY</Button>
                            </Link>}
                        />
                    )}
                </div>
            </div>
            <div className={"overflow-y-scroll max-w-6xl mx-auto space-y-4 p-4 lg:hidden"}>
                {data.map((value, index)=> (
                    <div key={index}>
                        <ReusableCard
                            title={
                                <div className="flex flex-row items-center gap-4">
                                    <Avatar className="w-16 h-16">
                                        <AvatarImage src={""} alt={""} />
                                        <AvatarFallback className={"bg-gradient-to-br from-teal-400 to-cyan-500"} />
                                    </Avatar>
                                    <div className="flex-1">
                                        <h2 className="text-2xl font-bold">{value.title}</h2>
                                        <p className="text-gray-500">{value.department}</p>
                                    </div>
                                    <Button variant="outline" size="icon" className="hidden sm:flex">
                                        <BookmarkPlus className="h-5 w-5" />
                                        <span className="sr-only">Bookmark</span>
                                    </Button>
                                </div>
                            }
                        ></ReusableCard>
                    </div>
                ))}
            </div>
        </>

    )
}