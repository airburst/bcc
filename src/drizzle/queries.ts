import { getQueryDateRange } from "@utils/dates";
import { formatRideData } from "@utils/rides";
import { and, eq, gt, lt } from "drizzle-orm";
import { Preferences } from "src/types";
import { db } from "./db";
import { rides, users, usersToRides } from "./schema";

type QueryType = {
  start?: string;
  end?: string;
};

export const getRides = async (
  query: QueryType,
  preferences: Preferences | undefined,
  isAuth = false
) => {
  try {
    const { start, end } = getQueryDateRange(query);

    // const result = await db.query.rides.findMany({
    // where: and(
    //   lt(rides.date, end),
    //   gt(rides.date, start),
    //   eq(rides.deleted, false)
    // ),
    // // with: { users: false },
    // orderBy: [asc(rides.date), asc(rides.name), desc(rides.distance)],
    // });

    const result = await db
      .select()
      .from(rides)
      .leftJoin(usersToRides, eq(rides.id, usersToRides.rideId))
      .leftJoin(users, eq(users.id, usersToRides.userId))
      .where(
        and(
          lt(rides.date, end),
          gt(rides.date, start),
          eq(rides.deleted, false)
        )
      );
    // .orderBy([asc(rides.date), asc(rides.name), desc(rides.distance)]);

    console.log("🚀 ~ rideData:", result);

    return result.map((ride) => formatRideData(ride, preferences, isAuth));
  } catch (error) {
    return new Error("Unable to fetch rides");
  }
};

export const allUsers = db.select().from(users);
