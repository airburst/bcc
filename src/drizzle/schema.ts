/* eslint-disable camelcase */
import {
  boolean,
  index,
  integer,
  jsonb,
  pgEnum,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";

export const aal_level = pgEnum("aal_level", ["aal1", "aal2", "aal3"]);
export const code_challenge_method = pgEnum("code_challenge_method", [
  "s256",
  "plain",
]);
export const factor_status = pgEnum("factor_status", [
  "unverified",
  "verified",
]);
export const factor_type = pgEnum("factor_type", ["totp", "webauthn"]);
export const one_time_token_type = pgEnum("one_time_token_type", [
  "confirmation_token",
  "reauthentication_token",
  "recovery_token",
  "email_change_token_new",
  "email_change_token_current",
  "phone_change_token",
]);
export const key_status = pgEnum("key_status", [
  "default",
  "valid",
  "invalid",
  "expired",
]);
export const key_type = pgEnum("key_type", [
  "aead-ietf",
  "aead-det",
  "hmacsha512",
  "hmacsha256",
  "auth",
  "shorthash",
  "generichash",
  "kdf",
  "secretbox",
  "secretstream",
  "stream_xchacha20",
]);
export const Role = pgEnum("Role", ["USER", "LEADER", "ADMIN"]);
export const action = pgEnum("action", [
  "INSERT",
  "UPDATE",
  "DELETE",
  "TRUNCATE",
  "ERROR",
]);
export const equality_op = pgEnum("equality_op", [
  "eq",
  "neq",
  "lt",
  "lte",
  "gt",
  "gte",
  "in",
]);

export const Account = pgTable(
  "Account",
  {
    id: text("id").primaryKey().notNull(),
    userId: text("userId").notNull(),
    type: text("type").notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
    createdAt: timestamp("createdAt", { precision: 3, mode: "string" })
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    provider_providerAccountId_key: uniqueIndex(
      "Account_provider_providerAccountId_key"
    ).using("btree", table.provider, table.providerAccountId),
    userId_idx: index("Account_userId_idx").using("btree", table.userId),
  })
);

export const Session = pgTable(
  "Session",
  {
    id: text("id").primaryKey().notNull(),
    sessionToken: text("sessionToken").notNull(),
    userId: text("userId").notNull(),
    expires: timestamp("expires", { precision: 3, mode: "string" }).notNull(),
  },
  (table) => ({
    id_idx: index("Session_id_idx").using("btree", table.id),
    sessionToken_idx: index("Session_sessionToken_idx").using(
      "btree",
      table.sessionToken
    ),
    sessionToken_key: uniqueIndex("Session_sessionToken_key").using(
      "btree",
      table.sessionToken
    ),
    userId_idx: index("Session_userId_idx").using("btree", table.userId),
  })
);

export const VerificationToken = pgTable(
  "VerificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { precision: 3, mode: "string" }).notNull(),
  },
  (table) => ({
    identifier_token_key: uniqueIndex(
      "VerificationToken_identifier_token_key"
    ).using("btree", table.identifier, table.token),
    token_key: uniqueIndex("VerificationToken_token_key").using(
      "btree",
      table.token
    ),
  })
);

export const User = pgTable(
  "User",
  {
    id: text("id").primaryKey().notNull(),
    name: text("name"),
    email: text("email"),
    emailVerified: timestamp("emailVerified", { precision: 3, mode: "string" }),
    image: text("image"),
    mobile: text("mobile"),
    emergency: text("emergency"),
    role: Role("role").default("USER").notNull(),
    preferences: jsonb("preferences"),
    createdAt: timestamp("createdAt", { precision: 3, mode: "string" })
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    email_idx: index("User_email_idx").using("btree", table.email),
    email_key: uniqueIndex("User_email_key").using("btree", table.email),
    id_idx: index("User_id_idx").using("btree", table.id),
  })
);

