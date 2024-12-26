import React from "react";
import type {Metadata} from "next";
import "./globals.css";
import {ThemeProvider} from "@/components/theme-provider";
import {Inter} from "next/font/google"
import {Footer} from "@/components/client";

const inter = Inter({subsets: ["latin"]})

export const metadata: Metadata = {
    title: "HORIZONS", description: "Horizons project by Ahmed Abdullah",
};

export default async function RootLayout({
                                             children,
                                         }: Readonly<{
    children: React.ReactNode;
}>) {

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
            <main className={"flex flex-grow items-center"}>
                <div className={"container max-w-full"}>
                    {children}
                </div>
            </main>
            <Footer />
        </ThemeProvider>
        </body>
        </html>)
}