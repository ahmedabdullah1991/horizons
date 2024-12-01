import React from "react";
import type {Metadata} from "next";
import "./globals.css";
import {ThemeProvider} from "@/components/theme-provider";
import {Inter} from "next/font/google"
import {Footer} from "@/components/components";
import {authentication} from "@/lib/kinde-imports";
import {LogoutLink, RegisterLink} from "@kinde-oss/kinde-auth-nextjs/components";
import {Button} from "@/components/ui/button";
import {navigationMenuTriggerStyle} from "@/components/ui/navigation-menu";
import {Navigation, Titles} from "@/components/client";
import Link from "next/link";

const inter = Inter({subsets: ["latin"]})

export const metadata: Metadata = {
    title: "HORIZONS", description: "Horizons project by Ahmed Abdullah",
};

export default async function RootLayout({
                                             children,
                                         }: Readonly<{
    children: React.ReactNode;
}>) {
    const authenticated = await authentication()
    let NavTrigger: string
    if (!authenticated) {
        NavTrigger = "EMPLOYERS"
    } else {
        NavTrigger = "DASHBOARD"
    }
    return (

        <html lang="en" className={"h-full"}>
        <body
            className={`antialiased font-medium flex flex-col min-h-full h-full selection:bg-[#0000B8] ${inter.className}`}
        >
        <ThemeProvider
            attribute={"class"}
            defaultTheme={"dark"}
            enableSystem
            disableTransitionOnChange
        >
            <Navigation
                logout={<LogoutLink className={"text-red-600"}
                                    postLogoutRedirectURL={"https://horizons-flax.vercel.app/"}>
                    LOGOUT
                </LogoutLink>}
                trigger={NavTrigger}
            >
                <>
                    {!authenticated ? (<>
                        <RegisterLink postLoginRedirectURL={"https://horizons-flax.vercel.app/dashboard"}
                                      className={`${navigationMenuTriggerStyle()}`}>
                            REGISTER
                        </RegisterLink>
                    </>) : <Link href={"/dashboard"} legacyBehavior passHref><Button
                        variant={"ghost"}>DASHBOARD</Button></Link>}
                </>
            </Navigation>
            <Titles/>
            <main className={"flex-grow flex items-center"}>
                <div className={"container max-w-full"}>
                    {children}
                </div>
            </main>
            <Footer/>
        </ThemeProvider>
        </body>
        </html>);
}