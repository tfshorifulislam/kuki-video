'use client';

import { useActionState } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormStatus } from "react-dom";
import Link from "next/link";
import { handleResetPassword } from "../../../server/auth-actions";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? "Resetting..." : "Reset Password"}
    </Button>
  );
}

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || ""; // URL থেকে টোকেন নেওয়া হচ্ছে

  const [state, formAction] = useActionState(handleResetPassword, null);

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Set New Password</CardTitle>
          <CardDescription>Enter your new password below.</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="space-y-4">
            {/* হিডেন ইনপুট হিসেবে টোকেন পাঠানো হচ্ছে */}
            <input type="hidden" name="token" value={token} />

            {state?.error && (
              <div className="p-3 text-sm text-red-600 bg-red-100 rounded-md">
                {state.error}
              </div>
            )}
            {state?.message && (
              <div className="p-3 text-sm text-green-600 bg-green-100 rounded-md">
                {state.message}
                <div className="mt-2">
                  <Link href="/auth/login" className="text-blue-600 underline text-xs">
                    Click here to Login
                  </Link>
                </div>
              </div>
            )}

            <div className="grid gap-2">
              <Label htmlFor="password">New Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="At least 8 characters"
                required
              />
            </div>

            <SubmitButton />
          </form>
        </CardContent>
      </Card>
    </div>
  );
}