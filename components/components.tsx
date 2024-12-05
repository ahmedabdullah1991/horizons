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
    header, title, description, content,
    children, footer, children2, className,
    headerClassName, contentClassName,
    footerClassName, removeHeader,
    removeContent, removeFooter
                                                }) => {
    return (<Card className={cn(className)}>
            {!removeHeader && (header || title || description) && (<CardHeader className={headerClassName}>
                    {header || (<>
                            {title && <CardTitle>{title}</CardTitle>}
                            {description && <CardDescription>{description}</CardDescription>}
                        </>)}
                </CardHeader>)}
            {!removeContent && (content || children) && (
                <CardContent className={contentClassName}>{content || children}</CardContent>)}
            {!removeFooter && (footer || children2) && (<CardFooter className={cn("flex justify-end", footerClassName)}>
                    {footer || children2}
                </CardFooter>)}
        </Card>)
}