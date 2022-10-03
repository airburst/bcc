import { formatDate } from '../utils';
import { Ride, Group } from '../types';

const groupByType = (data: Ride[]) => {
  // Group rides by date, then type
  const groupedByTitle: { [index: string]: any } = {};

  for (const ride of data) {
    groupedByTitle[ride.title] = groupedByTitle[ride.title] || [];
    groupedByTitle[ride.title].push(ride);
  }

  return groupedByTitle;
};

export const groupRides = (data: Ride[]): Group[] => {
  // Group rides by date
  const groupedByDate: { [key: string]: Ride[] } = {};

  for (const ride of data) {
    const d = formatDate(ride.date);
    groupedByDate[d] = groupedByDate[d] || [];
    groupedByDate[d].push(ride);
  }

  // Second pass: group by type
  const firstGroup = Object.entries(groupedByDate);

  return firstGroup.map(([date, rides]) => ({
    [date]: groupByType(rides),
  }));
};

export const ungroupRides = (group: Group) =>
  Object.entries(group).flatMap(([date, types]) =>
    Object.entries(types).map(([type, rides]) => ({ date, type, rides })),
  );
