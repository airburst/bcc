// src/pages/api/add-rider-to-ride.ts
import { getLastMonth, getNow, sqlDate } from "../../../../shared/utils";
import { prisma } from "../../../server/db/client";

export const archiveRides = async (date?: string) => {
  const runDate = date ? new Date(date).toISOString() : getNow();
  // Subtract one month; we will only archive rides older than a month
  const archiveDate = getLastMonth(runDate);
  const archiveBefore = sqlDate(archiveDate);

  try {
    const movedRiders = await prisma.$executeRaw`
      insert into ArchivedUsersOnRides
      (rideId, userId, createdAt, notes)
      select rideId, userId, createdAt, notes
      from UsersOnRides
      where rideId in (select id from Ride where date < ${archiveBefore})`;

    const deletedRiders = await prisma.$executeRaw`
      delete from UsersOnRides where rideId IN
      (select id from Ride where date < ${archiveBefore})`;

    const movedRides = await prisma.$executeRaw`
      insert into ArchivedRide (id, name, \`group\`, date, destination, distance, meetPoint, route, leader, notes, speed, deleted, cancelled, createdAt)
      select id, name, \`group\`, date, destination, distance, meetPoint, route, leader, notes, speed, deleted, cancelled, createdAt
      from Ride where date < ${archiveBefore}`;

    const deletedRides = await prisma.$executeRaw`
      delete from Ride where date < ${archiveBefore}`;

    return { movedRiders, deletedRiders, movedRides, deletedRides };
  } catch (err) {
    return { error: err };
  }
};
