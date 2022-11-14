/* eslint-disable no-restricted-syntax */
import { formatDate } from "./dates";
import { Ride, Group, Preferences } from "../../src/types";
import { DEFAULT_PREFERENCES } from "../../src/constants";

const groupByType = (data: Ride[]) => {
  // Group rides by date, then type
  const groupedByName = new Map<string, Ride[]>();

  for (const ride of data) {
    const d = ride.name;
    const rideList = groupedByName.get(d) || [];
    rideList.push(ride);
    groupedByName.set(d, rideList);
  }

  return Object.fromEntries(groupedByName);
};

export const groupRides = (data: Ride[]): Group[] => {
  // Group rides by date
  const groupedByDate = new Map<string, Ride[]>();

  for (const ride of data) {
    const d = formatDate(ride.date);
    const rideList = groupedByDate.get(d) || [];

    rideList.push(ride);
    groupedByDate.set(d, rideList);
  }
  // Second pass: group by type
  const grouped: Group[] = [];

  groupedByDate.forEach((value, key) => {
    grouped.push({ [key]: groupByType(value) });
  });
  return grouped;
};

export const ungroupRides = (
  group: Group,
  preferences: Preferences | undefined
) => {
  const units = preferences?.units || DEFAULT_PREFERENCES.units;
  console.log("🚀 ~ file: transformRideData.ts ~ line 45 ~ units", units);

  return Object.entries(group).flatMap(([date, types]) =>
    Object.entries(types).map(([type, rides]) => ({ date, type, rides }))
  );
};

export const mapRidesToDate = (rides: Ride[], date: string): Ride[] =>
  rides.filter((r) => r?.date?.startsWith(date));
