import prisma from "@/lib/db";

export async function GET(req: Request) {
    const url = new URL(req.url)
    const search = url.searchParams.get("search")

    if (!search) {
        return new Response(JSON.stringify({ error: "No search query provided" }), {
            status: 400,
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type, Authorization",
            }
        })
    }

    try {
        const jobs = await prisma.listing.findMany({
            where: {
                OR: [
                    {title: {contains: search, mode: "insensitive"}},
                    {department: {contains: search, mode: "insensitive"}},
                    {location: {contains: search, mode: "insensitive"}},
                    {type: {contains: search, mode: "insensitive"}},
                    {companyName: {contains: search, mode: "insensitive"}},
                ]
            }
        })
        return new Response(JSON.stringify(jobs), {
            status: 200,
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type, Authorization",
            }
        })
    }
    catch (e) {
        console.error(e)
        return new Response(JSON.stringify({ error: "An error occurred while searching for jobs" }), {
            status: 500,
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type, Authorization",
            }
        })
    }
}