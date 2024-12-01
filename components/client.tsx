"use client"

import * as React from "react"
import {useState} from "react"
import {useFormState, useFormStatus} from "react-dom";
import {Orbitron} from "next/font/google";
import {usePathname} from "next/navigation";
import {FileText, Home, Menu, Settings} from "lucide-react";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import {Label} from "@/components/ui/label";
import {ReusableCard} from "@/components/components";
import {createCompany, prevState} from "@/lib/actions";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {clsx} from "clsx";
import Link from "next/link";
import {Menubar, MenubarMenu, MenubarTrigger,} from "@/components/ui/menubar"
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";

const orbitron = Orbitron({subsets: ["latin"]})

interface Navigation {
    children: React.ReactNode
    logout: React.ReactNode
    trigger: string
}

export function Navigation(props: Navigation) {
    const pathname = usePathname()
    return (<div className={"flex flex-row justify-between p-4 border-b"}>
        <NavigationMenu>
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuLink
                        className={`${orbitron.className} ${navigationMenuTriggerStyle()} hover:bg-transparent hover:underline`}
                        href={"/"}>
                        HORIZONS
                    </NavigationMenuLink>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
        {pathname === "/" && (<>
            <NavigationMenu className={"hidden lg:flex"}>
                <NavigationMenuList>
                    <NavigationMenuItem>
                        {props.children}
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuLink className={`${navigationMenuTriggerStyle()}`}
                                            href={"/"}>
                            JOB POSTINGS
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
            <div className={"lg:hidden"}>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost"><Menu/></Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                        <DropdownMenuLabel>Navigation Menu</DropdownMenuLabel>
                        <DropdownMenuSeparator/>
                        <DropdownMenuGroup>
                            <Link href={props.trigger === "EMPLOYERS" ? "/api/auth/login" : "/dashboard"}>
                                <DropdownMenuItem>{props.trigger}
                                    <DropdownMenuShortcut></DropdownMenuShortcut>
                                </DropdownMenuItem>
                            </Link>
                            <Link href={"/jobs"}>
                                <DropdownMenuItem>JOBS
                                    <DropdownMenuShortcut></DropdownMenuShortcut>
                                </DropdownMenuItem>
                            </Link>
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </>)}
        {pathname !== "/" && (<>
            <Dropdown>
                {props.logout}
            </Dropdown>
        </>)}
    </div>)
}

export function CreateCompany() {
    const initialState: prevState = {message: null, errors: {}}
    const [state, formAction] = useFormState(createCompany, initialState)
    return (<ReusableCard
        title={"REGISTER AS A COMPANY/EMPLOYER"}
        children2={<Button type={"submit"}>SUBMIT</Button>}
    >
        <form action={formAction}>
            <Label
                htmlFor={"companyName"}
                className={"flex flex-col gap-1.5"}
            >
                COMPANY NAME:
                <Input
                    id={"companyName"}
                    name={"companyName"}
                    required={true}
                />
                <div
                    aria-live={"polite"}
                    aria-atomic={"true"}
                >
                    {state.errors?.companyName && state.errors.companyName.map((error: string) => (
                        <Label key={error}>{error}</Label>))}
                </div>
            </Label>
        </form>
    </ReusableCard>)
}

const pathnames = [{href: "/jobs", label: "JOBS", shortcut: "⌘J"}, {
    href: "/dashboard", label: "DASHBOARD", shortcut: "⌘D"
}, {href: "/profile", label: "PROFILE", shortcut: "⌘P"}, {href: "/generate", label: "GENERATE", shortcut: "⌘G"},]

