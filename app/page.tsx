import React from "react";
import {Orbitron} from "next/font/google";
import {Carousel, CarouselContent, CarouselItem} from "@/components/ui/carousel";
import FlickeringGrid from "@/components/ui/flickering-grid";
import AvatarCircles from "@/components/ui/avatar-circles";
import {Label} from "@/components/ui/label";
import {Avatars, ReusableCard} from "@/components/components";
import {BriefcaseIcon, BuildingIcon, MapPinIcon, Star} from "lucide-react";
import {Badge} from "@/components/ui/badge";
import {Separator} from "@/components/ui/separator";
import {clsx} from "clsx";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";


const orbitron = Orbitron({subsets: ["latin"]})

export default async function Page() {
    return (
        <>
            <main className="relative min-h-screen overflow-hidden">
                <div className="absolute inset-0 z-0 overflow-hidden h-[800px]">
                    <FlickeringGrid
                        className="z-0 relative inset-0 [mask-image:linear-gradient(to_bottom,transparent,white_0%,white_0%,transparent)]"
                        squareSize={6}
                        gridGap={6}
                        color="#0D98BA"
                        maxOpacity={0.6}
                        flickerChance={0.3}
                    />
                </div>

                {/* Content overlay */}
                <div className="relative z-10 min-h-screen flex flex-col">
                    {/* Header */}
                    <section className="w-full flex justify-center items-center">
                        <div className="container px-4 md:px-6 lg:px-8">
                            <div className="w-full max-w-3xl mx-auto pt-36">
                                <div className="flex flex-col gap-6">
                                    <AvatarCirclesComponent/>
                                    <div className="flex flex-col">
                                        <Label
                                            className={`${orbitron.className} text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl flex flex-row items-center`}
                                        >
                                            <Label
                                                className={"text-[#0D98BA] text-6xl font-bold tracking-tighter sm:text-7xl md:text-8xl lg:text-9xl"}>[</Label>HORIZONS<Label
                                            className={"text-[#0D98BA] text-6xl font-bold tracking-tighter sm:text-7xl md:text-8xl lg:text-9xl"}>]</Label>
                                        </Label>
                                        <Label
                                            className={`${orbitron.className} text-xl md:text-2xl underline`}
                                        >
                                            Get hired in days, not months!
                                        </Label>
                                    </div>
                                    <Label className="text-base md:text-lg text-muted-foreground leading-none">
                                        HORIZONS is a dynamic platform that connects
                                        people with companies. Our user-friendly
                                        interface allows you to search and apply
                                        effortlessly.
                                    </Label>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="w-full h-full flex justify-center items-center mt-36">
                        <div className="container px-4 md:px-6 lg:px-8">
                            <div className="relative max-w-3xl w-full mx-auto flex flex-col gap-36">
                                <div className="grid grid-cols-8">
                                    <ReusableCard
                                        className="relative min-h-36 col-span-8 row-span-2 bg-gradient-to-br from-[rgba(13,152,186,0.1  )] to-transparent"
                                        header="remove"
                                        footer="remove"
                                    >
                                        <Carousel>
                                            <CarouselContent>
                                                {review.map((value, index) => (
                                                    <CarouselItem key={index}>
                                                        <div
                                                            className={"flex flex-col justify-between gap-6 h-full pt-6"}>
                                                            <div className={"flex flex-row gap-6"}>
                                                                <Avatar>
                                                                    <AvatarImage>{value.src}</AvatarImage>
                                                                    <AvatarFallback>NA</AvatarFallback>
                                                                </Avatar>
                                                                <div>
                                                                    <Label>AHMED ABDULLAH</Label>
                                                                    <div className={"flex flex-row"}>
                                                                        {Array.from({length: 5}, (_, index) => (
                                                                            <div key={index}>
                                                                                <Star className="w-4 h-4"/>
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <Label
                                                                    className={"text-muted-foreground"}>{value.text}</Label>
                                                            </div>
                                                            <div className={"flex flex-row gap-2"}>
                                                                {value.badges.map((value, index) => (
                                                                    <Badge key={index}>{value.badge}</Badge>
                                                                ))}
                                                            </div>
                                                            <div>
                                                                <Label>Posted on {value.posted}</Label>
                                                            </div>
                                                            <div>
                                                                <div>
                                                                    <Label className="leading-none">
                                                                        RESULTS
                                                                    </Label>
                                                                </div>
                                                                <Separator className="my-1"/>
                                                                <Label>
                                                                    {value.results}
                                                                </Label>
                                                            </div>
                                                        </div>
                                                    </CarouselItem>
                                                ))}
                                            </CarouselContent>
                                        </Carousel>
                                    </ReusableCard>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section>
                        <div className="container max-w-3xl mx-auto px-4 mt-36">
                            <div className="mb-8">
                                <Label className="text-3xl text-center text-primary">
                                    FEATURED JOBS
                                </Label>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {cards.map((card, index) => (
                                    <ReusableCard
                                        key={index}
                                        className="flex flex-col items-center justify-center p-6 h-full shadow-none border-[1px]"
                                        footer={"remove"}
                                        header="remove"
                                    >
                                        <div
                                            className="flex flex-col items-center justify-between h-full text-center space-y-4">
                                            <div
                                                className="w-16 h-16 border-2 rounded-full flex items-center justify-center">
                                                <Avatars/>
                                            </div>
                                            <Label className="text-muted-foreground">
                                                {card.tagline}
                                            </Label>
                                            <Label className="text-base">{card.title.toUpperCase()}</Label>
                                            <div className="flex flex-wrap justify-center gap-2">
                                                {card.badges.map((badge, badgeIndex) => (
                                                    <Badge
                                                        key={badgeIndex}
                                                        variant="outline"
                                                        className={clsx("border-2", {
                                                            "border-[#00008C]":
                                                                badge.includes(
                                                                    "On the Spotlight"
                                                                ),
                                                            "border-[#00009C]":
                                                                badgeIndex === 1,
                                                        })}
                                                    >
                                                        {badge}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </div>
                                    </ReusableCard>
                                ))}
                            </div>
                        </div>
                    </section>
                    <section>
                        <div className="container mx-auto px-4 py-36 max-w-3xl">
                            <div className="mb-8">
                                <Label className="text-3xl text-primary">
                                    RECENT JOB OPENINGS
                                </Label>
                            </div>
                            <div className="space-y-6">
                                {jobs.map((job, index) => (
                                    <ReusableCard
                                        key={index}
                                        className="w-full shadow-none border-[1px]"
                                        title={job.title.toUpperCase()}
                                        description={job.company}
                                        footer={"remove"}
                                    >
                                        <div>
                                            <div className="space-y-2">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center space-x-2 text-muted-foreground">
                                                        <MapPinIcon className="h-4 w-4"/>
                                                        <Label>{job.location}</Label>
                                                    </div>
                                                    <Badge variant="outline" className={"border-[#00009C] border-2"}>
                                                        {job.badges[0]}
                                                    </Badge>
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center space-x-2 text-muted-foreground">
                                                        <BuildingIcon className="h-4 w-4"/>
                                                        <Label>{job.department}</Label>
                                                    </div>
                                                    <Badge variant="outline" className={"border-[#00009C] border-2"}>
                                                        {job.badges[1]}
                                                    </Badge>
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center space-x-2 text-muted-foreground">
                                                        <BriefcaseIcon className="h-4 w-4"/>
                                                        <Label>{job.jobType}</Label>
                                                    </div>
                                                    <Badge variant="outline" className={"border-[#00009C] border-2"}>
                                                        {job.badges[2]}
                                                    </Badge>
                                                </div>
                                            </div>
                                        </div>
                                    </ReusableCard>
                                ))}
                            </div>
                        </div>
                    </section>
                </div>
            </main>
        </>
    )
}

const avatars = [
    {
        imageUrl: "https://avatars.githubusercontent.com/u/16860528",
        profileUrl: "https://github.com/dillionverma",
    },
    {
        imageUrl: "https://avatars.githubusercontent.com/u/20110627",
        profileUrl: "https://github.com/tomonarifeehan",
    },
    {
        imageUrl: "https://avatars.githubusercontent.com/u/106103625",
        profileUrl: "https://github.com/BankkRoll",
    },
    {
        imageUrl: "https://avatars.githubusercontent.com/u/59228569",
        profileUrl: "https://github.com/safethecode",
    },
    {
        imageUrl: "https://avatars.githubusercontent.com/u/59442788",
        profileUrl: "https://github.com/sanjay-mali",
    },
    {
        imageUrl: "https://avatars.githubusercontent.com/u/89768406",
        profileUrl: "https://github.com/itsarghyadas",
    },
];

function AvatarCirclesComponent() {
    return <AvatarCircles numPeople={18} avatarUrls={avatars}/>;
}

const review = [
    {
        src: "https://utfs.io/f/XNbrjM3iH8Zx4a6w5j1szjWachy7KxTJpHMut4eRqLDObm0w",
        posted: "22nd October 2024",
        badges: [
            {badge: "Pro User"}, {badge: "Pro User"}
        ],
        text: '"After struggling for 5 weeks to secure interviews with companies, I applied through HORIZONS and landed an interview in just 2 days!"',
        results: "From 5 weeks to 2 days"
    },
    {
        src: "https://utfs.io/f/XNbrjM3iH8Zxhr1bVTzuHw9M2joZfQV8X7WOYxPSicLm3se4",
        posted: "22nd October 2024",
        badges: [
            {badge: "Pro User"}, {badge: "Pro User"}
        ],
        text: '"I had a fantastic experience using this job site! The interface is user-friendly, making it easy to navigate and find relevant job postings. I landed an interview within a week! Highly recommend it to anyone on the job hunt."',
        results: "From 5 weeks to 2 days"
    },
    {
        src: "https://utfs.io/f/XNbrjM3iH8ZxiuYQi3aUQW0duRlOHfnLbqV7ZG8cBseK5rFk",
        posted: "22nd October 2024",
        badges: [
            {badge: "Pro User"}, {badge: "Pro User"}
        ],
        text: '"Absolutely impressed with this job posting site! Its not just for job seekers; as an employer, I found it easy to post positions and connect with qualified candidates. Great support team too. Will definitely use it again!"',
        results: "From 5 weeks to 2 days"
    },

]

const cards = [
    {
        logo: "Logo 1",
        title: "Lead Software Engineer",
        tagline: "Tech Innovations Inc. - Full-Time",
        badges: ["Remote", "Full-Time", "Software", "On the Spotlight"],
    },
    {
        logo: "Logo 2",
        title: "Mobile Application Developer",
        tagline: "App Solutions LLC - Contract",
        badges: ["Hybrid", "Short-Term", "Mobile", "On the Spotlight"],
    },
    {
        logo: "Logo 3",
        title: "Data Scientist",
        tagline: "Analytics Co. - Full-Time",
        badges: ["On-Site", "Full-Time", "Data", "On the Spotlight"],
    },
    {
        logo: "Logo 4",
        title: "UX/UI Designer",
        tagline: "Creative Minds Agency - Part-Time",
        badges: ["Design", "Freelance", "Creative", "On the Spotlight"],
    },
    {
        logo: "Logo 5",
        title: "Cybersecurity Analyst",
        tagline: "SecureTech Corp - Full-Time",
        badges: ["Remote", "Full-Time", "Security", "On the Spotlight"],
    },
    {
        logo: "Logo 6",
        title: "Cloud Solutions Architect",
        tagline: "Cloudify Solutions - Contract",
        badges: ["Consultant", "Remote", "Cloud", "On the Spotlight"],
    },
]

const jobs = [
    {
        company: "TechCorp",
        title: "Senior Frontend Developer",
        location: "San Francisco, CA",
        department: "Engineering",
        jobType: "Full-time",
        badges: ["React", "TypeScript", "5+ Years"],
    },
    {
        company: "DataSystems Inc.",
        title: "Data Scientist",
        location: "New York, NY",
        department: "Data Analytics",
        jobType: "Full-time",
        badges: ["Python", "Machine Learning", "Big Data"],
    },
    {
        company: "CloudNet",
        title: "DevOps Engineer",
        location: "Austin, TX",
        department: "Infrastructure",
        jobType: "Full-time",
        badges: ["AWS", "Kubernetes", "CI/CD"],
    },
    {
        company: "DesignHub",
        title: "UX/UI Designer",
        location: "Los Angeles, CA",
        department: "Design",
        jobType: "Contract",
        badges: ["Figma", "User Research", "Prototyping"],
    },
    {
        company: "SecureTech",
        title: "Information Security Analyst",
        location: "Washington, D.C.",
        department: "Security",
        jobType: "Full-time",
        badges: ["Cybersecurity", "Risk Assessment", "CISSP"],
    },
    {
        company: "MobileApp Co.",
        title: "iOS Developer",
        location: "Seattle, WA",
        department: "Mobile Development",
        jobType: "Full-time",
        badges: ["Swift", "SwiftUI", "3+ Years"],
    },
    {
        company: "AI Innovations",
        title: "Machine Learning Engineer",
        location: "Boston, MA",
        department: "Artificial Intelligence",
        jobType: "Full-time",
        badges: ["TensorFlow", "PyTorch", "NLP"],
    },
]
