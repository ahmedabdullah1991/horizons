"use client"

import * as React from "react"
import {useState} from "react"
import {useFormState, useFormStatus} from "react-dom";
import {Orbitron} from "next/font/google";
import {usePathname} from "next/navigation";
import {Check, FileText, Home, Menu, Minus, Settings} from "lucide-react";
import {
    NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import {Label} from "@/components/ui/label";
import {ReusableCard} from "@/components/components";
import {createCompany, createListing, ListingState, prevState} from "@/lib/actions";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link";
import {clsx} from "clsx";
import {Menubar, MenubarMenu, MenubarTrigger,} from "@/components/ui/menubar"
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import {useTheme} from "next-themes";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";
import Image from "next/image";
import {Collapsible, CollapsibleContent, CollapsibleTrigger} from "@/components/ui/collapsible";
import 'react-phone-number-input/style.css'


const orbitron = Orbitron({subsets: ["latin"]})

interface Navigation {
    children: React.ReactNode
    logout: React.ReactNode
    trigger: string
}

export function Navigation(props: Navigation) {
    const pathname = usePathname()
    return (<div className={"flex flex-row justify-between p-4 border-b"}>
        <NavigationMenu>
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuLink
                        className={`${orbitron.className} ${navigationMenuTriggerStyle()} hover:bg-transparent hover:underline`}
                        href={"/"}>
                        HORIZONS
                    </NavigationMenuLink>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
        {pathname === "/" && (<>
            <NavigationMenu className={"hidden lg:flex"}>
                <NavigationMenuList>
                    <NavigationMenuItem>
                        {props.children}
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuLink className={`${navigationMenuTriggerStyle()}`}
                                            href={"/jobs"}>
                            JOB POSTINGS
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
            <div className={"lg:hidden"}>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost"><Menu/></Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                        <DropdownMenuLabel>Navigation Menu</DropdownMenuLabel>
                        <DropdownMenuSeparator/>
                        <DropdownMenuGroup>
                            <Link href={props.trigger === "EMPLOYERS" ? "/api/auth/login" : "/dashboard"}>
                                <DropdownMenuItem>{props.trigger}
                                    <DropdownMenuShortcut></DropdownMenuShortcut>
                                </DropdownMenuItem>
                            </Link>
                            <Link href={"/jobs"}>
                                <DropdownMenuItem>JOBS
                                    <DropdownMenuShortcut></DropdownMenuShortcut>
                                </DropdownMenuItem>
                            </Link>
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </>)}
        {pathname !== "/" && (<>
            <Dropdown>
                {props.logout}
            </Dropdown>
        </>)}
    </div>)
}

export function CreateCompany() {
    const initialState: prevState = {message: null, errors: {}}
    const [state, formAction] = useFormState(createCompany, initialState)
    return (<ReusableCard
        title={"REGISTER AS A COMPANY/EMPLOYER"}
        children2={<Button type={"submit"}>SUBMIT</Button>}
    >
        <form action={formAction}>
            <Label
                htmlFor={"companyName"}
                className={"flex flex-col gap-1.5"}
            >
                COMPANY NAME:
                <Input
                    id={"companyName"}
                    name={"companyName"}
                    required={true}
                />
                <div
                    aria-live={"polite"}
                    aria-atomic={"true"}
                >
                    {state.errors?.companyName && state.errors.companyName.map((error: string) => (
                        <Label key={error}>{error}</Label>))}
                </div>
            </Label>
        </form>
    </ReusableCard>)
}

const pathnames = [{href: "/jobs", label: "JOBS", shortcut: "⌘J"}, {
    href: "/dashboard", label: "DASHBOARD", shortcut: "⌘D"
}, {href: "/profile", label: "PROFILE", shortcut: "⌘P"}, {href: "/generate", label: "GENERATE", shortcut: "⌘G"},]

export function Dropdown({children}: Readonly<{ children: React.ReactNode }>) {
    const pathname = usePathname()
    return (<DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button variant="ghost"><Menu/></Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Navigation Menu</DropdownMenuLabel>
            <DropdownMenuSeparator/>
            <DropdownMenuGroup>
                {pathnames.map((value, index) => (<Link href={value.href} key={index}>
                    <DropdownMenuItem className={clsx("", pathname === value.href && "text-[#007FFF]")}>
                        {value.label}
                        <DropdownMenuShortcut
                            className={"text-muted-foreground"}>{value.shortcut}</DropdownMenuShortcut>
                    </DropdownMenuItem>
                </Link>))}
                <DropdownMenuItem>
                    {children}
                </DropdownMenuItem>
            </DropdownMenuGroup>
        </DropdownMenuContent>
    </DropdownMenu>)
}

const pathnames1 = [{icon: Home, label: 'SETTINGS', href: '/profile'}, {
    icon: FileText, label: 'ACCOUNT', href: '/profile/account'
}, {icon: Settings, label: 'PREFERENCES', href: '/profile/preferences'},]

export function Sidebar({children}: Readonly<{ children: React.ReactNode }>) {
    const pathname = usePathname()
    return (<>
        <div className={"flex flex-row gap-6 max-w-4xl mx-auto p-6"}>
            <div className={"hidden lg:flex h-max"}>
                <Menubar>
                    <div className={"flex flex-col"}>
                        {pathnames1.map((value, index) => (<MenubarMenu key={index}>
                            <Link href={value.href}><MenubarTrigger
                                className={clsx("", pathname === value.href && "text-[#007FFF]")}>
                                {value.label}
                            </MenubarTrigger></Link>
                        </MenubarMenu>))}
                    </div>
                </Menubar>
            </div>
            <div>{children}</div>
        </div>
    </>)
}

const titleNames = [{href: "/jobs", label: "JOBS"}, {href: "/dashboard", label: "DASHBOARD"}, {
    href: "/profile", label: "PROFILE"
}, {href: "/generate", label: "GENERATE"}, {
    href: "/profile/preferences", label: "PREFERENCES"
}, {href: "/profile/account", label: "ACCOUNT"}]

export const Titles = () => {
    const pathname = usePathname()
    return (<>
        {pathname !== "/" && (<>
            <div className={"p-4 border-b flex flex-row justify-between items-center"}>
                <div className={"px-4"}>
                    {titleNames.map((value, index) => (
                        <Label key={index}>{pathname === value.href && value.label}</Label>))}
                </div>
                {pathname === "/profile" && (<>
                    <div className={"lg:hidden"}>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost"><Menu/></Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56">
                                <DropdownMenuLabel>Navigation Menu</DropdownMenuLabel>
                                <DropdownMenuSeparator/>
                                <DropdownMenuGroup>
                                    {pathnames1.map((value, index) => (<DropdownMenuItem key={index}
                                                                                         className={clsx("", pathname === value.href && "text-[#007FFF]")}>
                                        {value.label}
                                    </DropdownMenuItem>))}
                                </DropdownMenuGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </>)}
            </div>
        </>)}
    </>)
}

export function CompanyNameInputCard() {
    const [companyName, setCompanyName] = useState('')
    const initialState: prevState = {message: null, errors: {}}
    const [state, formAction] = useFormState(createCompany, initialState)
    const {pending} = useFormStatus()
    return (<Card className="w-full max-w-md mx-auto">
        <CardHeader>
            <CardTitle>Company Information</CardTitle>
            <CardDescription>Enter your company name to get started</CardDescription>
        </CardHeader>
        <form action={formAction}>
            <CardContent>
                <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="companyName">Company Name</Label>
                        <Input
                            id="companyName"
                            name="companyName"
                            placeholder="Enter your company name"
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                            className={"focus"}
                        />
                    </div>
                </div>
                <div
                    aria-live={"polite"}
                    aria-atomic={"true"}
                    className={"text-right"}
                >
                    {state.errors?.companyName && state.errors.companyName.map((error: string) => (
                        <Label key={error} className={"text-red-600"}>{error}</Label>))}
                </div>
            </CardContent>
            <CardFooter className="flex justify-end">
                <Button type="submit" disabled={pending}>
                    Submit
                </Button>
            </CardFooter>
        </form>
    </Card>)
}

export function JobPositionInputCard() {
    const initialState: ListingState = {
        errors: {}, message: null,
    }
    const [state, forAction] = useFormState(createListing, initialState)
    const [formData, setFormData] = useState({
        title: '', type: '', department: '', location: ''
    })
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target
        setFormData(prev => ({...prev, [name]: value}))
    }
    const handleSelectChange = (name: string) => (value: string) => {
        setFormData(prev => ({...prev, [name]: value}))
    }
    return (<Card className="w-full max-w-md mx-auto my-16">
        <CardHeader>
            <CardTitle>Job Position Information</CardTitle>
            <CardDescription>Enter the details for the new job position</CardDescription>
        </CardHeader>
        <form action={forAction}>
            <CardContent>
                <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="title">Position Title</Label>
                        <Input
                            id="title"
                            name="title"
                            placeholder="Enter position title"
                            value={formData.title}
                            onChange={handleInputChange}
                        />
                        {state.errors?.title && state.errors.title.map((error: string) => (
                            <Label key={error} className={"text-red-600 text-right"}>{error}</Label>))}
                    </div>
                    <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="type">Type</Label>
                        <Select name="type" value={formData.type} onValueChange={handleSelectChange('type')}>
                            <SelectTrigger id="type">
                                <SelectValue placeholder="Select job type"/>
                            </SelectTrigger>
                            <SelectContent position="popper">
                                <SelectItem value="full-time">Full-time</SelectItem>
                                <SelectItem value="part-time">Part-time</SelectItem>
                                <SelectItem value="contract">Contract</SelectItem>
                                <SelectItem value="internship">Internship</SelectItem>
                            </SelectContent>
                        </Select>
                        {state.errors?.type && state.errors.type.map((error: string) => (
                            <Label key={error} className={"text-red-600 text-right"}>{error}</Label>))}
                    </div>
                    <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="department">Department</Label>
                        <Input
                            id="department"
                            name="department"
                            placeholder="Enter department"
                            value={formData.department}
                            onChange={handleInputChange}
                        />
                        {state.errors?.department && state.errors.department.map((error: string) => (
                            <Label key={error} className={"text-red-600 text-right"}>{error}</Label>))}
                    </div>
                    <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="location">Location</Label>
                        <Input
                            id="location"
                            name="location"
                            placeholder="Enter location"
                            value={formData.location}
                            onChange={handleInputChange}
                        />
                        {state.errors?.location && state.errors.location.map((error: string) => (
                            <Label key={error} className={"text-red-600 text-right"}>{error}</Label>))}
                    </div>
                    <Label className={"text-red-600 text-right"}>{state.message}</Label>
                </div>
            </CardContent>
            <CardFooter className="flex justify-end">
                <Button type={"submit"}>Submit</Button>
            </CardFooter>
        </form>
    </Card>)
}

