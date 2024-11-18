import React from "react";
import Link from "next/link";
import {authentication} from "@/lib/kinde-imports";
import {NavigationTab} from "@/components/reusable";
import {LoginLink} from "@kinde-oss/kinde-auth-nextjs/components";
import {Button} from "@/components/ui/button";

export default async function Page() {
    const authenticated = await authentication()
    return (
        <>
            <NavigationTab>
                {!authenticated ? (
                    <LoginLink>
                        <Button
                            variant={"link"}
                            className={"text-lg h-[50px] px-[25px]"}
                        >
                            Employers
                        </Button>
                    </LoginLink>
                ) : (
                    <Link href={"/dashboard"}>
                        <Button
                            variant={"link"}
                            className={"text-lg h-[50px] px-[25px]"}
                        >
                            Dashboard
                        </Button>
                    </Link>
                )}
                <Link href={"/listings"}>
                    <Button
                        className="bg-[#C40234] text-white text-lg h-[50px] px-[25px] hover:bg-transparent shadow hover:bg-[#C40234]">
                        Job Postings
                    </Button>
                </Link>
            </NavigationTab>
        </>
    )
}