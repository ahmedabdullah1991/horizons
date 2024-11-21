import React from "react"
import {NavigationTab} from "@/components/components"
import {NavigationSheet} from "@/components/client"
import {LogoutLink} from "@kinde-oss/kinde-auth-nextjs/components";
import {Button} from "@/components/ui/button";

const Layout = ({children}: { children: React.ReactNode }) => {
    return (
        <>
            <NavigationTab>
                <NavigationSheet>
                    <LogoutLink postLogoutRedirectURL={"https://horizons-flax.vercel.app/"}><Button variant={"destructive"}>Logout</Button></LogoutLink>
                </NavigationSheet>
            </NavigationTab>
            {children}
        </>
    )
}
export default Layout