const items = [{
    id: "radio-18-r1", value: "r1", label: "Light", image: "/ui-light.webp", theme: "light"
}, {id: "radio-18-r2", value: "r2", label: "Dark", image: "/ui-dark.webp", theme: "dark"}, {
    id: "radio-18-r3", value: "r3", label: "System", image: "/ui-system.webp", theme: "system"
},];

export function Themes() {
    const {setTheme} = useTheme();
    return (<fieldset className="space-y-4">
        <legend className="text-sm font-medium leading-none text-foreground">Choose a theme</legend>
        <RadioGroup className="flex gap-3" defaultValue="r1">
            {items.map((item) => (<label key={item.id}>
                <RadioGroupItem
                    id={item.id}
                    value={item.value}
                    className="peer sr-only after:absolute after:inset-0"
                />
                <Image
                    src={item.image}
                    alt={item.label}
                    width={88}
                    height={70}
                    onClick={() => setTheme(item.theme)}
                    className="relative cursor-pointer overflow-hidden rounded-lg border border-input shadow-sm shadow-black/5 outline-offset-2 transition-colors peer-[:focus-visible]:outline peer-[:focus-visible]:outline-2 peer-[:focus-visible]:outline-ring/70 peer-data-[disabled]:cursor-not-allowed peer-data-[state=checked]:border-ring peer-data-[state=checked]:bg-accent peer-data-[disabled]:opacity-50"
                />
                <span
                    className="group mt-2 flex items-center gap-1 peer-data-[state=unchecked]:text-muted-foreground/70">
              <Check
                  size={16}
                  strokeWidth={2}
                  className="peer-data-[state=unchecked]:group-[]:hidden"
                  aria-hidden="true"
              />
              <Minus
                  size={16}
                  strokeWidth={2}
                  className="peer-data-[state=checked]:group-[]:hidden"
                  aria-hidden="true"
              />
              <span className="text-xs font-medium">{item.label}</span>
            </span>
            </label>))}
        </RadioGroup>
    </fieldset>);
}

