import * as React from "react"
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,} from "@/components/ui/card"
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
    header, title, description,
    children, footer, className,
    headerClassName, contentClassName,
    footerClassName, removeHeader,
                                                }) => {
    return (<Card className={cn(className, "flex flex-col justify-between")}>
            {!removeHeader && (header || title || description) && (<CardHeader className={cn(headerClassName)}>
                    {header || (<>
                            {title && <CardTitle>{title}</CardTitle>}
                            {description && <CardDescription>{description}</CardDescription>}
                        </>)}
                </CardHeader>)}
            {children && (
                <CardContent className={cn(contentClassName)}>{children}</CardContent>)}
            {footer && (<CardFooter className={cn("flex justify-end w-full", footerClassName)}>
                    {footer}
                </CardFooter>)}
        </Card>)
}