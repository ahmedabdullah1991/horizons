"use server"

import React from "react"
import {NavigationTab} from "@/components/components"
import {LogoutLink} from "@kinde-oss/kinde-auth-nextjs/components";
import {Button} from "@/components/ui/button";

const Layout = async ({children}: { children: React.ReactNode }) => {
    return (
        <>
            <NavigationTab>
                <LogoutLink postLogoutRedirectURL={"https://horizons-flax.vercel.app/"}><Button
                    variant={"destructive"}>LOGOUT</Button></LogoutLink>
            </NavigationTab>
            {children}
        </>
    )
}

export default Layout