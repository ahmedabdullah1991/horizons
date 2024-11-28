"use client";
import * as React from "react";
import {KindeProvider} from "@kinde-oss/kinde-auth-nextjs";

export const AuthProvider = ({children}: Readonly<{children: React.ReactNode}>) => {
    return <KindeProvider>{children}</KindeProvider>;
};