interface ApplicationCardProps {
    companyName?: string
}

export const ApplicationCard: React.FC<ApplicationCardProps> = ({
                                                                    companyName
                                                                }) => {
    const [file, setFile] = useState<File | null>(null)
    const [error, setError] = useState<string | null>(null)
    const MAX_FILE_SIZE = 16 * 1024 * 1024
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0]
        if (selectedFile) {
            if (selectedFile.type !== "application/pdf") {
                setError("Invalid file type. Please select a PDF file.")
                setFile(null)
            } else if (selectedFile.size > MAX_FILE_SIZE) {
                setError("File too large. File size exceeds 16MB limit.")
                setFile(null)
            } else {
                setFile(selectedFile)
                setError(`${selectedFile.name} (${(selectedFile.size / (1024 * 1024)).toFixed(2)} MB)`)
            }
        } else {
            setFile(null)
            setError("")
        }
    }

    return (<div className="p-4 flex flex-col items-center justify-center space-y-4">
        <ReusableCard
            className={"w-full max-w-md"}
            header={<main className={"flex items-center space-x-4 p-6"}>
                <Image src={""} alt={""} width={64} height={64}
                       className={"border-2 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-full"}
                       style={{objectFit: "contain"}}/>
                <Label>
                    {companyName}
                </Label>
            </main>}
        />
        <ReusableCard
            title={"Application Form"}
            description={"Fill out the form below to apply for the job position. All fields are required."}
            className={"w-full max-w-md"}
            footer={<form action={""}>
                <section className={"flex justify-end"}>
                    <Button type={"submit"}>Submit</Button>
                </section>
            </form>}
        >
            <form className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="ahmed.devv@proton.me"
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="resume">Upload Resume (Max 16MB)</Label>
                    <Input
                        id="resume"
                        name="resume"
                        type="file"
                        accept=".pdf"
                        onChange={handleFileChange}
                        className="cursor-pointer"
                    />
                    {file?.name}
                    {error && <Label className={"text-red-600"}>{error}</Label>}
                </div>
            </form>
        </ReusableCard>
    </div>)
}


