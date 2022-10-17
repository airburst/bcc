/* eslint-disable no-restricted-syntax */
import { formatDate } from "./dates";
import { Ride, Group } from "../../src/types";

const groupByType = (data: Ride[]) => {
  // Group rides by date, then type
  const groupedByName = new Map<string, Ride[]>();

  for (const ride of data) {
    const d = ride.name;
    const rideList = groupedByName.get(d) || [];
    rideList.push(ride);
    groupedByName.set(d, rideList);
  }

  // If user has joined a ride on a day, only return that ride
  // if (userId) {
  //   groupedByName.forEach((value, key) => {
  //     const rideWithUser = value.filter(({ users }) =>
  //       users?.map(({ id }) => id).includes(userId)
  //     );

  //     if (rideWithUser.length > 0) {
  //       groupedByName.set(key, rideWithUser);
  //     }
  //   });
  // }

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

export const ungroupRides = (group: Group) =>
  Object.entries(group).flatMap(([date, types]) =>
    Object.entries(types).map(([type, rides]) => ({ date, type, rides }))
  );

export const mapRidesToDate = (rides: Ride[], date: string): Ride[] =>
  rides.filter((r) => r?.date?.startsWith(date));
