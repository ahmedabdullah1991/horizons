"use client"

import React, {RefObject, useEffect, useRef, useState} from "react";
import Link from "next/link";

import {Orbitron} from "next/font/google";

import {useKindeBrowserClient} from "@kinde-oss/kinde-auth-nextjs";
import {Label} from "@/components/ui/label";
import {Button} from "@/components/ui/button";
import AvatarCircles from "@/components/ui/avatar-circles";
import {ReusableCard} from "@/components/components";
import {Carousel, CarouselContent, CarouselItem} from "@/components/ui/carousel";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Star} from "lucide-react";
import {Badge} from "@/components/ui/badge";
import {Separator} from "@/components/ui/separator";
import {clsx} from "clsx";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuList,
    navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";
import {Card, CardContent} from "@/components/ui/card"
import {CartesianGrid, Line, LineChart} from "recharts"
import {ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent,} from "@/components/ui/chart"
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";

const orbitron = Orbitron({subsets: ["latin"]})

export default function HomePage() {
    const ref1 = useRef<HTMLDivElement>(null);
    const ref2 = useRef<HTMLDivElement>(null);
    const isVisible1 = useIntersectionObserver(ref1);
    const isVisible2 = useIntersectionObserver(ref2);
    const [visibleComponent, setVisibleComponent] = useState<number>(1);

    useEffect(() => {
        if (isVisible1) setVisibleComponent(1); else if (isVisible2) setVisibleComponent(2);
    }, [isVisible1, isVisible2]);

    const handleScroll1 = () => {
        ref1.current?.scrollIntoView({behavior: "smooth", block: "start"})
    }
    const handleScroll2 = () => {
        ref2.current?.scrollIntoView({behavior: "smooth", block: "start"})
    }

    const menus = [{label: "INDIVIDUALS", label2: handleScroll1}, {label: "COMPANIES", label2: handleScroll2},]

    return (<>
        <NavigationMenu className={"mx-auto w-full sticky top-10 z-10"}>
            <NavigationMenuList className={"p-2"}>
                {menus.map((value, index) => (<NavigationMenuItem key={index} onClick={value.label2}
                                                                  className={clsx(`${navigationMenuTriggerStyle()} cursor-pointer transition-colors duration-300`, {
                                                                      "border-blue-800 border text-blue-800 hover:text-blue-800": visibleComponent === index + 1,
                                                                  })}>{value.label}</NavigationMenuItem>))}
            </NavigationMenuList>
        </NavigationMenu>
        <div ref={ref1}>
            <ContentSections/>
        </div>
        <div ref={ref2}>
            <Company_Section/>
        </div>
    </>)
}

function useIntersectionObserver(ref: RefObject<Element>, options: IntersectionObserverInit = {threshold: 0.5}): boolean {
    const [isIntersecting, setIsIntersecting] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            setIsIntersecting(entry.isIntersecting);
        }, options);

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            observer.disconnect();
        };
    }, [ref, options]);

    return isIntersecting;
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

const review = [{
    src: "https://utfs.io/f/XNbrjM3iH8Zx8H07Rl0OLiodeyn5R0kDE7mP3xjNsIAOzBJr",
    posted: "22nd October 2024",
    badges: [{badge: "Pro User"}, {badge: "Pro User"}],
    text: '"After struggling for 5 weeks to secure interviews with companies, I applied through HORIZONS and landed an interview in just 2 days!"',
    results: "From 5 weeks to 2 days"
}, {
    src: "https://utfs.io/f/XNbrjM3iH8ZxDusrcXeXZdBlgEi4kTVbW5hO2vqD9nQy6pH3",
    posted: "22nd October 2024",
    badges: [{badge: "Pro User"}, {badge: "Pro User"}],
    text: '"I had a fantastic experience using this job site! The interface is user-friendly, making it easy to navigate and find relevant job postings. I landed an interview within a week! Highly recommend it to anyone on the job hunt."',
    results: "From 5 weeks to 2 days"
}, {
    src: "https://utfs.io/f/XNbrjM3iH8ZxBPmcfhHJCg97j5Xehfyc01rDGb6Odz23MEuR",
    posted: "22nd October 2024",
    badges: [{badge: "Pro User"}, {badge: "Pro User"}],
    text: '"Absolutely impressed with this job posting site! Its not just for job seekers; as an employer, I found it easy to post positions and connect with qualified candidates. Great support team too. Will definitely use it again!"',
    results: "From 5 weeks to 2 days"
}]

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
}]