const quickLinks = [{href: '/about', label: 'About Us'}, {href: '/services', label: 'Services'}, {
    href: '/products', label: 'Products'
}, {href: '/contact', label: 'Contact Us'},]

const legalLinks = [{href: '/privacy', label: 'Privacy Policy'}, {
    href: '/terms', label: 'Terms of Service'
}, {href: '/cookies', label: 'Cookie Policy'},]

export function Footer() {
    const [state, setState] = React.useState(false)

    return (<>
        <Collapsible open={state}>
            {!state && (<CollapsibleTrigger className={"mx-auto w-full py-8 border-t"} onClick={() => setState(true)}>
                <div className="text-center text-sm">
                    <p>&copy; {new Date().getFullYear()} HORIZONS. All rights reserved.</p>
                </div>
            </CollapsibleTrigger>)}
            {state && (<CollapsibleContent onClick={() => setState(false)}>
                <footer className={"border-t"}>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {/* Company Info */}
                            <div>
                                <Link href="/" className="flex items-center mb-4">
                                    <span className="sr-only">HORIZONS</span>
                                    <svg className="h-8 w-auto" fill="none" viewBox="0 0 24 24"
                                         stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                              d="M13 10V3L4 14h7v7l9-11h-7z"/>
                                    </svg>
                                    <span className="ml-2 text-sm font-medium">HORIZONS</span>
                                </Link>
                                <p className="text-sm">
                                    We are dedicated to providing the best service to our customers.
                                </p>
                            </div>

                            <div className={"flex flex-col gap-4"}>
                                <Label className="text-sm font-semibold">QUICK LINKS</Label>
                                <ul className="space-y-2 text-sm">
                                    {quickLinks.map((link) => (<li key={link.href}>
                                        <Link href={link.href}
                                              className="hover:text-white transition-colors">
                                            {link.label}
                                        </Link>
                                    </li>))}
                                </ul>
                            </div>


                            <div className={"flex flex-col gap-4"}>
                                <Label className="text-sm font-semibold mb-4">LEGAL</Label>
                                <ul className="space-y-2 text-sm">
                                    {legalLinks.map((link) => (<li key={link.href}>
                                        <Link href={link.href}
                                              className="hover:text-white transition-colors">
                                            {link.label}
                                        </Link>
                                    </li>))}
                                </ul>
                            </div>

                            <div>
                                <h3 className="text-sm font-semibold mb-4">STAY CONNECTED</h3>
                                <form className="space-y-2">
                                    <Input
                                        type="email"
                                        placeholder="Enter your email"
                                        aria-label="Email for newsletter"
                                    />
                                    <Button type="submit" className="w-full">
                                        Subscribe
                                    </Button>
                                </form>
                            </div>
                        </div>

                        <div className="mt-8 pt-8 border-t border-gray-800">
                        </div>

                        <div className="text-center text-sm">
                            <p>&copy; {new Date().getFullYear()} HORIZONS. All rights reserved.</p>
                        </div>
                    </div>
                </footer>
            </CollapsibleContent>)}
        </Collapsible>
    </>)
}