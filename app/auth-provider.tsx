"use client";
import React from "react";
import {KindeProvider} from "@kinde-oss/kinde-auth-nextjs";

export const AuthProvider = ({children}: {children: React.ReactNode}) => {
    return <KindeProvider>{children}</KindeProvider>;
};