const Company_Section = () => {
    return <section className={"container max-w-3xl mx-auto space-y-20 mb-36"}>
        <div className="w-full lg:pl-0 lg:pr-0 pl-14 pr-4 pb-10">
            <div className="relative">
                {/* Large card */}
                <Card className="w-full aspect-video overflow-hidden flex flex-col lg:p-8 p-4 gap-4 lg:gap-8">
                    <div className={"flex flex-col"}>
                        <Label className={"lg:text-base text-sm font-bold"}>Real-time performance metrics and
                            data</Label>
                        <Label className={"lg:text-sm text-xs"}>Improved efficiency and accuracy</Label>
                    </div>
                    <TableComponent/>
                </Card>

                {/* Small card */}
                <div className={"absolute left-0 bottom-0 transform translate-y-10 -translate-x-10 w-3/4 h-3/4"}>
                    <Component/>
                </div>
            </div>
        </div>
        <div className="p-4 lg:p-0">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <ReusableCard
                    title={"content coming soon"}
                    className="row-span-1 lg:row-span-2"
                />
                <ReusableCard
                    title={"content coming soon"}
                    className="row-span-1"
                />
                <ReusableCard
                    title={"content coming soon"}
                    className="row-span-1 lg:row-span-2"
                />
                <ReusableCard
                    title={"content coming soon"}
                    className="row-span-1"
                />
            </div>
        </div>
    </section>
}

const ContentSections = () => {
    const {isAuthenticated} = useKindeBrowserClient()
    return (<section className={"container max-w-3xl mx-auto px-4 flex flex-col space-y-20 my-36"}>
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
            <Label className="text-sm lg:text-base text-muted">
                HORIZONS is a dynamic platform that connects
                people with companies. Our user-friendly
                interface allows you to search and apply
                effortlessly.
            </Label>
            {!isAuthenticated && <Link href={"/api/auth/login?"}><Button className={"bg-[#0000B8] text-white w-max"}
                                                                         variant={"link"}>REGISTER</Button></Link>}
        </div>
        <ReusableCard
            className="relative min-h-36 col-span-8 row-span-2"
        >
            <Carousel>
                <CarouselContent>
                    {review.map((value, index) => (<CarouselItem key={index}>
                        <div className={"flex flex-col justify-between gap-2 lg:gap-4 h-full pt-6"}>
                            <div className={"flex flex-row gap-6"}>
                                <Avatar>
                                    <AvatarImage src={value.src}/>
                                    <AvatarFallback
                                        className={"bg-gradient-to-br from-blue-700 to-cyan-500"}></AvatarFallback>
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
                                    className={"text-sm leading-none"}>{value.text}</Label>
                            </div>
                            <div className={"flex flex-row gap-2"}>
                                {value.badges.map((value, index) => (<Badge key={index}>{value.badge}</Badge>))}
                            </div>
                            <div>
                                <Label className={"text-sm"}>Posted on {value.posted}</Label>
                            </div>
                            <div>
                                <div>
                                    <Label className="leading-none text-sm lg:text-base">
                                        Results
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
        <div>
            <Label className={"text-4xl font-bold"}>FEATURED JOBS</Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
                {cards.map((card, index) => (<ReusableCard
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
                                    "border-[#0000B8] border-2": badge.includes("On the Spotlight"),
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

const tableData = [
    {id: 1, name: "John Doe", email: "john@example.com", role: "Developer"},
    {id: 2, name: "Jane Smith", email: "jane@example.com", role: "Designer"},
    {id: 3, name: "Bob Johnson", email: "bob@example.com", role: "Manager"},
    {id: 4, name: "Alice Brown", email: "alice@example.com", role: "Tester"},
];

const TableComponent: React.FC = () => {
    return (
        <div className={"translate-x-10 border lg:p-4 p-0 rounded-lg"}>
            <Table className={"text-[10px] lg:text-xs"}>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Role</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {tableData.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell>{row.name}</TableCell>
                            <TableCell>{row.email}</TableCell>
                            <TableCell>{row.role}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

const chartLengthX = Array.from({length: 30}, (_, index) => ({
    desktop: index + 1 + Math.floor(Math.random() * 5),
    mobile: index + 5 + Math.floor(Math.random() * 5),
}))

const chartConfig = {
    desktop: {
        label: "Clicks",
        color: "hsl(var(--chart-1))",
    },
    mobile: {
        label: "Impressions",
        color: "hsl(var(--chart-2))",
    },
} satisfies ChartConfig

export function Component() {

    return (
        <Card>
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
                            content={<ChartTooltipContent indicator="line"/>}
                        />
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
                    </LineChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}