export function Dropdown({children}: Readonly<{ children: React.ReactNode }>) {
    const pathname = usePathname()
    return (<DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button variant="ghost"><Menu/></Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Navigation Menu</DropdownMenuLabel>
            <DropdownMenuSeparator/>
            <DropdownMenuGroup>
                {pathnames.map((value, index) => (
                    <DropdownMenuItem key={index} className={clsx("", pathname === value.href && "text-[#007FFF]")}>
                        {value.label}
                        <DropdownMenuShortcut
                            className={"text-muted-foreground"}>{value.shortcut}</DropdownMenuShortcut>
                    </DropdownMenuItem>))}
                <DropdownMenuItem>
                    {children}
                </DropdownMenuItem>
            </DropdownMenuGroup>
        </DropdownMenuContent>
    </DropdownMenu>)
}

const pathnames1 = [{icon: Home, label: 'SETTINGS', href: '/profile'}, {
    icon: FileText, label: 'ACCOUNT', href: '/profile/account'
}, {icon: Settings, label: 'PREFERENCES', href: '/profile/preferences'},]

export function Sidebar({children}: Readonly<{ children: React.ReactNode }>) {
    const pathname = usePathname()
    return (<>
        <div className={"flex flex-row gap-6 max-w-4xl mx-auto p-6"}>
            <div className={"hidden lg:flex h-max"}>
                <Menubar>
                    <div className={"flex flex-col"}>
                        {pathnames1.map((value, index) => (
                            <MenubarMenu key={index}>
                                <MenubarTrigger
                                    className={clsx("", pathname === value.href && "text-[#007FFF]")}>
                                    {value.label}
                                </MenubarTrigger>
                            </MenubarMenu>
                        ))}
                    </div>
                </Menubar>
            </div>
            <div>{children}</div>
        </div>
    </>)
}

const titleNames = [{href: "/jobs", label: "JOBS"}, {href: "/dashboard", label: "DASHBOARD"}, {
    href: "/profile", label: "PROFILE"
}, {href: "/generate", label: "GENERATE"},]

export const Titles = () => {
    const pathname = usePathname()
    return (<>
        {pathname !== "/" && (
            <>
                <div className={"p-4 border-b flex flex-row justify-between items-center"}>
                    <div className={"px-4"}>
                        {titleNames.map((value, index) => (
                            <Label key={index}>{pathname === value.href && value.label}</Label>))}
                    </div>
                    {pathname === "/profile" && (
                        <>
                            <div className={"lg:hidden"}>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost"><Menu/></Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="w-56">
                                        <DropdownMenuLabel>Navigation Menu</DropdownMenuLabel>
                                        <DropdownMenuSeparator/>
                                        <DropdownMenuGroup>
                                            {pathnames1.map((value, index) => (
                                                <DropdownMenuItem key={index}
                                                                  className={clsx("", pathname === value.href && "text-[#007FFF]")}>
                                                    {value.label}
                                                </DropdownMenuItem>))}
                                        </DropdownMenuGroup>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </>
                    )}
                </div>
            </>
        )}
    </>)
}

export function CompanyNameInputCard() {
    const [companyName, setCompanyName] = useState('')
    const initialState: prevState = {message: null, errors: {}}
    const [state, formAction] = useFormState(createCompany, initialState)
    const {pending} = useFormStatus()
    return (
        <Card className="w-full max-w-md mx-auto">
            <CardHeader>
                <CardTitle>Company Information</CardTitle>
                <CardDescription>Enter your company name to get started</CardDescription>
            </CardHeader>
            <form action={formAction}>
                <CardContent>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="companyName">Company Name</Label>
                            <Input
                                id="companyName"
                                name="companyName"
                                placeholder="Enter your company name"
                                value={companyName}
                                onChange={(e) => setCompanyName(e.target.value)}
                                className={"focus"}
                            />
                        </div>
                    </div>
                    <div
                        aria-live={"polite"}
                        aria-atomic={"true"}
                        className={"text-right"}
                    >
                        {state.errors?.companyName &&
                            state.errors.companyName.map((error: string) => (
                                <Label key={error} className={"text-red-600"}>{error}</Label>
                            ))}
                    </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                    <Button type="submit" disabled={pending}>
                        Submit
                    </Button>
                </CardFooter>
            </form>
        </Card>
    )
}