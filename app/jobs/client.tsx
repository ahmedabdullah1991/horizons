"use client"

import * as React from "react"
import {useState} from "react"

import {ReusableCard} from "@/components/components";
import {Label} from "@/components/ui/label";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Briefcase, DollarSign, MapPin} from "lucide-react";
import {Badge} from "@/components/ui/badge";
import Link from "next/link";
import {Button} from "@/components/ui/button";

interface Listing {
    id?: string
    companyId?: string
    companyName?: string,
    createdAt?: Date
    title?: string
    department?: string
    location?: string
    type?: string
}

export default function ListingsComponent({listings}: {listings: Listing[]}) {

    const [selected, setSelected] = useState<Listing | null>(null)
    const handleClick = (listing: Listing) => {
        setSelected(listing)
    }

    return (
        <>
            <div className={"flex-row items-start justify-between container max-w-6xl mx-auto gap-4 p-4 hidden lg:flex"}>
                <div className={"w-1/2 h-[700px] overflow-y-scroll flex flex-col gap-2"}>
                    {listings.map((value, index) => (
                        <div key={index} onClick={() => handleClick(value)}>
                            <MainContent mainContent={{id: value.id, title: value.title, companyName: value.companyName, department: value.department, location: value.location, type: value.type}}/>
                        </div>
                    ))}
                </div>
                <div className={"w-full"}>
                    {selected && (
                        <Content content={{
                            id: selected.id,
                            title: selected.title,
                            companyName: selected.companyName,
                            department: selected.department,
                            location: selected.location,
                            type: selected.type
                        }}/>
                    )}
                </div>
            </div>
            <div className={"overflow-y-scroll h-[700px] max-w-6xl mx-auto space-y-4 p-4 lg:hidden"}>
                {listings.map((value, index) => (
                    <div key={index}>
                        <MainContent mainContent={{id: value.id, title: value.title, companyName: value.companyName, department: value.department, location: value.location, type: value.type}}/>
                    </div>
                ))}
            </div>
        </>
    )
}

const MainContent = ({mainContent}: {mainContent: Listing}) => {
    return (
        <>
            <ReusableCard header={<Header header={{title: mainContent.title, companyName: mainContent.companyName}}/>}>
                <Section section={{department: mainContent.department, location: mainContent.location, type: mainContent.type}}/>
            </ReusableCard>
        </>
    )
}

const Header = ({header}: { header: Listing }) => {
    return (
        <>
            <div className="flex flex-row items-center gap-4">
                <Avatar className="w-12 h-12">
                    <AvatarImage src={""} alt={""}/>
                    <AvatarFallback className={"bg-gradient-to-br from-teal-400 to-cyan-500"}/>
                </Avatar>
                <div className={"flex flex-col"}>
                    <Label>{header.title}</Label>
                    <Label className="text-muted-foreground">{header.companyName}</Label>
                </div>
            </div>
        </>
    )
}

const skills = ["React", "TypeScript", "Next.js", "Tailwind"]

const Section = ({section}: {section: Listing}) => {

    return (
        <>
            <section className="grid gap-4">
                <div className="flex flex-wrap gap-2 text-muted-foreground text-sm">
                    <div className="flex items-center">
                        <MapPin className="mr-1 h-4 w-4"/>
                        {section.department}
                    </div>
                    <div className="flex items-center">
                        <MapPin className="mr-1 h-4 w-4"/>
                        {section.location}
                    </div>
                    <div className="flex items-center">
                        <Briefcase className="mr-1 h-4 w-4"/>
                        {section.type}
                    </div>
                </div>
                <div className={"flex flex-wrap gap-2"}>
                    {skills.map((skill) => (
                        <Badge key={skill} variant="outline" className={"text-foreground"}>
                                {skill}
                            </Badge>
                        )
                    )}
                </div>
            </section>
        </>
    )
}

const Content = ({content}: {content: Listing}) => {
    return (
        <>
            <ReusableCard header={<ContentHeader contentTitle={{title: content.title, companyName: content.companyName}}/>} footer={<ContentFooter contentFooter={{id: content.id}}/>}>
                <ContentSection contentSection={{department: content.department, location: content.location, type: content.type}}/>
            </ReusableCard>
        </>
    )
}

const ContentHeader = ({contentTitle}: {contentTitle: Listing}) => {
    return (
        <>
            <header className={"flex flex-row items-center gap-4"}>
                <Avatar className="w-12 h-12">
                    <AvatarImage src={""} alt={""}/>
                    <AvatarFallback className={"bg-gradient-to-br from-teal-400 to-cyan-500"}/>
                </Avatar>
                <div className={"flex flex-col"}>
                    <Label>{contentTitle.title}</Label>
                    <Label className="text-muted-foreground">{contentTitle.companyName}</Label>
                </div>
            </header>
        </>
    )
}

const ContentFooter = ({contentFooter}: {contentFooter: Listing}) => {
    return (
        <>
            <Link href={{
                pathname: `/jobs/${contentFooter.id}`,

            }}
                scroll={false}
                prefetch={true}
            >
                <Button>APPLY</Button>
            </Link>
        </>
    )
}

const ContentSection = ({contentSection}: {contentSection: Listing}) => {
    return (
        <>
            <section className="grid gap-4">
                <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                    <div className="flex items-center">
                        <MapPin className="mr-1 h-4 w-4 text-black"/>
                        {contentSection.location}
                    </div>
                    <div className="flex items-center">
                        <Briefcase className="mr-1 h-4 w-4 text-black"/>
                        {contentSection.type}
                    </div>
                    <div className="flex items-center">
                        <DollarSign className="mr-1 h-4 w-4 text-black"/>
                        {contentSection.department}
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
                        Horizons is a platform that connects employers and job seekers.
                        It is a place where employers can post job listings and job seekers can apply for the jobs.
                    </Label>
                </div>
            </section>
        </>
    )
}