import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";

async function User(){
    const {getUser} = getKindeServerSession()
    return await getUser()
}
export const user = User

async function Authentication(){
    const {isAuthenticated} = getKindeServerSession()
    return await isAuthenticated()
}
export const authentication = Authentication