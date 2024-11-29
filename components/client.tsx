"use client"

import * as React from "react"
import Link from "next/link"
import {Orbitron} from "next/font/google";
import {usePathname} from "next/navigation";
import {MapPin, Moon, Sun, Users} from "lucide-react";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Label} from "@/components/ui/label";
import {useState} from "react";
import {useTheme} from "next-themes";
import {Switch} from "@/components/ui/switch";

const orbitron = Orbitron({subsets: ["latin"]})

interface Navigation {
    children: React.ReactNode
    logout: React.ReactNode
    trigger: string
}

export function Navigation(props: Navigation) {
    const pathname = usePathname()
    return (
        <div className={"flex flex-row justify-between p-4 border-b"}>
            <NavigationMenu>
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <Link href="/" legacyBehavior passHref>
                            <NavigationMenuLink className={`${orbitron.className} ${navigationMenuTriggerStyle()}`}>
                                HORIZONS
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
            {pathname === "/" && (
                <NavigationMenu>
                    <NavigationMenuList>
                        <NavigationMenuItem>
                            {props.trigger === "EMPLOYERS" ? (
                                    <>
                                        <NavigationMenuTrigger>{props.trigger}</NavigationMenuTrigger>
                                        <NavigationMenuContent>
                                            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-full grid-rows">
                                                {props.children}
                                                <CompanyCard/>
                                            </ul>
                                        </NavigationMenuContent>
                                    </>
                                ) :
                                <Link href="/dashboard" legacyBehavior passHref>
                                    <NavigationMenuLink className={`${navigationMenuTriggerStyle()}`}>
                                        DASHBOARD
                                    </NavigationMenuLink>
                                </Link>
                            }
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <Link href="/" legacyBehavior passHref>
                                <NavigationMenuLink className={`${navigationMenuTriggerStyle()} text-[#007FFF]`}>
                                    JOB POSTINGS
                                </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <div className={"flex flex-col items-center"}>
                                <ModeToggle/>
                            </div>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
            )}
            {pathname !== "/" && (
                <>{props.logout}</>
            )}
        </div>
    )
}

interface CompanyCardProps {
    name: string
    logo: string
    industry: string
    location: string
    employeeCount: number
    description: string
}

function CardInfo({
                      name,
                      logo,
                      industry,
                      location,
                      employeeCount,
                      description,
                  }: CompanyCardProps) {
    return (
        <Card className="w-[350px] overflow-hidden relative border-none">
            <div
                className="absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-500 opacity-80 animate-gradient-xy"></div>
            <CardHeader className="pb-4 relative">
                <div className="flex items-center space-x-4">
                    <Avatar className="h-16 w-16">
                        <AvatarImage src={logo} alt={`${name} logo`}/>
                        <AvatarFallback>{name.slice(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div>
                        <CardTitle className={"text-white"}>{name}</CardTitle>
                        <CardDescription className="text-muted-foreground">{industry}</CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="pb-4 relative">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-2">
                    <MapPin className="h-4 w-4"/>
                    <span>{location}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-4">
                    <Users className="h-4 w-4"/>
                    <span>{employeeCount} employees</span>
                </div>
                <p className="text-sm text-foreground">{description}</p>
            </CardContent>
        </Card>
    )
}

function CompanyCard() {
    return (
        <div className="flex flex-col items-center justify-center row-span-3">
            <style jsx global>{`
                @keyframes gradient-xy {
                    0%, 100% {
                        background-position: 0% 0%;
                    }
                    50% {
                        background-position: 100% 100%;
                    }
                }

                .animate-gradient-xy {
                    animation: gradient-xy 5s ease alternate infinite;
                    background-size: 400% 400%;
                }
            `}</style>
            <CardInfo
                name="HORIZONS"
                logo=""
                industry="Horizons Inc."
                location="Islamabad, Pakistan"
                employeeCount={10}
                description="Horizons project by Ahmed Abdullah"
            />
        </div>
    )
}

export function ModeToggle() {
    const [checked, setChecked] = useState(true)
    const {setTheme} = useTheme()
    return (
        <div className="inline-flex items-center gap-2">
            <Switch
                checked={checked}
                onCheckedChange={setChecked}
                onClick={() => setTheme(checked ? "dark" : "light")}
                aria-label="Toggle switch"
            />
            <Label htmlFor="switch-11">
                <span className="sr-only">Toggle switch</span>
                {checked ? (
                    <Sun size={16} strokeWidth={2} aria-hidden="true" />
                ) : (
                    <Moon size={16} strokeWidth={2} aria-hidden="true" />
                )}
            </Label>
        </div>
    )
}