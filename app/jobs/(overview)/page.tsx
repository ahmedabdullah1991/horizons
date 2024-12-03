"use client"

import * as React from "react";
import {useEffect, useState} from "react";
import {Company, Jobs} from "@/lib/data";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";

type CardData = {
    id: number
    title: string
    description: string
    content: string
}

const cardData: CardData[] = [
    {
        id: 1,
        title: "Card 1",
        description: "This is the description for Card 1",
        content: "This is the main content for Card 1. It contains more detailed information about the topic of Card 1."
    },
    {
        id: 2,
        title: "Card 2",
        description: "This is the description for Card 2",
        content: "This is the main content for Card 2. It provides in-depth details about the subject matter of Card 2."
    }
]

export default function Page() {

    {/*interface Listing {
        id: string
        listingsId: string
        createdAt: Date
        updatedAt: Date
        published: boolean
        title: string
        department: string
        location: string
        type: string
        companyName: string
    }*/}

    useEffect(() => {
        const data = () => {
            Jobs().then((data_) => {
                if (data_) {
                    //setData(data_)
                }
            }).catch((error) => {
                console.error(error)
            })

        }
        data()
        const company = () => {
            Company().then((data_) => {
                if (data_) {
                    //setCompanyName(data_)
                }
            }).catch((error) => {
                console.error(error)
            })
        }
        company()
    }, []);

    //const handleJobClick = (job: Listing) => {
    //    setSelectedJob(job)
    //}

    //const [data, setData] = useState<Listing[]>([])
    //const [selectedJob, setSelectedJob] = useState<Listing | null>(null)
    //const [companyName, setCompanyName] = useState<string>("")

    const [selectedCard, setSelectedCard] = useState<CardData | null>(null)

    return (
        <div className="min-h-screen h-screen bg-gray-100 p-4 flex items-center justify-center">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-6xl mx-auto h-full">
                <div className="md:col-span-1 h-full flex flex-col justify-center space-y-4">
                    {cardData.map((card) => (
                        <Card
                            key={card.id}
                            className="cursor-pointer hover:shadow-md transition-shadow"
                            onClick={() => setSelectedCard(card)}
                        >
                            <CardHeader>
                                <CardTitle>{card.title}</CardTitle>
                                <CardDescription>{card.description}</CardDescription>
                            </CardHeader>
                        </Card>
                    ))}
                </div>
                <div className="md:col-span-2 h-full flex items-center">
                    <Card className="h-full w-full overflow-auto">
                        {selectedCard ? (
                            <>
                                <CardHeader>
                                    <CardTitle>{selectedCard.title}</CardTitle>
                                    <CardDescription>{selectedCard.description}</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p>{selectedCard.content}</p>
                                </CardContent>
                            </>
                        ) : (
                            <CardContent className="h-full flex items-center justify-center">
                                <p className="text-muted-foreground">Select a card to view details</p>
                            </CardContent>
                        )}
                    </Card>
                </div>
            </div>
        </div>
    )
}