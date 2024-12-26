import * as React from "react"
import {Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription} from "@/components/ui/card"
import {cn} from "@/lib/utils";

interface CardProps {
    header?: React.ReactNode
    title?: React.ReactNode
    description?: React.ReactNode
    content?: React.ReactNode
    children?: React.ReactNode
    footer?: React.ReactNode
    children2?: React.ReactNode
    className?: string
    headerClassName?: string
    contentClassName?: string
    footerClassName?: string
    removeHeader?: boolean
    removeContent?: boolean
    removeFooter?: boolean
}

export const ReusableCard: React.FC<CardProps> = ({
    header, title, description, children, footer, className,
    headerClassName, contentClassName,
    footerClassName
                                                }) => {
    return (
        <Card className={cn(className, "flex flex-col justify-between min-h-full")}>
            {(!header && title) || header ? (
                <CardHeader className={cn(headerClassName)}>
                    {header || (
                        <>
                            <CardTitle>{title}</CardTitle>
                            <CardDescription>{description}</CardDescription>
                        </>
                    )}
                </CardHeader>
            ) : null}
            {children && (
                <CardContent className={cn(contentClassName)}>{children}</CardContent>)}
            {footer && (<CardFooter className={cn("flex justify-end w-full", footerClassName)}>
                    {footer}
                </CardFooter>)}
        </Card>
    )
}