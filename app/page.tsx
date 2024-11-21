import React from "react";
import Link from "next/link";
import {authentication, user} from "@/lib/kinde-imports";
import {Avatars, NavigationTab, ReusableCard} from "@/components/components";
import {LoginLink} from "@kinde-oss/kinde-auth-nextjs/components";
import {Button} from "@/components/ui/button";
import {Label} from "@/components/ui/label";
import AvatarCircles from "@/components/ui/avatar-circles";
import {Orbitron} from "next/font/google";
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious,} from "@/components/ui/carousel";
import {BriefcaseIcon, BuildingIcon, MapPinIcon, Star} from "lucide-react";
import {Badge} from "@/components/ui/badge";
import {Separator} from "@/components/ui/separator";
import {clsx} from "clsx";

const orbitron = Orbitron({subsets: ["latin"]})

export default async function Page() {
    const isUser = await user()
    const authenticated = await authentication()
    return (
        <>
            <NavigationTab>
                <>
                    {!isUser && !authenticated ? (
                        <LoginLink>
                            <Button
                                variant={"link"}
                                className={"text-lg h-[50px] px-[25px]"}
                            >
                                Employers
                            </Button>
                        </LoginLink>
                    ) : (
                        <Link href={"/dashboard"}>
                            <Button
                                variant={"link"}
                                className={"text-lg h-[50px] px-[25px]"}
                            >
                                Dashboard
                            </Button>
                        </Link>
                    )}
                    <Link href={"/jobs"}>
                        <Button
                            className="bg-[#C40234] text-white text-lg h-[50px] px-[25px] hover:bg-transparent shadow hover:bg-[#C40234]">
                            Job Postings
                        </Button>
                    </Link>
                </>
            </NavigationTab>
            <section className="w-full flex justify-center items-center">
                <div className="container px-4 md:px-6 lg:px-8">
                    <div className="w-full max-w-3xl mx-auto pt-36">
                        <div className="flex flex-col gap-6">
                            <AvatarCirclesComponent/>
                            <div className="flex flex-col">
                                <Label
                                    className={`${orbitron.className} text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl`}
                                >
                                    HORIZONS
                                </Label>
                                <Label
                                    className={`${orbitron.className} text-xl md:text-2xl underline`}
                                >
                                    Get hired in days, not months!
                                </Label>
                            </div>
                            <Label className="text-base md:text-lg text-muted-foreground tracking-tight leading-none">
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
                                className="relative min-h-36 col-span-8 row-span-2 text-muted-foreground shadow-xl"
                                header="remove"
                                footer="remove"
                            >
                                <Carousel>
                                    <CarouselContent>
                                        <CarouselItem>
                                            <div className="flex flex-col justify-between gap-6 h-full pt-6">
                                                <div className="flex flex-row gap-6">
                                                    <Avatars/>
                                                    <div>
                                                        <Label className="text-foreground">
                                                            Ahmed Abdullah
                                                        </Label>
                                                        <div className="flex flex-row">
                                                            <Star className="w-4 h-4"/>
                                                            <Star className="w-4 h-4"/>
                                                            <Star className="w-4 h-4"/>
                                                            <Star className="w-4 h-4"/>
                                                            <Star className="w-4 h-4"/>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <Label className="text-muted-foreground tracking-tight">
                                                        {reviews[0]}
                                                    </Label>
                                                </div>
                                                <div className="flex flex-row gap-2">
                                                    <Badge>Pro User</Badge>
                                                    <Badge>
                                                        Verified Purchase
                                                    </Badge>
                                                </div>
                                                <div>
                                                    <Label className="text-muted-foreground">
                                                        Posted on 22nd October,
                                                        2024
                                                    </Label>
                                                </div>
                                                <div>
                                                    <div>
                                                        <Label className="font-medium leading-none">
                                                            RESULTS
                                                        </Label>
                                                    </div>
                                                    <Separator className="my-1"/>
                                                    <div className="">
                                                        <Label>
                                                            From 5 weeks to 2
                                                            days
                                                        </Label>
                                                    </div>
                                                </div>
                                            </div>
                                        </CarouselItem>
                                        <CarouselItem>
                                            <div className="flex flex-col gap-6 pt-6">
                                                <div className="flex flex-row gap-6">
                                                    <Avatars/>
                                                    <div>
                                                        <Label className="text-foreground">
                                                            Ahmed Abdullah
                                                        </Label>
                                                        <div className="flex flex-row">
                                                            <Star className="w-4 h-4"/>
                                                            <Star className="w-4 h-4"/>
                                                            <Star className="w-4 h-4"/>
                                                            <Star className="w-4 h-4"/>
                                                            <Star className="w-4 h-4"/>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <Label className="text-muted-foreground tracking-tight">
                                                        {reviews[1]}
                                                    </Label>
                                                </div>
                                                <div className="flex flex-row gap-2">
                                                    <Badge>Pro User</Badge>
                                                    <Badge>
                                                        Verified Purchase
                                                    </Badge>
                                                </div>
                                                <div>
                                                    <Label className="text-muted-foreground">
                                                        Posted on 22nd October,
                                                        2024
                                                    </Label>
                                                </div>
                                            </div>
                                        </CarouselItem>
                                        <CarouselItem>
                                            <div className="flex flex-col gap-6 pt-6">
                                                <div className="flex flex-row gap-6">
                                                    <Avatars/>
                                                    <div>
                                                        <Label className="text-foreground">
                                                            Ahmed Abdullah
                                                        </Label>
                                                        <div className="flex flex-row">
                                                            <Star className="w-4 h-4"/>
                                                            <Star className="w-4 h-4"/>
                                                            <Star className="w-4 h-4"/>
                                                            <Star className="w-4 h-4"/>
                                                            <Star className="w-4 h-4"/>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <Label className="text-muted-foreground tracking-tight">
                                                        {reviews[2]}
                                                    </Label>
                                                </div>
                                                <div className="flex flex-row gap-2">
                                                    <Badge>Pro User</Badge>
                                                    <Badge>
                                                        Verified Purchase
                                                    </Badge>
                                                </div>
                                                <div>
                                                    <Label className="text-muted-foreground">
                                                        Posted on 22nd October,
                                                        2024
                                                    </Label>
                                                </div>
                                            </div>
                                        </CarouselItem>
                                    </CarouselContent>
                                    <CarouselPrevious/>
                                    <CarouselNext/>
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
                            Featured Jobs
                        </Label>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {cards.map((card, index) => (
                            <ReusableCard
                                key={index}
                                className="flex flex-col items-center justify-center p-6 h-full shadow-xl"
                                footer={"remove"}
                                header="remove"
                            >
                                <div
                                    className="flex flex-col items-center justify-between h-full text-center space-y-4">
                                    <div className="w-16 h-16 border-2 rounded-full flex items-center justify-center">
                                        <Avatars/>
                                    </div>
                                    <Label className="text-muted-foreground">
                                        {card.tagline}
                                    </Label>
                                    <Label className="text-lg">{card.title}</Label>
                                    <div className="flex flex-wrap justify-center gap-2">
                                        {card.badges.map((badge, badgeIndex) => (
                                            <Badge
                                                key={badgeIndex}
                                                variant="outline"
                                                className={clsx("", {
                                                    "border-[#ef233c]":
                                                        badge.includes(
                                                            "On the Spotlight"
                                                        ),
                                                    "border-green-500":
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
                            Recent Job Openings
                        </Label>
                    </div>
                    <div className="space-y-6">
                        {jobs.map((job, index) => (
                            <ReusableCard
                                key={index}
                                className="w-full shadow-xl"
                                title={job.title}
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
                                            <Badge variant="outline">
                                                {job.badges[0]}
                                            </Badge>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-2 text-muted-foreground">
                                                <BuildingIcon className="h-4 w-4"/>
                                                <Label>{job.department}</Label>
                                            </div>
                                            <Badge variant="outline">
                                                {job.badges[1]}
                                            </Badge>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-2 text-muted-foreground">
                                                <BriefcaseIcon className="h-4 w-4"/>
                                                <Label>{job.jobType}</Label>
                                            </div>
                                            <Badge variant="outline">
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

const reviews = [
    '"After struggling for 5 weeks to secure interviews with companies, I applied through HORIZONS and landed an interview in just 2 days!"',
    '"I had a fantastic experience using this job site! The interface is user-friendly, making it easy to navigate and find relevant job postings. I landed an interview within a week! Highly recommend it to anyone on the job hunt."',
    '"Absolutely impressed with this job posting site! Its not just for job seekers; as an employer, I found it easy to post positions and connect with qualified candidates. Great support team too. Will definitely use it again!"',
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