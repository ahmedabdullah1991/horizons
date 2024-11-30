import {user} from "@/lib/kinde-imports";

export default async function Page(){
    const User = await user()
    return (
        <>
            {User.id}
        </>
    )
}