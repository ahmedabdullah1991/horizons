import React from "react";
import {authentication} from "@/lib/kinde-imports";
import {redirect} from "next/navigation";
import {AppSidebar} from "@/components/app-sidebar";
import {SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar";
import {cookies} from "next/headers";

export default async function Layout(
    {children}: Readonly<{ children: React.ReactNode }>
) {
    const authenticated = await authentication()
    const cookie = cookies()
    const defaultOpen = cookie.get("sidebar:state")?.value === "true"
    if (!authenticated) {
        redirect("api/auth/login")
    } else {
        return (
            <>
                <SidebarProvider defaultOpen={defaultOpen}>
                    <AppSidebar />
                    <main className={"flex flex-grow items-center"}>
                        <div className={"container max-w-full"}>
                            <SidebarTrigger />
                            {children}
                        </div>
                    </main>
                </SidebarProvider>
            </>
        )
    }
}