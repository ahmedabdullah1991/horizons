"use client"

import * as React from "react"
import {useFormState} from "react-dom";
import Link from "next/link"
import {usePathname} from "next/navigation";
import {clsx} from "clsx";
import {Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger} from "@/components/ui/sheet"
import {Button} from "@/components/ui/button"
import {Menu} from "lucide-react";
import {ReusableCard} from "@/components/components";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {createCompany, prevState} from "@/lib/actions";

export function NavigationSheet({children}: {children: React.ReactNode}) {
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
                <SheetTrigger>
                    <Button variant={"link"} className={"text-lg h-[50px] px-[25px]"}>
                        <Menu/>
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
                        {children}
                    </div>
                    <SheetFooter></SheetFooter>
                </SheetContent>
            </Sheet>
        )
    }
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