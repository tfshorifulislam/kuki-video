import { createAuthClient } from "better-auth/react";

export const { signIn, signUp, signOut, resetPassword, useSession } = createAuthClient();