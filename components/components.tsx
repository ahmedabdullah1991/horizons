import * as React from "react"
import Link from "next/link"
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,} from "@/components/ui/card"
import {Button} from "@/components/ui/button"
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label";

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
            className={props.className + "border-none"}
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

const quickLinks = [
    {href: '/about', label: 'About Us'},
    {href: '/services', label: 'Services'},
    {href: '/products', label: 'Products'},
    {href: '/contact', label: 'Contact Us'},
]

const legalLinks = [
    {href: '/privacy', label: 'Privacy Policy'},
    {href: '/terms', label: 'Terms of Service'},
    {href: '/cookies', label: 'Cookie Policy'},
]

export function Footer() {
    return (
        <footer className={"border-t"}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Company Info */}
                    <div>
                        <Link href="/" className="flex items-center mb-4">
                            <span className="sr-only">HORIZONS</span>
                            <svg className="h-8 w-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                      d="M13 10V3L4 14h7v7l9-11h-7z"/>
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

                <div className="text-center text-sm">
                    <p>&copy; {new Date().getFullYear()} HORIZONS. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}

export const avatarUrls = [
    {src: "https://utfs.io/f/XNbrjM3iH8Zx4a6w5j1szjWachy7KxTJpHMut4eRqLDObm0w"},
    {src: "https://utfs.io/f/XNbrjM3iH8Zxhr1bVTzuHw9M2joZfQV8X7WOYxPSicLm3se4"},
    {src: "https://utfs.io/f/XNbrjM3iH8ZxiuYQi3aUQW0duRlOHfnLbqV7ZG8cBseK5rFk"},
]

export const Avatars = () => {
    return (
        <>
            {avatarUrls.map((value, index) => (
                <Avatar key={index}>
                    <AvatarImage>{value.src}</AvatarImage>
                    <AvatarFallback>UI</AvatarFallback>
                </Avatar>
            ))}
        </>
    )
}