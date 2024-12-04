import * as React from "react"
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,} from "@/components/ui/card"
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar"


interface Card {
    header?: React.ReactElement | string | number | undefined
    title?: React.ReactElement | string | number | undefined
    description?: React.ReactElement | string | number | undefined
    content?: React.ReactElement | string | number | undefined
    children?: React.ReactElement | string | number | undefined
    footer?: React.ReactElement | string | number | undefined
    children2?: React.ReactElement | string | number | undefined
    className?: string
}

export const ReusableCard = (props: Card) => {
    return (
        <Card
            className={props.className + "border-none"}
        >
            {props.header !== "remove" && (
                <CardHeader>
                    <CardTitle>{props.title}</CardTitle>
                    <CardDescription>{props.description}</CardDescription>
                </CardHeader>
            )}
            {props.content !== "remove" && (
                <CardContent>{props.children}</CardContent>
            )}
            {props.footer !== "remove" && (
                <CardFooter className={"flex justify-end"}>
                    {props.children2}
                </CardFooter>
            )}
        </Card>
    )
}


export const avatarUrls = [
    {src: "https://utfs.io/f/XNbrjM3iH8Zx4a6w5j1szjWachy7KxTJpHMut4eRqLDObm0w"},
    {src: "https://utfs.io/f/XNbrjM3iH8Zxhr1bVTzuHw9M2joZfQV8X7WOYxPSicLm3se4"},
    {src: "https://utfs.io/f/XNbrjM3iH8ZxiuYQi3aUQW0duRlOHfnLbqV7ZG8cBseK5rFk"},
]

export const Avatars = () => {
    return (
        <>
            {avatarUrls.map((value, index) => (
                <Avatar key={index}>
                    <AvatarImage>{value.src}</AvatarImage>
                    <AvatarFallback>UI</AvatarFallback>
                </Avatar>
            ))}
        </>
    )
}