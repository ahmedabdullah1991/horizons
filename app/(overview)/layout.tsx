import React from "react"
import {NavigationTab} from "@/components/components"
import {NavigationSheet} from "@/components/client"

const Layout = ({children}: { children: React.ReactNode }) => {
    return (
        <>
            <NavigationTab
                children_02={<>
                    <NavigationSheet/>
                </>}
            >
            </NavigationTab>
            {children}
        </>
    )
}
export default Layout
