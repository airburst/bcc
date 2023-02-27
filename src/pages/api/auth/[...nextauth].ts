/* eslint-disable no-param-reassign */
import NextAuth, { Awaitable, Session, NextAuthOptions, User } from "next-auth";
import Auth0Provider from "next-auth/providers/auth0";
// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "../../../server/db/client";
import { env } from "../../../env/server.mjs";
import { Preferences } from "../../../types";

type SessionUser = User & {
  role?: string;
  preferences?: Preferences;
};

export const authOptions: NextAuthOptions = {
  // Include user.id on session
  callbacks: {
    session({ session, user }): Awaitable<Session> {
      if (session.user) {
        (session.user as SessionUser) = user;
      }
      return session;
    },
  },
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  providers: [
    Auth0Provider({
      clientId: env.AUTH0_CLIENT_ID,
      clientSecret: env.AUTH0_CLIENT_SECRET,
      issuer: env.AUTH0_ISSUER,
    }),
  ],
  // Custom pages
  pages: {
    newUser: "/profile",
  },
};

export default NextAuth(authOptions);
