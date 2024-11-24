"use client"

import * as React from "react"
import {useMemo, useCallback, useState, useEffect} from "react";
import {useFormState} from "react-dom";
import Link from "next/link"
import {usePathname} from "next/navigation";
import {clsx} from "clsx";
import {Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger} from "@/components/ui/sheet"
import {Button} from "@/components/ui/button"
import {Menu} from "lucide-react";
import {ReusableCard} from "@/components/components";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {createCompany, prevState, createListing, ListingState} from "@/lib/actions";

export function NavigationSheet({children}: {children: React.ReactNode}) {
    const pathname = usePathname()
    const links = [
        {name: "Horizons", href: "/"},
        {name: "Jobs", href: "/jobs"},
        {name: "Dashboard", href: "/dashboard"},
        {name: "Profile", href: "/profile"},
    ]

    if (pathname !== "/") {
        return (
            <Sheet>
                <SheetTrigger>
                    <Button variant={"link"} className={"text-lg h-[50px] px-[25px]"}>
                        <Menu/>
                    </Button>
                </SheetTrigger>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>Navigation</SheetTitle>
                    </SheetHeader>
                    <div className="grid gap-4 py-4">
                        {links.map((value, index) => (
                            <div
                                className="grid grid-cols-4 items-center gap-4"
                                key={index}
                            >
                                <Link href={value.href}>
                                    <Button
                                        variant={"link"}
                                        className={clsx("", {
                                            underline: pathname === value.href,
                                        })}
                                    >
                                        {value.name}
                                    </Button>
                                </Link>
                            </div>
                        ))}
                        {children}
                    </div>
                    <SheetFooter></SheetFooter>
                </SheetContent>
            </Sheet>
        )
    }
}

export function CreateCompany() {
    const initialState: prevState = {message: null, errors: {}}
    const [state, formAction] = useFormState(createCompany, initialState)
    return (
        <ReusableCard
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
                        {state.errors?.companyName &&
                            state.errors.companyName.map((error: string) => (
                                <Label key={error}>{error}</Label>
                            ))}
                    </div>
                </Label>
            </form>
        </ReusableCard>
    )
}

interface FormData {
    title: string
    department: string
    location: string
    type: string
}

interface FormErrors {
    title?: string
    department?: string
    location?: string
    type?: string
}

