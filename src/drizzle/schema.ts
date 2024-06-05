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
import { relations } from "drizzle-orm/relations";

// TODO: Rename tables to lower case, plural
// Rename bad columns (group, date)
// Add relations
// Split into table files
// Rework queries

export const Role = pgEnum("Role", ["USER", "LEADER", "ADMIN"]);

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

export const users = pgTable(
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

export const rides = pgTable(
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

export const usersToRides = pgTable(
  "UsersOnRides",
  {
    rideId: text("rideId")
      .notNull()
      .references(() => rides.id),
    userId: text("userId")
      .notNull()
      .references(() => users.id),
    notes: text("notes"),
    createdAt: timestamp("createdAt", { precision: 3, mode: "string" })
      .defaultNow()
      .notNull(),
  },
  (t) => ({
    pk: primaryKey({
      columns: [t.rideId, t.userId],
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
  (t) => ({
    rideId_idx: index("ArchivedUsersOnRides_rideId_idx").using(
      "btree",
      t.rideId
    ),
    userId_idx: index("ArchivedUsersOnRides_userId_idx").using(
      "btree",
      t.userId
    ),
    ArchivedUsersOnRides_pkey: primaryKey({
      columns: [t.rideId, t.userId],
      name: "ArchivedUsersOnRides_pkey",
    }),
  })
);

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  rides: many(rides),
}));

export const ridesRelations = relations(rides, ({ many }) => ({
  users: many(users),
}));

export const usersToRidesRelations = relations(usersToRides, ({ one }) => ({
  ride: one(rides, { fields: [usersToRides.rideId], references: [rides.id] }),
  user: one(users, { fields: [usersToRides.userId], references: [users.id] }),
}));
