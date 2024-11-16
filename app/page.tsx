import {LoginLink} from "@kinde-oss/kinde-auth-nextjs/components";
import {Button} from "@/components/ui/button";

export default async function Page() {
    return (
        <LoginLink><Button>Login</Button></LoginLink>
    )
}