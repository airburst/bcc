/* eslint-disable no-restricted-syntax */
import { formatDate } from "./dates";
import { User, Ride, Group, FilterQuery } from "../../src/types";

const isGoing = (userId: string, users: User[] = []) =>
  users.map((u: User) => u.id).includes(userId);

const filterOnlyJoined = (rides: Ride[], userId: string) =>
  rides.filter((ride) => isGoing(userId, ride.users));

const hasRider = (name: string, users: User[] = []) => {
  if (users.length === 0) {
    return false;
  }
  return users.map((u: User) => u.name).includes(name);
};

const filterSearchText = (rides: Ride[], searchText: string) =>
  rides.filter((ride) => {
    const { name, group, destination, leader, users } = ride;

    return (
      name?.indexOf(searchText) > -1 ||
      (group || "")?.indexOf(searchText) > -1 ||
      (destination || "")?.indexOf(searchText) > -1 ||
      (leader || "")?.indexOf(searchText) > -1 ||
      hasRider(searchText, users)
    );
  });

const filterRides = (
  data: Ride[],
  filterQuery: FilterQuery,
  user?: User
): Ride[] => {
  const { onlyJoined, q } = filterQuery;

  if (!q && !onlyJoined) {
    return data;
  }

  let filteredData: Ride[] = data;

  if (onlyJoined && user?.id) {
    filteredData = filterOnlyJoined(data, user.id);
  }
  if (q) {
    filteredData = filterSearchText(filteredData, q);
  }

  return filteredData;
};

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

export const groupRides = (
  data: Ride[],
  filterQuery?: FilterQuery,
  user?: User
): Group[] => {
  // Group rides by date
  const groupedByDate = new Map<string, Ride[]>();

  // Filter ride list
  const filteredRides = filterQuery
    ? filterRides(data, filterQuery, user)
    : data;

  for (const ride of filteredRides) {
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
