"use client"

import React from "react";
import {LoginLink, RegisterLink} from "@kinde-oss/kinde-auth-nextjs/components";
import {Button} from "@/components/ui/button";

const Page = () => {
    return (
        <>
            <LoginLink postLoginRedirectURL={"https://horizons-flax.vercel.app/dashboard"}><Button>Login</Button></LoginLink>
            <RegisterLink postLoginRedirectURL={"https://horizons-flax.vercel.app/dashboard"}><Button>Register</Button></RegisterLink>
        </>
    )
}

export default Page