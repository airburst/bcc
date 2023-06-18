// @ts-check
import { z } from "zod";

/**
 * Specify your server-side environment variables schema here.
 * This way you can ensure the app isn't built with invalid env vars.
 */
export const serverSchema = z.object({
  HOST_URL: z.string().url(),
  DATABASE_URL: z.string().url(),
  DATABASE_HOST: z.string(),
  DATABASE_USERNAME: z.string(),
  DATABASE_PASSWORD: z.string(),
  NODE_ENV: z.enum(["development", "test", "production"]),
  NEXTAUTH_SECRET: z.string(),
  NEXTAUTH_URL: z.string().url(),
  AUTH0_CLIENT_ID: z.string(),
  AUTH0_CLIENT_SECRET: z.string(),
  AUTH0_ISSUER: z.string(),
  RIDERHQ_URL: z.string(),
  RIDERHQ_ACCOUNT_ID: z.string(),
  RIDERHQ_PRIVATE_KEY: z.string(),
});

/**
 * Specify your client-side environment variables schema here.
 * This way you can ensure the app isn't built with invalid env vars.
 * To expose them to the client, prefix them with `NEXT_PUBLIC_`.
 */
export const clientSchema = z.object({
  NEXT_PUBLIC_CLUB_LONG_NAME: z.string(),
  NEXT_PUBLIC_CLUB_SHORT_NAME: z.string(),
  NEXT_PUBLIC_REPO: z.string().url(),
});

/**
 * You can't destruct `process.env` as a regular object, so you have to do
 * it manually here. This is because Next.js evaluates this at build time,
 * and only used environment variables are included in the build.
 * @type {{ [k in keyof z.infer<typeof clientSchema>]: z.infer<typeof clientSchema>[k] | undefined }}
 */
export const clientEnv = {
  NEXT_PUBLIC_CLUB_LONG_NAME: process.env.NEXT_PUBLIC_CLUB_LONG_NAME,
  NEXT_PUBLIC_CLUB_SHORT_NAME: process.env.NEXT_PUBLIC_CLUB_SHORT_NAME,
  NEXT_PUBLIC_REPO: process.env.NEXT_PUBLIC_REPO,
};
