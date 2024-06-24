// src/pages/api/add-rider-to-ride.ts
import { getLastMonth, getNow } from "../../../../shared/utils";
import { prisma } from "../../../server/db/client";

export const archiveRides = async (date?: string) => {
  const runDate = date ? new Date(date).toISOString() : getNow();
  // Subtract one month; we will only archive rides older than a month
  const archiveDate = getLastMonth(runDate);

  try {
    const movedRiders = await prisma.$executeRaw`
      insert into "ArchivedUsersOnRides"
      ("rideId", "userId", "createdAt", notes)
      select "rideId", "userId", "createdAt", notes
      from "UsersOnRides"
      where "rideId" in (select id from "Ride" where "date" < TO_TIMESTAMP(${archiveDate}, 'YYYY-MM-DD'));`;

    const deletedRiders = await prisma.$executeRaw`
      delete from "UsersOnRides" where "rideId" IN
      (select id from "Ride" where "date" < TO_TIMESTAMP(${archiveDate}, 'YYYY-MM-DD'));`;

    const movedRides = await prisma.$executeRaw`
      insert into "ArchivedRide" (id, name, "group", "date", destination, distance, "meetPoint", route, leader, notes, speed, deleted, cancelled, "createdAt")
      select id, name, "group", "date", destination, distance, "meetPoint", route, leader, notes, speed, deleted, cancelled, "createdAt"
      from "Ride" where "date" < TO_TIMESTAMP(${archiveDate}, 'YYYY-MM-DD');`;

    const deletedRides = await prisma.$executeRaw`
      delete from "Ride" where "date" < TO_TIMESTAMP(${archiveDate}, 'YYYY-MM-DD');`;

    return { movedRiders, deletedRiders, movedRides, deletedRides };
  } catch (err) {
    return { error: err };
  }
};
