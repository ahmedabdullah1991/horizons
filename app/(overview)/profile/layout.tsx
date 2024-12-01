import React from "react"
import {Sidebar} from "@/components/client";

export default function Layout({children}: Readonly<{ children: React.ReactNode }>) {
    return <><Sidebar>{children}</Sidebar>
    </>
}