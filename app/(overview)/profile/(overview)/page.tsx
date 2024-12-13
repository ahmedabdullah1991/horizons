import {Data} from "@/lib/datas";
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs'
import {Label} from "@/components/ui/label";

export default async function Settings() {
    const data = await Data()
    const userEmail = data?.userData?.email
    return (<div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-4">SETTINGS</h1>
            <Tabs defaultValue="profile">
                <TabsList>
                    <TabsTrigger value="profile">Profile</TabsTrigger>
                    <TabsTrigger value="account">Account</TabsTrigger>
                    <TabsTrigger value="preferences">Preferences</TabsTrigger>
                </TabsList>
                <TabsContent value="profile">
                    <h2 className="text-xl font-semibold mb-2">Profile Settings</h2>
                    <Label>{userEmail}</Label>
                </TabsContent>
                <TabsContent value="account">
                    <h2 className="text-xl font-semibold mb-2">Account Settings</h2>
                    <p>Manage your account details and security options.</p>
                </TabsContent>
                <TabsContent value="preferences">
                    <h2 className="text-xl font-semibold mb-2">Notification Settings</h2>
                    <p>Configure your notification preferences and alerts.</p>
                </TabsContent>
            </Tabs>
        </div>)
}