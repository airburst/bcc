/* eslint-disable no-restricted-syntax */
import { formatDate } from "./dates";
import { RideV2, Group, FilterQuery } from "../../src/types";

const filterOnlyJoined = (rides: RideV2[]) =>
  rides.filter(({ includesMe }) => includesMe);

// NOTE: If you change the filters here, also change the Set
// that holds them in rides.makeFilterData
const filterSearchText = (rides: RideV2[], searchText: string) =>
  rides.filter((ride) => {
    const { name, group, destination } = ride;

    return (
      name?.indexOf(searchText) > -1 ||
      (group || "")?.indexOf(searchText) > -1 ||
      (destination || "")?.indexOf(searchText) > -1
    );
  });

const filterRides = (data: RideV2[], filterQuery: FilterQuery): RideV2[] => {
  const { onlyJoined, q } = filterQuery;

  if (!q && !onlyJoined) {
    return data;
  }

  let filteredData: RideV2[] = data;

  if (onlyJoined) {
    filteredData = filterOnlyJoined(data);
  }
  if (q) {
    filteredData = filterSearchText(filteredData, q);
  }

  return filteredData;
};

const groupByType = (data: RideV2[]) => {
  // Group rides by date, then type
  const groupedByName = new Map<string, RideV2[]>();

  for (const ride of data) {
    const d = ride.name;
    const rideList = groupedByName.get(d) || [];
    rideList.push(ride);
    groupedByName.set(d, rideList);
  }

  return Object.fromEntries(groupedByName);
};

export const groupRides = (
  data: RideV2[],
  filterQuery?: FilterQuery
): Group[] => {
  // Group rides by date
  const groupedByDate = new Map<string, RideV2[]>();

  // Filter ride list
  const filteredRides = filterQuery ? filterRides(data, filterQuery) : data;

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

export const mapRidesToDate = (rides: RideV2[], date: string): RideV2[] =>
  rides.filter((r) => r?.date?.startsWith(date));
