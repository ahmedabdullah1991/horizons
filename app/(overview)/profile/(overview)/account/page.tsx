import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs'

export default function Page() {
    return (<div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">ACCOUNT</h1>
        <Tabs defaultValue="profile">
            <TabsList>
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="account">Account</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
            </TabsList>
            <TabsContent value="profile">
                <h2 className="text-xl font-semibold mb-2">Profile Settings</h2>
                <p>Update your personal information and preferences.</p>
            </TabsContent>
            <TabsContent value="account">
                <h2 className="text-xl font-semibold mb-2">Account Settings</h2>
                <p>Manage your account details and security options.</p>
            </TabsContent>
            <TabsContent value="notifications">
                <h2 className="text-xl font-semibold mb-2">Notification Settings</h2>
                <p>Configure your notification preferences and alerts.</p>
            </TabsContent>
        </Tabs>
    </div>)
}