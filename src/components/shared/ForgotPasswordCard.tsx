import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"

export function ForgotPasswordCard() {
    return (
        <Card className="w-full max-w-sm">
            <CardHeader>
                <CardTitle>Forgot Password</CardTitle>
                <CardDescription>
                    Enter your email to receive a password reset link
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form>
                    <div className="flex flex-col gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="your@mail.com"
                                required
                            />
                        </div>
                    </div>
                </form>
            </CardContent>
            <CardFooter className="flex-col gap-2">
                <Button type="submit" className="w-full cursor-pointer">
                    Send Reset Link
                </Button>
                <Link href='/auth/login' className="w-full">
                    <Button variant="outline" className="w-full cursor-pointer">
                        Back to Login
                    </Button>
                </Link>
            </CardFooter>
        </Card>
    )
}
