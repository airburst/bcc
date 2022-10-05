import { formatDate } from '.';
import { Ride, Group } from '../../src/types';

const groupByType = (data: Ride[]) => {
  // Group rides by date, then type
  const groupedByName = new Map<string, Ride[]>();

  for (const ride of data) {
    const d = ride.name;
    const rideList = groupedByName.get(d) || [];
    rideList.push(ride);
    groupedByName.set(d, rideList);
  }
  // console.log('🚀 ~ file: transformRideData.ts ~ line 7 ~ groupByType ~ groupedByName', groupedByName);

  return groupedByName;
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

  console.log('🚀 ~ file: transformRideData.ts ~ line 32 ~ groupRides ~ groupedByDate', groupedByDate);

  // Second pass: group by type
  const grouped = groupedByDate.forEach((value, key) => {
    return { [key]: groupByType(value) };
  });
  console.log('grouped', grouped);

  return grouped;
};

export const ungroupRides = (group: Group) =>
  Object.entries(group).flatMap(([date, types]) =>
    Object.entries(types).map(([type, rides]) => ({ date, type, rides }))
  );
