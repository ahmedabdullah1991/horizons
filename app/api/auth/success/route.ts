import {NextResponse} from "next/server";
import prisma from "@/lib/db";
import {user} from "@/lib/kinde-imports";

export async function GET() {
    const isUser = await user();

    if (!isUser || !isUser.id)
        throw new Error("something went wrong with authentication" + user);

    const dbUser = await prisma.user.findUnique({
        where: {kindeId: isUser.id}
    });

    if (!dbUser) {
        await prisma.user.create({
            data: {
                kindeId: isUser.id,
                firstName: isUser.given_name ?? "",
                lastName: isUser.family_name ?? "",
                email: isUser.email ?? ""
            }
        });
    }

    return NextResponse.redirect("https://horizons-flax.vercel.app/dashboard");
}