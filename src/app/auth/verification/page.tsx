import { Mail,} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Verification = () => {
  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-slate-50 dark:bg-slate-950">
      <Card className="w-full max-w-md text-center shadow-lg border-slate-200 dark:border-slate-800">
        <CardHeader className="space-y-3 pb-4">
          {/* Email Icon Badge */}
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400">
            <Mail className="h-8 w-8 animate-pulse" />
          </div>

          <CardTitle className="text-2xl font-bold tracking-tight">
            Check your email
          </CardTitle>

          <CardDescription className="text-base text-slate-600 dark:text-slate-400">
            We’ve sent a verification link to your email address. Please check your inbox and verify your email to continue.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Helper Callout Box */}
          <div className="rounded-lg bg-amber-50 dark:bg-amber-950/30 p-3 text-xs text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-900/50">
            <p>
              Can&apos;t find the email? Be sure to check your <strong>Spam</strong> or <strong>Junk</strong> folder.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Verification;