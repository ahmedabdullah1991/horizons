"use client"

import * as React from "react"
import Link from "next/link"
import {usePathname} from "next/navigation";
import {LogoutLink} from "@kinde-oss/kinde-auth-nextjs/components";
import {clsx} from "clsx";
import {
    Sheet,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import {Button} from "@/components/ui/button"
import {Menu} from "lucide-react"

export function NavigationSheet() {
    const pathname = usePathname()
    const links = [
        {name: "Horizons", href: "/"},
        {name: "Jobs", href: "/jobs"},
        {name: "Dashboard", href: "/dashboard"},
        {name: "Profile", href: "/profile"},
    ]

    if (pathname !== "/") {
        return (
            <Sheet>
                <SheetTrigger asChild>
                    <Button
                        variant="ghost"
                        className={"h-12 w-12"}
                    >
                        <Menu
                            className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"/>
                    </Button>
                </SheetTrigger>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>Navigation</SheetTitle>
                    </SheetHeader>
                    <div className="grid gap-4 py-4">
                        {links.map((value, index) => (
                            <div
                                className="grid grid-cols-4 items-center gap-4"
                                key={index}
                            >
                                <Link href={value.href}>
                                    <Button
                                        variant={"link"}
                                        className={clsx("", {
                                            underline: pathname === value.href,
                                        })}
                                    >
                                        {value.name}
                                    </Button>
                                </Link>
                            </div>
                        ))}
                        <LogoutLink><Button variant={"destructive"}>Logout</Button></LogoutLink>
                    </div>
                    <SheetFooter></SheetFooter>
                </SheetContent>
            </Sheet>
        )
    }
}