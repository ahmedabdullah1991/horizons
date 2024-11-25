import React from "react";

const Layout = ({children}: Readonly<{children: React.ReactNode}>) => {
    return (
        <>
            {children}
        </>
    )
}

export default Layout