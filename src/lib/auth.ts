import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "@/lib/prisma";
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),

    emailAndPassword: {
        enabled: true,
        requireEmailVerification: true
    },

    emailVerification: {
        sendVerificationEmail: async ({ user, url }) => {
            await resend.emails.send({
                from: 'onboarding@resend.dev',
                to: user.email,
                subject: "Verify Email",
                html: `<p>Click <a href="${url}">here</a> to verify your email.</p>`,
            })
        }
    },

    trustedOrigins: ["http://localhost:3001"],

});