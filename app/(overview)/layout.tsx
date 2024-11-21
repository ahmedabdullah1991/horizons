import React from "react"
import {NavigationTab} from "@/components/components"
import {NavigationSheet} from "@/components/client"

const Layout = ({children}: { children: React.ReactNode }) => {
    return (
        <>
            <NavigationTab>
                <NavigationSheet/>
            </NavigationTab>
            {children}
        </>
    )
}
export default Layout