export const Ride = pgTable(
  "Ride",
  {
    id: text("id").primaryKey().notNull(),
    name: text("name").notNull(),
    group: text("group"),
    date: timestamp("date", { precision: 3, mode: "string" }).notNull(),
    destination: text("destination"),
    distance: integer("distance"),
    meetPoint: text("meetPoint"),
    route: text("route"),
    leader: text("leader"),
    notes: text("notes"),
    speed: integer("speed"),
    limit: integer("limit").default(-1).notNull(),
    deleted: boolean("deleted").default(false).notNull(),
    cancelled: boolean("cancelled").default(false).notNull(),
    scheduleId: text("scheduleId"),
    createdAt: timestamp("createdAt", { precision: 3, mode: "string" })
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    date_deleted_idx: index("Ride_date_deleted_idx").using(
      "btree",
      table.date,
      table.deleted
    ),
  })
);

export const RepeatingRide = pgTable(
  "RepeatingRide",
  {
    id: text("id").primaryKey().notNull(),
    name: text("name").notNull(),
    schedule: text("schedule").notNull(),
    winterStartTime: text("winterStartTime"),
    group: text("group"),
    destination: text("destination"),
    distance: integer("distance"),
    meetPoint: text("meetPoint"),
    route: text("route"),
    leader: text("leader"),
    notes: text("notes"),
    speed: integer("speed"),
    limit: integer("limit").default(-1).notNull(),
    createdAt: timestamp("createdAt", { precision: 3, mode: "string" })
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    id_idx: index("RepeatingRide_id_idx").using("btree", table.id),
  })
);

export const Membership = pgTable(
  "Membership",
  {
    memberId: text("memberId").primaryKey().notNull(),
    userId: text("userId").notNull(),
    handle: text("handle").notNull(),
    isUser: boolean("isUser").notNull(),
    firstnames: text("firstnames").notNull(),
    lastname: text("lastname").notNull(),
    email: text("email").notNull(),
    expires: text("expires"),
    isVerified: boolean("isVerified"),
    isGuest: boolean("isGuest"),
  },
  (table) => ({
    email_idx: index("Membership_email_idx").using("btree", table.email),
  })
);

export const ArchivedRide = pgTable(
  "ArchivedRide",
  {
    id: text("id").primaryKey().notNull(),
    name: text("name").notNull(),
    group: text("group"),
    date: timestamp("date", { precision: 3, mode: "string" }).notNull(),
    destination: text("destination"),
    distance: integer("distance"),
    meetPoint: text("meetPoint"),
    route: text("route"),
    leader: text("leader"),
    notes: text("notes"),
    speed: integer("speed"),
    limit: integer("limit").default(-1).notNull(),
    deleted: boolean("deleted").default(false).notNull(),
    cancelled: boolean("cancelled").default(false).notNull(),
    createdAt: timestamp("createdAt", { precision: 3, mode: "string" })
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    date_deleted_idx: index("ArchivedRide_date_deleted_idx").using(
      "btree",
      table.date,
      table.deleted
    ),
  })
);

export const UsersOnRides = pgTable(
  "UsersOnRides",
  {
    rideId: text("rideId").notNull(),
    userId: text("userId").notNull(),
    notes: text("notes"),
    createdAt: timestamp("createdAt", { precision: 3, mode: "string" })
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    rideId_idx: index("UsersOnRides_rideId_idx").using("btree", table.rideId),
    userId_idx: index("UsersOnRides_userId_idx").using("btree", table.userId),
    UsersOnRides_pkey: primaryKey({
      columns: [table.rideId, table.userId],
      name: "UsersOnRides_pkey",
    }),
  })
);

export const ArchivedUsersOnRides = pgTable(
  "ArchivedUsersOnRides",
  {
    rideId: text("rideId").notNull(),
    userId: text("userId").notNull(),
    notes: text("notes"),
    createdAt: timestamp("createdAt", { precision: 3, mode: "string" })
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    rideId_idx: index("ArchivedUsersOnRides_rideId_idx").using(
      "btree",
      table.rideId
    ),
    userId_idx: index("ArchivedUsersOnRides_userId_idx").using(
      "btree",
      table.userId
    ),
    ArchivedUsersOnRides_pkey: primaryKey({
      columns: [table.rideId, table.userId],
      name: "ArchivedUsersOnRides_pkey",
    }),
  })
);
