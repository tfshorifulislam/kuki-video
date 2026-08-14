"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export type ActionState = {
  success?: boolean;
  message?: string;
  error?: string;
} | null;

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

    return { 
      success: true, 
      message: "Registration successful!" 
    };

    redirect('/auth/verification')

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Failed to create account.";
    return { 
      error: errorMessage 
    };
  }
}