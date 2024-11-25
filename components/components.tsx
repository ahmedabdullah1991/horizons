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
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar"
import {Input} from "@/components/ui/input"
import {useTheme} from "next-themes"
import {MoonIcon, SunIcon} from "lucide-react"
import {Label} from "@/components/ui/label";

const orbitron = Orbitron({subsets: ["latin"]})

interface NavigationTabProps {
    children?: React.ReactNode
}

export const NavigationTab = (props: NavigationTabProps) => {
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
                    <div className={"flex items-center gap-2.5"}>
                        <ModeToggle/>
                        {props.children}
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

export function Avatars() {
    return (
        <Avatar>
            <AvatarImage
                src="https://github.com/shadcn.png"
                alt="avatar-image"
            />
            <AvatarFallback>AB</AvatarFallback>
        </Avatar>
    )
}

const quickLinks = [
    { href: '/about', label: 'About Us' },
    { href: '/services', label: 'Services' },
    { href: '/products', label: 'Products' },
    { href: '/contact', label: 'Contact Us' },
]

const legalLinks = [
    { href: '/privacy', label: 'Privacy Policy' },
    { href: '/terms', label: 'Terms of Service' },
    { href: '/cookies', label: 'Cookie Policy' },
]

export function Footer() {
    return (
        <footer className="text-gray-400">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Company Info */}
                    <div>
                        <Link href="/" className="flex items-center mb-4">
                            <span className="sr-only">HORIZONS</span>
                            <svg className="h-8 w-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                            <span className="ml-2 text-sm font-medium">HORIZONS</span>
                        </Link>
                        <p className="text-sm">
                            We are dedicated to providing the best service to our customers.
                        </p>
                    </div>

                    <div className={"flex flex-col gap-4"}>
                        <Label className="text-sm font-semibold">QUICK LINKS</Label>
                        <ul className="space-y-2 text-sm">
                            {quickLinks.map((link) => (
                                <li key={link.href}>
                                    <Link href={link.href} className="hover:text-white transition-colors">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>


                    <div className={"flex flex-col gap-4"}>
                        <Label className="text-sm font-semibold mb-4">LEGAL</Label>
                        <ul className="space-y-2 text-sm">
                            {legalLinks.map((link) => (
                                <li key={link.href}>
                                    <Link href={link.href} className="hover:text-white transition-colors">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold mb-4">STAY CONNECTED</h3>
                        <form className="space-y-2">
                            <Input
                                type="email"
                                placeholder="Enter your email"
                                className="text-white placeholder-gray-400"
                                aria-label="Email for newsletter"
                            />
                            <Button type="submit" className="w-full">
                                Subscribe
                            </Button>
                        </form>
                    </div>
                </div>

                <div className="mt-8 pt-8 border-t border-gray-800">
                </div>

                <div className="mt-8 text-center text-sm">
                    <p>&copy; {new Date().getFullYear()} HORIZONS. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}