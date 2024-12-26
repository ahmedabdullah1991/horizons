"use client"

import {Orbitron} from "next/font/google"
import {Label} from "@/components/ui/label"
import AvatarCircles from "@/components/ui/avatar-circles"
import {ReusableCard} from "@/components/components"
import {Building, Search, UsersRound} from "lucide-react"
import {Badge} from "@/components/ui/badge"
import {clsx} from "clsx"
import {Input} from "@/components/ui/input"
import {Button} from "@/components/ui/button"

const orbitron = Orbitron({subsets: ["latin"]})

export default function HomePage() {
    return (<>
            <ContentSections/>
        </>)
}

const avatars = [{
    imageUrl: "https://utfs.io/f/XNbrjM3iH8ZxDozDNneXZdBlgEi4kTVbW5hO2vqD9nQy6pH3",
    profileUrl: "https://github.com/ahmedabdullah1991"
}, {
    imageUrl: "https://utfs.io/f/XNbrjM3iH8Zxihh5RuuaUQW0duRlOHfnLbqV7ZG8cBseK5rF",
    profileUrl: "https://github.com/ahmedabdullah1991"
}, {
    imageUrl: "https://utfs.io/f/XNbrjM3iH8Zx8MQ1HpOLiodeyn5R0kDE7mP3xjNsIAOzBJrC",
    profileUrl: "https://github.com/ahmedabdullah1991"
}, {
    imageUrl: "https://utfs.io/f/XNbrjM3iH8Zx7mMpy1zg3RIGAUFbkm4eONPBl5EqwJzaiQcx",
    profileUrl: "https://github.com/ahmedabdullah1991"
}, {
    imageUrl: "https://utfs.io/f/XNbrjM3iH8ZxrEH4N8lPodbs5Hwj2nTlIhS764Bpqe9rAayE",
    profileUrl: "https://github.com/ahmedabdullah1991"
}]

function AvatarCirclesComponent() {
    return <AvatarCircles numPeople={18} avatarUrls={avatars}/>;
}

const featuredCards = [{
    logo: "Logo 1",
    title: "LEAD SOFTWARE ENGINEER",
    tagline: "TECH INNOVATIONS INC. - FULL-TIME",
    badges: ["REMOTE", "FULL-TIME", "SOFTWARE", "ON THE SPOTLIGHT"],
}, {
    logo: "Logo 2",
    title: "MOBILE APPLICATION DEVELOPER",
    tagline: "APP SOLUTIONS LLC - CONTRACT",
    badges: ["HYBRID", "SHORT-TERM", "MOBILE", "ON THE SPOTLIGHT"],
}, {
    logo: "Logo 3",
    title: "DATA SCIENTIST",
    tagline: "ANALYTICS CO. - FULL-TIME",
    badges: ["ON-SITE", "FULL-TIME", "DATA", "ON THE SPOTLIGHT"],
}, {
    logo: "Logo 4",
    title: "UX/UI DESIGNER",
    tagline: "CREATIVE MINDS AGENCY - PART-TIME",
    badges: ["DESIGN", "FREELANCE", "CREATIVE", "ON THE SPOTLIGHT"],
}, {
    logo: "Logo 5",
    title: "CYBERSECURITY ANALYST",
    tagline: "SECURETECH CORP - FULL-TIME",
    badges: ["REMOTE", "FULL-TIME", "SECURITY", "ON THE SPOTLIGHT"],
}, {
    logo: "Logo 6",
    title: "CLOUD SOLUTIONS ARCHITECT",
    tagline: "CLOUDIFY SOLUTIONS - CONTRACT",
    badges: ["CONSULTANT", "REMOTE", "CLOUD", "ON THE SPOTLIGHT"],
}]

const ContentSections = () => {
    return (<section className={"container max-w-6xl mx-auto px-4 flex flex-col space-y-40 my-36"}>
        <div className="flex flex-col gap-6">
            <AvatarCirclesComponent/>
            <div className={`flex flex-col gap-6 ${orbitron.className}`}>
                <Label
                    className={`text-5xl font-bold tracking-tighter lg:text-7xl flex flex-row items-center`}
                >
                    HORIZONS
                </Label>
                <section className={"flex flex-col text-white/50"}>
                    <div className={"flex-wrap gap-2"}>
                        <div className={"flex flex-row flex-wrap items-center gap-2"}>
                            <Label className={"text-xl sm:text-2xl"}>PLATFORM CREATED WITH</Label>
                        </div>
                        <div className={"flex flex-row flex-wrap gap-2 items-center"}>
                            <UsersRound className={"text-[#1F1FFF]"} size={40}/><Label
                            className={"text-xl sm:text-2xl"}>INDIVIDUALS AND</Label>
                        </div>
                        <div className={"flex flex-row flex-wrap items-center gap-2"}>
                            <Building/><Label className={"text-xl sm:text-2xl text-[#1F1FFF]"}>BUSINESSES</Label>
                        </div>
                    </div>
                    <div>
                        <Label className={"text-xl sm:text-2xl"}>IN MIND</Label>
                    </div>
                </section>
            </div>
        </div>
        <div className={"flex flex-row gap-2"}>
            <Input placeholder={"SEARCH JOBS"} className={"text-sm"}/>
            <Button className={"text-sm text-white bg-[#0000B8]"}>SEARCH<Search/></Button>
        </div>
        <div>
            <Label className={"text-4xl font-bold"}>FEATURED JOBS</Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
                {featuredCards.map((card, index) => (<ReusableCard
                    key={index}
                    className="flex flex-col items-center justify-center p-6 h-full"
                >
                    <div
                        className="flex flex-col items-center justify-between h-full text-center space-y-4">
                        <div
                            className="w-16 h-16 rounded-full flex items-center justify-center bg-gradient-to-br from-teal-400 to-cyan-500">

                        </div>
                        <Label className="text-muted-foreground">
                            {card.tagline}
                        </Label>
                        <Label className="text-base">{card.title.toUpperCase()}</Label>
                        <div className="flex flex-wrap justify-center gap-2">
                            {card.badges.map((badge, badgeIndex) => (<Badge
                                key={badgeIndex}
                                variant="outline"
                                className={clsx("border", {
                                    "border-[#0000B8] border-2": badge.includes("ON THE SPOTLIGHT"),
                                })}
                            >
                                {badge}
                            </Badge>))}
                        </div>
                    </div>
                </ReusableCard>))}
            </div>
        </div>
    </section>)
}