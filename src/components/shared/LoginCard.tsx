'use client';

import { Button } from "@/components/ui/button"
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { handleLogin } from "../../../server/auth-actions"
import { useActionState } from "react"
import { LoginButton } from "./ButtonWithLoading/SignUpButton"

export function LoginCard() {
    const [state, formAction] = useActionState(handleLogin, null);

    return (
        <Card className="w-full max-w-sm">
            <CardHeader>
                <CardTitle>Login to your account</CardTitle>
                <CardDescription>
                    Enter your email below to login to your account
                </CardDescription>
                <CardAction>
                    <Link href='/auth/signup'>Sign Up</Link>
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

                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="you@example.com"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <div className="flex items-center">
                                <Label htmlFor="password">Password</Label>
                                <Link
                                    href="/auth/forgot-password"
                                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                                >
                                    Forgot your password?
                                </Link>
                            </div>
                            <Input
                                placeholder="Enter your password"
                                id="password"
                                name="password"
                                type="password"
                                required />
                        </div>
                    </div>
                    <CardFooter className="flex-col gap-2">
                        <LoginButton />

                        <Button variant="outline" className="w-full cursor-pointer">
                            Login with Google
                        </Button>
                    </CardFooter>
                </form>
            </CardContent>
        </Card>
    )
}
