"use client"

import * as React from "react"
import Link from "next/link"
import {Orbitron} from "next/font/google";

import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from "@/components/ui/navigation-menu"
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,} from "@/components/ui/card"
import {Button} from "@/components/ui/button"
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,} from "@/components/ui/dropdown-menu"
import {useTheme} from "next-themes"
import {MoonIcon, SunIcon} from "lucide-react"

const orbitron = Orbitron({subsets: ["latin"]})

export const NavigationTab = ({children}: { children?: React.ReactNode }) => {
    return (
        <NavigationMenu className={"w-full"}>
            <NavigationMenuList className={"w-full"}>
                <NavigationMenuItem
                    className={
                        "w-dvw flex items-center justify-between h-20 px-4"
                    }
                >
                    <div>
                        <Link
                            href="/"
                            legacyBehavior
                            passHref
                        >
                            <NavigationMenuLink className={`${orbitron.className}`}>
                                <Button
                                    variant={"link"}
                                    className={"text-[24px]"}
                                >
                                    HORIZONS
                                </Button>
                            </NavigationMenuLink>
                        </Link>
                    </div>
                    <div className={"flex gap-2.5"}>
                        <ModeToggle/>
                        {children}
                    </div>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    )
}

export const ModeToggle = () => {
    const {setTheme} = useTheme()
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className={"h-12 w-12"}
                >
                    <SunIcon
                        className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"/>
                    <MoonIcon
                        className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"/>
                    <span className="sr-only">Toggle theme</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("light")}>
                    Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                    Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                    System
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

interface Card {
    header?: React.ReactElement | string | number | undefined
    title?: React.ReactElement | string | number | undefined
    description?: React.ReactElement | string | number | undefined
    content?: React.ReactElement | string | number | undefined
    children?: React.ReactElement | string | number | undefined
    footer?: React.ReactElement | string | number | undefined
    children2?: React.ReactElement | string | number | undefined
    className?: string
}

export const ReusableCard = (props: Card) => {
    return (
        <Card
            className={props.className}
        >
            {props.header !== "remove" && (
                <CardHeader>
                    <CardTitle>{props.title}</CardTitle>
                    <CardDescription>{props.description}</CardDescription>
                </CardHeader>
            )}
            {props.content !== "remove" && (
                <CardContent>{props.children}</CardContent>
            )}
            {props.footer !== "remove" && (
                <CardFooter className={"flex justify-end"}>
                    {props.children2}
                </CardFooter>
            )}
        </Card>
    )
}

