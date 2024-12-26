"use server"

import React from "react";
import Link from "next/link";
import {LogoutLink, RegisterLink} from "@kinde-oss/kinde-auth-nextjs/components";
import {authentication} from "@/lib/kinde-imports";

import HomePage from "@/components/home_page";
import {Navigation} from "@/components/client";
import {Button} from "@/components/ui/button";
import {navigationMenuTriggerStyle} from "@/components/ui/navigation-menu";

export default async function Page() {
    const authenticated = await authentication()
    let NavTrigger: string
    if (!authenticated) {
        NavTrigger = "EMPLOYERS"
    } else {
        NavTrigger = "DASHBOARD"
    }

    return (<>
        <Navigation
            logout={<LogoutLink className={"text-red-600"}
                                postLogoutRedirectURL={"https://horizons-flax.vercel.app/"}>
                LOGOUT
            </LogoutLink>}
            trigger={NavTrigger}
        >
            <>
                {!authenticated ? (<>
                    <RegisterLink postLoginRedirectURL={"https://horizons-flax.vercel.app/dashboard"}
                                  className={`${navigationMenuTriggerStyle()}`}>
                        REGISTER
                    </RegisterLink>
                </>) : <Link href={"/dashboard"} legacyBehavior passHref><Button
                    variant={"ghost"}>DASHBOARD</Button></Link>}
            </>
        </Navigation>
        <HomePage/>
    </>)
}