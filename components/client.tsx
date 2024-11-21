"use client"

import * as React from "react"
import Link from "next/link"
import {usePathname} from "next/navigation";
import {LogoutLink} from "@kinde-oss/kinde-auth-nextjs/components";
import {clsx} from "clsx";
import {Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle} from "@/components/ui/sheet"
import {Button} from "@/components/ui/button"

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

