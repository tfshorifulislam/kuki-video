'use client';

import { Button } from "@/components/ui/button"
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useActionState } from "react"
import { handleSignup } from "../../../server/auth-actions"
import { SubmitButton } from "./ButtonWithLoading/SignUpButton";


export function SignUpCard() {
    const [state, formAction] = useActionState(handleSignup, null); 

    return (
        <Card className="w-full max-w-sm">
            <CardHeader>
                <CardTitle>Create an account</CardTitle>
                <CardDescription>
                    Enter your details below to create your account
                </CardDescription>
                <CardAction>
                    <Link href='/auth/login'>Log In</Link>
                </CardAction>
            </CardHeader>

            <CardContent>
                <form action={formAction}>
                    <div className="flex flex-col gap-6">
                       
                        {state?.error && (
                            <div className="p-3 text-sm text-red-600 bg-red-100 rounded-md border border-red-200">
                                {state.error}
                            </div>
                        )}

                       
                        {state?.message && (
                            <div className="p-3 text-sm text-green-600 bg-green-100 rounded-md border border-green-200">
                                {state.message}
                            </div>
                        )}

                        <div className="grid gap-2">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                name="name"
                                type="text"
                                placeholder="your full name"
                                required
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="your@example.com"
                                required
                            />
                        </div>

                        <div className="grid gap-2">
                            <div className="flex items-center">
                                <Label htmlFor="password">Password</Label>
                            </div>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                placeholder="least 8 characters"
                                required
                                pattern="(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}"
                                title="Must contain at least 8 characters, including letters, numbers, and special characters."
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-2 mt-6">
                        <SubmitButton />

                        <Button type="button" variant="outline" className="w-full cursor-pointer">
                            Sign Up with Google
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}