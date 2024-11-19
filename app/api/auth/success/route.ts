import prisma from "@/lib/db";
import {user} from "@/lib/kinde-imports";
import {NextResponse} from "next/server";

export async function GET() {
    const User = await user()

    if (!User || !User.id)
        throw new Error("something went wrong with authentication" + user);

    let dbUser = await prisma.user.findUnique({
        where: {kindeId: User.id}
    });

    if (!dbUser) {
        dbUser = await prisma.user.create({
            data: {
                kindeId: User.id,
                firstName: User.given_name ?? "",
                lastName: User.family_name ?? "",
                email: User.email ?? "" // Using nullish coalescing operator to provide a default empty string value
            }
        });
    }

    return NextResponse.redirect("https://horizons-flax.vercel.app/dashboard");
}

