import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "@/lib/prisma";
import { Resend } from 'resend';
import ResetPasswordEmail from "@/components/emails/ResetPasswordEmail";
import { nextCookies } from "better-auth/next-js";
import VerifyEmail from "@/components/emails/VerifyEmail";

const resend = new Resend(process.env.RESEND_API_KEY);

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),

    emailAndPassword: {
        enabled: true,
        requireEmailVerification: true,
        resetPasswordTokenExpiresIn: 60 * 5,

        sendResetPassword: async ({ user, url }) => {
            await resend.emails.send({
                from: 'onboarding@resend.dev',
                to: user.email,
                subject: "Reset Your Password",
                react: ResetPasswordEmail({ url, userName: user.name }),
            });
        },

    },

    emailVerification: {
        expiresIn: 60 * 5,

        sendVerificationEmail: async ({ user, url }) => {
            await resend.emails.send({
                from: 'onboarding@resend.dev',
                to: user.email,
                subject: "Verify Email",
                react: VerifyEmail({
                    url,
                    userName: user.name,
                }),
            })
        }
    },

    trustedOrigins: ["http://localhost:3000"],

    plugins: [nextCookies()]
});