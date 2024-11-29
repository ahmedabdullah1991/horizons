import React from "react";
import {authentication} from "@/lib/kinde-imports";
import {redirect} from "next/navigation";

export default async function Layout(
    {children}: Readonly<{ children: React.ReactNode }>
) {
    const authenticated = await authentication()
    if (!authenticated) {
        redirect("api/auth/login")
    } else {
        return (
            <>
                {children}
            </>
        )
    }
}