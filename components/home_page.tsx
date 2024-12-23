"use client"

import {Orbitron} from "next/font/google"
import {Label} from "@/components/ui/label"
import AvatarCircles from "@/components/ui/avatar-circles"
import {ReusableCard} from "@/components/components"
import {Search} from "lucide-react"
import {Badge} from "@/components/ui/badge"
import {clsx} from "clsx"
import {Card, CardContent} from "@/components/ui/card"
import {CartesianGrid, Line, LineChart} from "recharts"
import {ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent,} from "@/components/ui/chart"
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";

const orbitron = Orbitron({subsets: ["latin"]})

export default function HomePage() {
    return (
        <>
            <ContentSections/>
            <Company_Section/>
        </>
    )
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
},]

function AvatarCirclesComponent() {
    return <AvatarCircles numPeople={18} avatarUrls={avatars}/>;
}

const Company_Section = () => {
    return <section className={"container max-w-4xl mb-36 mx-auto sm:space-y-48"}>
        <div className="relative hidden sm:block px-4">
            <ReusableCard header={<div className={"flex flex-col"}>
                <Label className={"text-xl"}>REAL-TIME PERFORMANCE METRICS</Label>
                <Label className={"text-sm"}>IMPROVED EFFICIENCY AND ACCURACY</Label>
            </div>} className="aspect-video"/>
            <Component/>
        </div>
        <div className="relative block sm:hidden px-4">
            <ReusableCard header={<div className={"flex flex-col"}>
                <Label className={"text-base leading-none"}>REAL-TIME PERFORMANCE METRICS</Label>
                <Label className={"text-xs"}>IMPROVED EFFICIENCY AND ACCURACY</Label>
            </div>} className="h-72 overflow-hidden">
                <Component/>
            </ReusableCard>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-4 parent">
            <ReusableCard className="row-span-1 lg:row-span-2 magicpattern" header={
                <div className={"flex flex-col gap-2"}>
                    <Label className={"text-xl"}>GLOBAL REACH</Label>
                    <Label className={"text-muted-foreground"}>CONNECT WITH TOP TALENT FROM ACROSS THE WORLD. OUR PLATFORM GIVES YOU ACCESS TO A DIVERSE POOL OF CANDIDATES.</Label>
                </div>
            }>

            </ReusableCard>
            <ReusableCard
                className="row-span-1"
                header={
                    <div className={"flex flex-col gap-2"}>
                        <Label className={"text-xl"}>TARGETED HIRING</Label>
                        <Label className={"text-muted-foreground"}>USE OUR ADVANCED FILTERS AND AI-POWERED MATCHING TO FIND THE PERFECT CANDIDATES FOR YOUR SPECIFIC NEEDS.</Label>
                    </div>
                }
            >
            </ReusableCard>
            <ReusableCard
                className="row-span-1 lg:row-span-2 max-h-96 overflow-hidden"
                header={
                    <div className={"flex flex-col gap-2 bg-card z-10"}>
                        <Label className={"text-xl"}>PREMIUM ANALYTICS</Label>
                        <Label className={"text-muted-foreground"}>GAIN INSIGHTS INTO YOU HIRING PROCESS WITH OUR ANALYTICS AND REPORTING TOOLS.</Label>
                    </div>
                }
            >
                <div className={"flex flex-col gap-2"}>
                    <ChartContainer config={chartConfig}><LineChart accessibilityLayer data={chartLengthX} margin={{top: 20,left: 12,right: 12}} className={"border rounded-lg -rotate-12 bg-gradient-to-tl from-card to-transparent"}>
                        <CartesianGrid vertical={false}/>
                        <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot"/>}/>
                        <Line dataKey="mobile" type={"bump"} stroke="var(--color-mobile)" strokeWidth={2} dot={{fill: "var(--color-mobile)",display: "none",}} activeDot={{r: 6,}}></Line>
                        <Line dataKey="desktop" type={"bump"} stroke="var(--color-desktop)" strokeWidth={2} dot={{fill: "var(--color-desktop)", display: "none",}} activeDot={{r: 6,}}></Line></LineChart>
                    </ChartContainer>
                    <ReusableCard className={"ml-12 w-full aspect-video -rotate-12"}/>
                </div>
            </ReusableCard>
            <ReusableCard
                className="row-span-1"
                header={
                    <div className={"flex flex-col gap-2"}>
                        <Label className={"text-xl"}>FAST RESULTS</Label>
                        <Label className={"text-muted-foreground"}>GET YOUR JOB POSTINGS IN FRONT OF QUALIFIED CANDIDATES QUICKLY. REDUCE TIME-TO-HIRE AND FILL POSITIONS FASTER.</Label>
                    </div>
                }
            />
        </div>
    </section>
}

const chartLengthX = Array.from({length: 30}, (_, index) => ({
    desktop: index + 1 + Math.floor(Math.random() * 5),
    mobile: index + 5 + Math.floor(Math.random() * 5),
}))

const chartConfig = {
    mobile: {
        label: "Impressions",
        color: "hsl(var(--chart-2))",
    },
    desktop: {
        label: "Clicks",
        color: "hsl(var(--chart-1))",
    },
} satisfies ChartConfig

export function Component() {
    return (
        <Card className={"left-0 bottom-0 w-full min-w-96 translate-x-10 translate-y-2 sm:absolute sm:translate-y-28 sm:-translate-x-28 flip"}>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <LineChart
                        accessibilityLayer
                        data={chartLengthX}
                        margin={{
                            top: 20,
                            left: 12,
                            right: 12,
                        }}
                    >
                        <CartesianGrid vertical={false}/>
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="dot"/>}
                        />
                        <Line
                            dataKey="mobile"
                            type={"bump"}
                            stroke="var(--color-mobile)"
                            strokeWidth={2}
                            dot={{
                                fill: "var(--color-mobile)",
                                display: "none",
                            }}
                            activeDot={{
                                r: 6,
                            }}
                        >
                        </Line>
                        <Line
                            dataKey="desktop"
                            type={"bump"}
                            stroke="var(--color-desktop)"
                            strokeWidth={2}
                            dot={{
                                fill: "var(--color-desktop)",
                                display: "none",
                            }}
                            activeDot={{
                                r: 6,
                            }}
                        >
                        </Line>
                    </LineChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
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
            <div className="flex flex-col">
                <Label
                    className={`${orbitron.className} text-5xl font-bold tracking-tighter lg:text-7xl flex flex-row items-center`}
                >
                    HORIZONS
                </Label>
                <Label
                    className={`${orbitron.className} text-xl lg:text-2xl underline`}
                >
                    GET HIRED IN DAYS, NOT MONTHS!
                </Label>
            </div>
            <Label className="text-sm lg:text-base text-muted-foreground">
                HORIZONS IS A DYNAMIC PLATFORM THAT CONNECTS PEOPLE WITH COMPANIES.
                OUR USER-FRIENDLY INTERFACE ALLOWS YOU TO SEARCH AND APPLY EFFORTLESSLY.
            </Label>
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