import {PrismaClient} from "@prisma/client";
import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";
import {NextResponse} from "next/server";

const prisma = new PrismaClient();

export async function GET() {
    const {getUser} = getKindeServerSession();
    const user = await getUser();

    if (!user || !user.id)
        throw new Error("something went wrong with authentication" + user);

    const dbUser = await prisma.user.findUnique({
        where: {kindeId: user.id}
    });

    if (!dbUser) {
        await prisma.user.create({
            data: {
                kindeId: user.id,
                firstName: user.given_name ?? "",
                lastName: user.family_name ?? "",
                email: user.email ?? ""
            }
        });
    }

    return NextResponse.redirect("https://horizons-flax.vercel.app/dashboard");
}