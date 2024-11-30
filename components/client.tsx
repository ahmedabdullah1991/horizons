"use client"

import * as React from "react"
import {useFormState} from "react-dom";
import {Orbitron} from "next/font/google";
import {usePathname} from "next/navigation";
import {Menu} from "lucide-react";
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
                        <NavigationMenuLink className={`${orbitron.className} ${navigationMenuTriggerStyle()}`}
                                            href={"/"}>
                            HORIZONS
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
            {pathname === "/" && (
                <>
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
                </>
            )}
            {pathname !== "/" && (
                <>
                    <Dropdown>
                        {props.logout}
                    </Dropdown>
                </>
            )}
        </div>
    )
}

export function CreateCompany() {
    const initialState: prevState = {message: null, errors: {}}
    const [state, formAction] = useFormState(createCompany, initialState)
    return (
        <ReusableCard
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
                        {state.errors?.companyName &&
                            state.errors.companyName.map((error: string) => (
                                <Label key={error}>{error}</Label>
                            ))}
                    </div>
                </Label>
            </form>
        </ReusableCard>
    )
}

const pathnames = [
    {href: "/jobs", label: "JOBS", shortcut: "⌘J"},
    {href: "/dashboard", label: "DASHBOARD", shortcut: "⌘D"},
    {href: "/profile", label: "PROFILE", shortcut: "⌘P"},
    {href: "/generate", label: "GENERATE", shortcut: "⌘G"},
]

export function Dropdown({children}: Readonly<{ children: React.ReactNode }>) {
    const pathname = usePathname()
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost"><Menu/></Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Navigation Menu</DropdownMenuLabel>
                <DropdownMenuSeparator/>
                <DropdownMenuGroup>
                    {pathnames.map((value, index) => (
                        <DropdownMenuItem key={index} className={clsx(
                            "",
                            pathname === value.href && "text-[#007FFF]"
                        )}>
                            {value.label}
                            <DropdownMenuShortcut
                                className={"text-muted-foreground"}>{value.shortcut}</DropdownMenuShortcut>
                        </DropdownMenuItem>
                    ))}
                    <DropdownMenuItem>
                        {children}
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
