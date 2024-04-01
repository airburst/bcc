import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  /**
   * Specify your server-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars.
   */
  server: {
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),
    HOST_URL: z.string().url(),
    DATABASE_URL: z.string(),
    DIRECT_URL: z.string(),
    NEXTAUTH_SECRET: z.string(),
    NEXTAUTH_URL: z.string().url(),
    AUTH0_CLIENT_ID: z.string(),
    AUTH0_CLIENT_SECRET: z.string(),
    AUTH0_ISSUER: z.string(),
    RIDERHQ_URL: z.string(),
    RIDERHQ_ACCOUNT_ID: z.string(),
    RIDERHQ_PRIVATE_KEY: z.string(),
  },

  /**
   * Specify your client-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars. To expose them to the client, prefix them with
   * `NEXT_PUBLIC_`.
   */
  client: {
    NEXT_PUBLIC_CLUB_LONG_NAME: z.string(),
    NEXT_PUBLIC_CLUB_SHORT_NAME: z.string(),
    NEXT_PUBLIC_REPO: z.string().url(),
  },

  /**
   * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
   * middlewares) or client-side so we need to destruct manually.
   */
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    DATABASE_URL: process.env.DATABASE_URL,
    DIRECT_URL: process.env.DIRECT_URL,
    HOST_URL: process.env.HOST_URL,
    RIDERHQ_URL: process.env.RIDERHQ_URL,
    RIDERHQ_ACCOUNT_ID: process.env.RIDERHQ_ACCOUNT_ID,
    RIDERHQ_PRIVATE_KEY: process.env.RIDERHQ_PRIVATE_KEY,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
    AUTH0_CLIENT_SECRET: process.env.AUTH0_CLIENT_SECRET,
    AUTH0_ISSUER: process.env.AUTH0_ISSUER,
    // Client
    NEXT_PUBLIC_CLUB_LONG_NAME: process.env.NEXT_PUBLIC_CLUB_LONG_NAME,
    NEXT_PUBLIC_CLUB_SHORT_NAME: process.env.NEXT_PUBLIC_CLUB_SHORT_NAME,
    NEXT_PUBLIC_REPO: process.env.NEXT_PUBLIC_REPO,
  },
  /**
   * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially
   * useful for Docker builds.
   */
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  /**
   * Makes it so that empty strings are treated as undefined.
   * `SOME_VAR: z.string()` and `SOME_VAR=''` will throw an error.
   */
  emptyStringAsUndefined: true,
});
