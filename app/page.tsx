import React from "react";
import {Orbitron} from "next/font/google";
import {Carousel, CarouselContent, CarouselItem} from "@/components/ui/carousel";
import AvatarCircles from "@/components/ui/avatar-circles";
import {Label} from "@/components/ui/label";
import {ReusableCard} from "@/components/components";
import {Star} from "lucide-react";
import {Badge} from "@/components/ui/badge";
import {Separator} from "@/components/ui/separator";
import {clsx} from "clsx";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Button} from "@/components/ui/button";

const orbitron = Orbitron({subsets: ["latin"]})

export default async function Page() {
    return (<>
        <main className="relative min-h-screen overflow-hidden">
            {/*<div className="absolute inset-0 z-0 overflow-hidden h-[800px]">
                </div>*/}

            <div className="relative z-10 min-h-screen flex flex-col">
                <section>
                    <div className="container max-w-3xl mx-auto px-4 mt-36">
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
                                    Get hired in days, not months!
                                </Label>
                            </div>
                            <Label className="text-sm lg:text-base">
                                HORIZONS is a dynamic platform that connects
                                people with companies. Our user-friendly
                                interface allows you to search and apply
                                effortlessly.
                            </Label>
                            <Button className={"bg-[#0000B8] w-max"} variant={"link"}>REGISTER</Button>
                        </div>
                    </div>
                </section>
                <section className="w-full h-full flex justify-center items-center mt-36">
                    <div className="relative max-w-3xl w-full mx-auto flex flex-col gap-36 px-4">
                        <ReusableCard
                            className="relative min-h-36 col-span-8 row-span-2"
                            header="remove"
                            footer="remove"
                        >
                            <Carousel>
                                <CarouselContent>
                                    {review.map((value, index) => (<CarouselItem key={index}>
                                        <div
                                            className={"flex flex-col justify-between gap-2 lg:gap-4 h-full pt-6"}>
                                            <div className={"flex flex-row gap-6"}>
                                                <Avatar>
                                                    <AvatarImage>{value.src}</AvatarImage>
                                                    <AvatarFallback>NA</AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <Label className={"text-sm"}>AHMED ABDULLAH</Label>
                                                    <div className={"flex flex-row"}>
                                                        {Array.from({length: 5}, (_, index) => (<div key={index}>
                                                            <Star className="w-4 h-4"/>
                                                        </div>))}
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <Label
                                                    className={"text-sm text-muted-foreground"}>{value.text}</Label>
                                            </div>
                                            <div className={"flex flex-row gap-2"}>
                                                {value.badges.map((value, index) => (
                                                    <Badge key={index}>{value.badge}</Badge>))}
                                            </div>
                                            <div>
                                                <Label className={"text-sm"}>Posted on {value.posted}</Label>
                                            </div>
                                            <div>
                                                <div>
                                                    <Label className="leading-none text-sm lg:text-base">
                                                        RESULTS
                                                    </Label>
                                                </div>
                                                <Separator className="my-1"/>
                                                <Label className={"text-sm"}>
                                                    {value.results}
                                                </Label>
                                            </div>
                                        </div>
                                    </CarouselItem>))}
                                </CarouselContent>
                            </Carousel>
                        </ReusableCard>
                    </div>
                </section>
                <section>
                    <div className="container max-w-3xl mx-auto px-4 my-36">
                        <div className="mb-8">
                            <Label className="text-3xl text-center text-primary">
                                FEATURED JOBS
                            </Label>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {cards.map((card, index) => (<ReusableCard
                                key={index}
                                className="flex flex-col items-center justify-center p-6 h-full shadow-none border-[1px]"
                                footer={"remove"}
                                header="remove"
                            >
                                <div
                                    className="flex flex-col items-center justify-between h-full text-center space-y-4">
                                    <div
                                        className="w-16 h-16 border-2 rounded-full flex items-center justify-center">

                                    </div>
                                    <Label className="text-muted-foreground">
                                        {card.tagline}
                                    </Label>
                                    <Label className="text-base">{card.title.toUpperCase()}</Label>
                                    <div className="flex flex-wrap justify-center gap-2">
                                        {card.badges.map((badge, badgeIndex) => (<Badge
                                            key={badgeIndex}
                                            variant="outline"
                                            className={clsx("border-2", {
                                                "border-[#0000B8]": badge.includes("On the Spotlight"),
                                            })}
                                        >
                                            {badge}
                                        </Badge>))}
                                    </div>
                                </div>
                            </ReusableCard>))}
                        </div>
                    </div>
                </section>
            </div>
        </main>
    </>)
}

