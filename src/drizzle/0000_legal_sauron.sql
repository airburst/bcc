-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
DO $$ BEGIN
 CREATE TYPE "auth"."aal_level" AS ENUM('aal1', 'aal2', 'aal3');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "auth"."code_challenge_method" AS ENUM('s256', 'plain');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "auth"."factor_status" AS ENUM('unverified', 'verified');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "auth"."factor_type" AS ENUM('totp', 'webauthn');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "auth"."one_time_token_type" AS ENUM('confirmation_token', 'reauthentication_token', 'recovery_token', 'email_change_token_new', 'email_change_token_current', 'phone_change_token');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "pgsodium"."key_status" AS ENUM('default', 'valid', 'invalid', 'expired');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "pgsodium"."key_type" AS ENUM('aead-ietf', 'aead-det', 'hmacsha512', 'hmacsha256', 'auth', 'shorthash', 'generichash', 'kdf', 'secretbox', 'secretstream', 'stream_xchacha20');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."Role" AS ENUM('USER', 'LEADER', 'ADMIN');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "realtime"."action" AS ENUM('INSERT', 'UPDATE', 'DELETE', 'TRUNCATE', 'ERROR');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "realtime"."equality_op" AS ENUM('eq', 'neq', 'lt', 'lte', 'gt', 'gte', 'in');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Account" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"type" text NOT NULL,
	"provider" text NOT NULL,
	"providerAccountId" text NOT NULL,
	"refresh_token" text,
	"access_token" text,
	"expires_at" integer,
	"token_type" text,
	"scope" text,
	"id_token" text,
	"session_state" text,
	"createdAt" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Session" (
	"id" text PRIMARY KEY NOT NULL,
	"sessionToken" text NOT NULL,
	"userId" text NOT NULL,
	"expires" timestamp(3) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "VerificationToken" (
	"identifier" text NOT NULL,
	"token" text NOT NULL,
	"expires" timestamp(3) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "User" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text,
	"email" text,
	"emailVerified" timestamp(3),
	"image" text,
	"mobile" text,
	"emergency" text,
	"role" "Role" DEFAULT 'USER' NOT NULL,
	"preferences" jsonb,
	"createdAt" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Ride" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"group" text,
	"date" timestamp(3) NOT NULL,
	"destination" text,
	"distance" integer,
	"meetPoint" text,
	"route" text,
	"leader" text,
	"notes" text,
	"speed" integer,
	"limit" integer DEFAULT -1 NOT NULL,
	"deleted" boolean DEFAULT false NOT NULL,
	"cancelled" boolean DEFAULT false NOT NULL,
	"scheduleId" text,
	"createdAt" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "RepeatingRide" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"schedule" text NOT NULL,
	"winterStartTime" text,
	"group" text,
	"destination" text,
	"distance" integer,
	"meetPoint" text,
	"route" text,
	"leader" text,
	"notes" text,
	"speed" integer,
	"limit" integer DEFAULT -1 NOT NULL,
	"createdAt" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Membership" (
	"memberId" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"handle" text NOT NULL,
	"isUser" boolean NOT NULL,
	"firstnames" text NOT NULL,
	"lastname" text NOT NULL,
	"email" text NOT NULL,
	"expires" text,
	"isVerified" boolean,
	"isGuest" boolean
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ArchivedRide" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"group" text,
	"date" timestamp(3) NOT NULL,
	"destination" text,
	"distance" integer,
	"meetPoint" text,
	"route" text,
	"leader" text,
	"notes" text,
	"speed" integer,
	"limit" integer DEFAULT -1 NOT NULL,
	"deleted" boolean DEFAULT false NOT NULL,
	"cancelled" boolean DEFAULT false NOT NULL,
	"createdAt" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "UsersOnRides" (
	"rideId" text NOT NULL,
	"userId" text NOT NULL,
	"notes" text,
	"createdAt" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	CONSTRAINT "UsersOnRides_pkey" PRIMARY KEY("rideId","userId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ArchivedUsersOnRides" (
	"rideId" text NOT NULL,
	"userId" text NOT NULL,
	"notes" text,
	"createdAt" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	CONSTRAINT "ArchivedUsersOnRides_pkey" PRIMARY KEY("rideId","userId")
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "Account_provider_providerAccountId_key" ON "Account" USING btree (provider text_ops,providerAccountId text_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "Account_userId_idx" ON "Account" USING btree (userId text_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "Session_id_idx" ON "Session" USING btree (id text_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "Session_sessionToken_idx" ON "Session" USING btree (sessionToken text_ops);--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "Session_sessionToken_key" ON "Session" USING btree (sessionToken text_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "Session_userId_idx" ON "Session" USING btree (userId text_ops);--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "VerificationToken_identifier_token_key" ON "VerificationToken" USING btree (identifier text_ops,token text_ops);--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "VerificationToken_token_key" ON "VerificationToken" USING btree (token text_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "User_email_idx" ON "User" USING btree (email text_ops);--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "User_email_key" ON "User" USING btree (email text_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "User_id_idx" ON "User" USING btree (id text_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "Ride_date_deleted_idx" ON "Ride" USING btree (date timestamp_ops,deleted timestamp_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "RepeatingRide_id_idx" ON "RepeatingRide" USING btree (id text_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "Membership_email_idx" ON "Membership" USING btree (email text_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "ArchivedRide_date_deleted_idx" ON "ArchivedRide" USING btree (date timestamp_ops,deleted timestamp_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "UsersOnRides_rideId_idx" ON "UsersOnRides" USING btree (rideId text_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "UsersOnRides_userId_idx" ON "UsersOnRides" USING btree (userId text_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "ArchivedUsersOnRides_rideId_idx" ON "ArchivedUsersOnRides" USING btree (rideId text_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "ArchivedUsersOnRides_userId_idx" ON "ArchivedUsersOnRides" USING btree (userId text_ops);
*/