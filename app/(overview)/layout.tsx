import React from "react";
//import {redirect} from "next/navigation";
//import {authentication, user} from "@/lib/kinde-imports";
import {NavigationTab} from "@/components/components";
import {NavigationSheet} from "@/components/client";

export default async function Layout({children}: { children: React.ReactNode }) {
    //const isUser = await user()
    //const isAuthenticated = await authentication()
    //if (isUser && isAuthenticated) {
    //    redirect("/api/auth/login")
    //}
        return (<>
            <NavigationTab
                children_02={<div className={"flex gap-2.5"}>
                    <NavigationSheet/>
                </div>}
            />
            {children}</>)
}
