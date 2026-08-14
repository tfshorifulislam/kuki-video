'use client';

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { handleForgotPassword } from "../../../server/auth-actions";

export function ForgotPasswordCard() {
    const [state, formAction, isPending] = useActionState(handleForgotPassword, null);

    return (
        <Card className="w-full max-w-sm">
            <CardHeader>
                <CardTitle>Forgot Password</CardTitle>
                <CardDescription>
                    Enter your email to receive a password reset link
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form action={formAction}>
                    <div className="flex flex-col gap-6">
                        
                        {/* Error Message */}
                        {state?.error && (
                            <div className="p-3 text-sm text-red-600 bg-red-100 dark:bg-red-900/30 dark:text-red-400 rounded-md border border-red-200">
                                {state.error}
                            </div>
                        )}

                        {/* Success Message */}
                        {state?.message && (
                            <div className="p-3 text-sm text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400 rounded-md border border-green-200">
                                {state.message}
                            </div>
                        )}

                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="your@mail.com"
                                required
                            />
                        </div>
                    </div>

                    <CardFooter className="flex-col gap-2 mt-6 px-0 pb-0">
                        <Button 
                            type="submit" 
                            disabled={isPending} 
                            className="w-full cursor-pointer"
                        >
                            {isPending ? "Sending link..." : "Send Reset Link"}
                        </Button>
                        
                        <Button variant="outline" className="w-full cursor-pointer">
                            <Link href="/auth/login">
                                Back to Login
                            </Link>
                        </Button>
                    </CardFooter>
                </form>
            </CardContent>
        </Card>
    );
}