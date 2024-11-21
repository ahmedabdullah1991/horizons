import React from "react";
import {NavigationTab} from "@/components/components";
import {NavigationSheet} from "@/components/client";

export default async function Layout({children}: { children: React.ReactNode }) {
    return (
        <>
            <NavigationTab
                children_01={<div className={"flex gap-2.5"}>
                    <NavigationSheet/>
                </div>}
            />
            {children}
        </>
    )
}