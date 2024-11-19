import React from "react";
import {redirect} from "next/navigation";
import {authentication} from "@/lib/kinde-imports";
import {NavigationTab} from "@/components/components";
import {NavigationSheet} from "@/components/client";

export default async function Layout({children}: {children: React.ReactNode}) {
    const isAuthenticated = await authentication()
    if (!isAuthenticated) {
        redirect("/api/auth/login")
    } else {
        return <>
            <NavigationTab>
                <div className={"flex gap-2.5"}>
                    <NavigationSheet/>
                </div>
            </NavigationTab>
            {children}</>
    }
}