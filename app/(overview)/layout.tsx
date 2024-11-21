import React from "react";
<<<<<<< HEAD
=======
//import {redirect} from "next/navigation";
//import {authentication, user} from "@/lib/kinde-imports";
>>>>>>> ee0cecc6c674da2e428009edc91c5377fc0b77a9
import {NavigationTab} from "@/components/components";
import {NavigationSheet} from "@/components/client";

export default async function Layout({children}: { children: React.ReactNode }) {
<<<<<<< HEAD
    return (
        <>
=======
    //const isUser = await user()
    //const isAuthenticated = await authentication()
    //if (isUser && isAuthenticated) {
    //    redirect("/api/auth/login")
    //}
        return (<>
>>>>>>> ee0cecc6c674da2e428009edc91c5377fc0b77a9
            <NavigationTab
                children_02={<div className={"flex gap-2.5"}>
                    <NavigationSheet/>
                </div>}
            />
<<<<<<< HEAD
            {children}
        </>
    )
}
=======
            {children}</>)
}
>>>>>>> ee0cecc6c674da2e428009edc91c5377fc0b77a9
