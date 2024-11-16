import React from "react";
import {redirect} from "next/navigation";
import {authentication} from "@/lib/kinde-imports";

export default async function Layout({children}: {children: React.ReactNode}) {
    const isAuthenticated = await authentication()
    if (!isAuthenticated) {
        redirect("/api/auth/login")
    } else {
        return <>{children}</>
    }
}