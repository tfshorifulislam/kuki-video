"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export type ActionState = {
    success?: boolean;
    message?: string;
    error?: string;
} | null;

//signup actions
export async function handleSignup(
    prevState: ActionState,
    formData: FormData
): Promise<ActionState> {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!name || !email || !password) {
        return { error: "Please fill in all fields." };
    }

    try {
        await auth.api.signUpEmail({
            body: {
                email,
                name,
                password,
            },
            headers: await headers(),
        });

    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : "Failed to create account.";
        return {
            error: errorMessage
        };
    }
    redirect('/auth/verification')
}



// login actions
export async function handleLogin(
    prevState: ActionState,
    formData: FormData
): Promise<ActionState> {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
        return { error: "Please fill in all fields." };
    }

    try {
        await auth.api.signInEmail({
            body: {
                email,
                password,
            },
            headers: await headers(),
        });

    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : "Invalid email or password.";
        return {
            error: errorMessage
        };
    }
    redirect('/')
}


// send reset password email
export async function handleForgotPassword(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const email = formData.get("email") as string;

  if (!email) {
    return { error: "Please enter your email address." };
  }

  try {
    await auth.api.requestPasswordReset({
      body: {
        email,
        redirectTo: "/auth/reset-password",
      },
      headers: await headers(),
    });

    return {
      success: true,
      message: "Password reset link has been sent to your email!",
    };
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Something went wrong.";
    return { error: errorMessage };
  }
}

// set new password actions
export async function handleResetPassword(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const password = formData.get("password") as string;
  const token = formData.get("token") as string;

  if (!password || !token) {
    return { error: "Invalid request or missing token." };
  }

  try {
    await auth.api.resetPassword({
      body: {
        newPassword: password,
        token: token,
      },
      headers: await headers(),
    });

    return {
      success: true,
      message: "Password reset successful! You can now log in.",
    };
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to reset password.";
    return { error: errorMessage };
  }
}