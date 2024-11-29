"use client"

import * as React from "react"
import {useState} from "react"
import Link from "next/link"
import {Orbitron} from "next/font/google";
import {usePathname} from "next/navigation";
import {Moon, Sun} from "lucide-react";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import {Label} from "@/components/ui/label";
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
                                        {props.children}
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
                    <Sun size={16} strokeWidth={2} aria-hidden="true"/>
                ) : (
                    <Moon size={16} strokeWidth={2} aria-hidden="true"/>
                )}
            </Label>
        </div>
    )
}