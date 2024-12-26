"use client"

import * as React from "react"
import Link from "next/link"
import {usePathname} from "next/navigation";
import {LogoutLink} from "@kinde-oss/kinde-auth-nextjs/components";
import {cn} from "@/lib/utils";
import {Orbitron} from "next/font/google";

import {
    Sidebar,
    SidebarContent, SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem, SidebarRail,
} from "@/components/ui/sidebar"
import {
    Infinity,
    UserPen,
    Home,
    Search,
    LayoutDashboard,
    LogOut,
    Settings2,
    SquareUserRound,
} from "lucide-react"
import {Label} from "@/components/ui/label";

const items = [
    {
        title: "Home",
        link: "/",
        icon: Home,
    },
    {
        title: "Dashboard",
        link: "/dashboard",
        icon: LayoutDashboard,
    },
    {
        title: "Profile",
        link: "/profile",
        icon: UserPen,
    },
    {
        title: "Listings",
        link: "/jobs",
        icon: Search,
    },
    {
        title: "Account",
        link: "/profile/account",
        icon: SquareUserRound,
    },
    {
        title: "Preferences",
        link: "/profile/preferences",
        icon: Settings2,
    }
]

const orbitron = Orbitron({subsets: ["latin"]})

export function AppSidebar() {
    const pathname = usePathname()

    return (
        <Sidebar collapsible={"icon"}>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <Link href={"/"}>
                                        <Infinity/>
                                        <Label className={`${orbitron.className}`}>HORIZONS</Label>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                <SidebarGroup>
                    <SidebarGroupLabel>Navigation Bar <Label className={"ml-2"}>⌘S</Label></SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((value, index) => (
                                <SidebarMenuItem key={index}>
                                    <SidebarMenuButton asChild className={cn("", pathname === value.link && "text-[#1F1FFF]")}>
                                        <Link href={value.link}>
                                            <value.icon />
                                            <Label>{value.title}</Label>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            )).slice(0, 4)}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                <SidebarGroup>
                    <SidebarGroupLabel>Profile</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((value, index) => (
                                <SidebarMenuItem key={index}>
                                    <SidebarMenuButton asChild>
                                        <Link href={value.link}>
                                            <value.icon />
                                            <Label>{value.title}</Label>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            )).slice(4, 6)}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenuItem>
                    <SidebarMenuButton className={"text-red-600"}>
                        <LogOut/>
                        <LogoutLink>Logout</LogoutLink>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarFooter>
            <SidebarRail/>
        </Sidebar>
    )
}