export function CreateListing() {
    const initialState: ListingState = {message: null, errors: {}}
    const [state, formAction] = useFormState(createListing, initialState)
    const [display, setDisplay] = useState<number>(1)
    const [formData, setFormData] = useState<FormData>({
        title: "",
        department: "",
        location: "",
        type: "",
    })
    const [errors, setErrors] = useState<FormErrors>({})

    const fieldValidation = useMemo(() => ({
        title: {min: 5, max: 30},
        department: {min: 10, max: 30},
        location: {min: 3, max: 50},
        type: {min: 3, max: 20},
    }), []);

    const validatedField = useCallback(
        (name: keyof FormData, value: string) => {
            const {min, max} = fieldValidation[name]
            if (value.length === 0) {
                return ""
            }
            if (value.length < min) {
                return `${name.charAt(0).toUpperCase()}${name.slice(1)} should be ${min} characters or more`
            }
            if (value.length > max) {
                return `${name.charAt(0).toUpperCase()}${name.slice(1)} should be ${max} characters or less`
            }
        },
        [fieldValidation]
    )
    const [showError, setShowError] = useState<boolean>(true)
    useEffect(() => {
        const storedData: FormData = {
            title: sessionStorage.getItem("title") || "",
            department: sessionStorage.getItem("department") || "",
            location: sessionStorage.getItem("location") || "",
            type: sessionStorage.getItem("type") || "",
        }
        setFormData(storedData)
        if (state.errors) {
            setShowError(true)
            const timer = setTimeout(() => {
                setShowError(false)
            }, 5000)

            return () => clearTimeout(timer)
        }
    }, [state.errors])
    const handleChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const {name, value} = e.target
            setFormData((prev) => ({...prev, [name]: value}))
            sessionStorage.setItem(name, value)
            const error = validatedField(name as keyof FormData, value)
            setErrors((prev) => ({...prev, [name]: error}))
        },
        [validatedField]
    )
    const handleNext = () => setDisplay((prev) => Math.min(prev + 1, 3))
    const handleBack = () => setDisplay((prev) => Math.max(prev - 1, 1))
    return (
        <form action={formAction}>
            <div className="flex items-center justify-center min-h-[calc(100vh-164px)] p-4">
                <ReusableCard
                    children2={
                        <div className="flex flex-row gap-2">
                            {display > 1 && (
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={handleBack}
                                >
                                    BACK
                                </Button>
                            )}
                            {display < 3 && (
                                <Button
                                    type="button"
                                    onClick={handleNext}
                                >
                                    NEXT
                                </Button>
                            )}
                            {display === 3 && (
                                <Button type="submit">SUBMIT</Button>
                            )}
                        </div>
                    }
                    title={"POSITION DATA"}
                    description={
                        "Please complete the form. All fields are required."
                    }
                    className="w-full max-w-md"
                >
                    <>
                        {display === 1 && (
                            <div className="space-y-2">
                                {Object.entries(formData)
                                    .map(([key, value]) => (
                                        <div
                                            key={key}
                                            className="space-y-1"
                                        >
                                            <Label
                                                htmlFor="key"
                                                className="capitalize"
                                            >
                                                {key}
                                            </Label>
                                            <Input
                                                type="text"
                                                name={key}
                                                value={value}
                                                onChange={handleChange}
                                                aria-invalid={
                                                    errors[key as keyof FormErrors]
                                                        ? "true"
                                                        : "false"
                                                }
                                                aria-describedby={`${key}-error`}
                                            />
                                            {errors[key as keyof FormErrors] && (
                                                <Label
                                                    id={`${key}-error`}
                                                    className="text-red-500 text-xs"
                                                    aria-live="polite"
                                                >
                                                    {
                                                        errors[
                                                            key as keyof FormErrors
                                                            ]
                                                    }
                                                </Label>
                                            )}
                                        </div>
                                    ))
                                    .slice(0, 2)}
                            </div>
                        )}
                        {display === 2 && (
                            <div className="space-y-2">
                                {Object.entries(formData)
                                    .map(([key, value]) => (
                                        <div
                                            key={key}
                                            className="space-y-1"
                                        >
                                            <Label
                                                htmlFor="key"
                                                className="capitalize"
                                            >
                                                {key}
                                            </Label>
                                            <Input
                                                type="text"
                                                name={key}
                                                value={value}
                                                onChange={handleChange}
                                                aria-invalid={
                                                    errors[key as keyof FormErrors]
                                                        ? "true"
                                                        : "false"
                                                }
                                                aria-describedby={`${key}-error`}
                                            />
                                            {errors[key as keyof FormErrors] && (
                                                <Label
                                                    id={`${key}-error`}
                                                    className="text-red-500 text-xs"
                                                    aria-live="polite"
                                                >
                                                    {
                                                        errors[
                                                            key as keyof FormErrors
                                                            ]
                                                    }
                                                </Label>
                                            )}
                                        </div>
                                    ))
                                    .slice(2, 4)}
                            </div>
                        )}
                        {display === 3 && (
                            <div className="space-y-2">
                                <div>
                                    <Label
                                        htmlFor="title"
                                        className="space-y-1"
                                    >
                                        Position Title
                                        <Input
                                            id="title"
                                            name="title"
                                            value={formData.title}
                                            onChange={handleChange}
                                        />
                                    </Label>
                                    {state.errors &&
                                        state.errors.title &&
                                        showError && (
                                            <Label className="text-red-600 text-xs">
                                                {state.errors.title}
                                            </Label>
                                        )}
                                </div>
                                <div>
                                    <Label
                                        htmlFor="department"
                                        className="space-y-1"
                                    >
                                        Department
                                        <Input
                                            id="department"
                                            name="department"
                                            value={formData.department}
                                            onChange={handleChange}
                                        />
                                    </Label>
                                    {state.errors &&
                                        state.errors.department &&
                                        showError && (
                                            <Label className="text-red-600 text-xs">
                                                {state.errors.department}
                                            </Label>
                                        )}
                                </div>
                                <div>
                                    <Label
                                        htmlFor="location"
                                        className="space-y-1"
                                    >
                                        Location
                                        <Input
                                            id="location"
                                            name="location"
                                            value={formData.location}
                                            onChange={handleChange}
                                        />
                                    </Label>
                                    {state.errors &&
                                        state.errors.location &&
                                        showError && (
                                            <Label className="text-red-600 text-xs">
                                                {state.errors.location}
                                            </Label>
                                        )}
                                </div>
                                <div>
                                    <Label
                                        htmlFor="type"
                                        className="space-y-1"
                                    >
                                        Type
                                        <Input
                                            id="type"
                                            name="type"
                                            value={formData.type}
                                            onChange={handleChange}
                                        />
                                    </Label>
                                    {state.errors && state.errors.type && showError && (
                                        <Label className="text-red-600 text-xs">
                                            {state.errors.type}
                                        </Label>
                                    )}
                                </div>
                            </div>
                        )}
                    </>
                </ReusableCard>
            </div>
        </form>
    )
}