const avatars = [{
    imageUrl: "https://avatars.githubusercontent.com/u/16860528", profileUrl: "https://github.com/dillionverma",
}, {
    imageUrl: "https://avatars.githubusercontent.com/u/20110627", profileUrl: "https://github.com/tomonarifeehan",
}, {
    imageUrl: "https://avatars.githubusercontent.com/u/106103625", profileUrl: "https://github.com/BankkRoll",
}, {
    imageUrl: "https://avatars.githubusercontent.com/u/59228569", profileUrl: "https://github.com/safethecode",
}, {
    imageUrl: "https://avatars.githubusercontent.com/u/59442788", profileUrl: "https://github.com/sanjay-mali",
}, {
    imageUrl: "https://avatars.githubusercontent.com/u/89768406", profileUrl: "https://github.com/itsarghyadas",
},];

function AvatarCirclesComponent() {
    return <AvatarCircles numPeople={18} avatarUrls={avatars}/>;
}

const review = [{
    src: "https://utfs.io/f/XNbrjM3iH8Zx4a6w5j1szjWachy7KxTJpHMut4eRqLDObm0w",
    posted: "22nd October 2024",
    badges: [{badge: "Pro User"}, {badge: "Pro User"}],
    text: '"After struggling for 5 weeks to secure interviews with companies, I applied through HORIZONS and landed an interview in just 2 days!"',
    results: "From 5 weeks to 2 days"
}, {
    src: "https://utfs.io/f/XNbrjM3iH8Zxhr1bVTzuHw9M2joZfQV8X7WOYxPSicLm3se4",
    posted: "22nd October 2024",
    badges: [{badge: "Pro User"}, {badge: "Pro User"}],
    text: '"I had a fantastic experience using this job site! The interface is user-friendly, making it easy to navigate and find relevant job postings. I landed an interview within a week! Highly recommend it to anyone on the job hunt."',
    results: "From 5 weeks to 2 days"
}, {
    src: "https://utfs.io/f/XNbrjM3iH8ZxiuYQi3aUQW0duRlOHfnLbqV7ZG8cBseK5rFk",
    posted: "22nd October 2024",
    badges: [{badge: "Pro User"}, {badge: "Pro User"}],
    text: '"Absolutely impressed with this job posting site! Its not just for job seekers; as an employer, I found it easy to post positions and connect with qualified candidates. Great support team too. Will definitely use it again!"',
    results: "From 5 weeks to 2 days"
},

]

const cards = [{
    logo: "Logo 1",
    title: "Lead Software Engineer",
    tagline: "Tech Innovations Inc. - Full-Time",
    badges: ["Remote", "Full-Time", "Software", "On the Spotlight"],
}, {
    logo: "Logo 2",
    title: "Mobile Application Developer",
    tagline: "App Solutions LLC - Contract",
    badges: ["Hybrid", "Short-Term", "Mobile", "On the Spotlight"],
}, {
    logo: "Logo 3",
    title: "Data Scientist",
    tagline: "Analytics Co. - Full-Time",
    badges: ["On-Site", "Full-Time", "Data", "On the Spotlight"],
}, {
    logo: "Logo 4",
    title: "UX/UI Designer",
    tagline: "Creative Minds Agency - Part-Time",
    badges: ["Design", "Freelance", "Creative", "On the Spotlight"],
}, {
    logo: "Logo 5",
    title: "Cybersecurity Analyst",
    tagline: "SecureTech Corp - Full-Time",
    badges: ["Remote", "Full-Time", "Security", "On the Spotlight"],
}, {
    logo: "Logo 6",
    title: "Cloud Solutions Architect",
    tagline: "Cloudify Solutions - Contract",
    badges: ["Consultant", "Remote", "Cloud", "On the Spotlight"],
},]
