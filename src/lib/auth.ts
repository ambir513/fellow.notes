import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "./prisma";
import { sendEmail } from "./brevo";
import { customSession } from "better-auth/plugins";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: false,
        defaultValue: "USER",
        input: false,
      },
      plan: {
        type: "string",
        required: false,
        defaultValue: "FREE",
        input: false,
      },
    },
  },
  databaseHooks: {
    user: {
      create: {
        after: async (user) => {
          const ADMIN_EMAILS = process.env.ADMIN_EMAILS!;
          if (ADMIN_EMAILS.split(";").includes(user.email!)) {
            await prisma.user.update({
              where: { id: user.id },
              data: {
                role: "ADMIN",
                plan: "MAX"
              },
            });
          }

          await sendEmail({
            subject: "Welcome to FellowNotes",
            to: {
              email: user?.email,
              name: `${user?.name}`,
            },
            htmlContent: `
    <h2 style="margin: 0 0 16px; color: #222;">
      Welcome, ${user?.name}! 👋
    </h2>

    <p style="font-size: 15px; line-height: 1.6; color: #555;">
      Your FellowNotes account is ready!
    </p>

    <p style="font-size: 15px; line-height: 1.6; color: #555;">
      Start reading notes, practicing PYQs and quizzes,
      creating flashcards, and using AI tools to learn smarter.
    </p>

    <div style="text-align: center; margin: 25px 0;">
      <a
        href="https://fellownotes.app/"
        style="
          display: inline-block;
          background-color: #262626;
          color: #ffffff;
          padding: 12px 24px;
          text-decoration: none;
          border-radius: 6px;
          font-weight: bold;
        "
      >
        Start Learning →
      </a>
    </div>
  `,
          });
        },
      },
    },
  },
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 60 * 60 * 24 * 30,
      strategy: "jwt"
    }
  },

  plugins: [
    customSession(async ({ user, session }) => {
      const dbUser = await prisma.user.findUnique({
        where: { id: user.id },
        select: { role: true, plan: true },
      });

      return {
        user: {
          ...user,
          role: dbUser?.role ?? "USER",
          plan: dbUser?.plan ?? "FREE",
        },
        session,
      };
    })
  ]
});