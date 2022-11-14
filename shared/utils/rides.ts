import { Ride, UsersOnRides, User } from "@prisma/client";
import { DEFAULT_PREFERENCES } from "../../src/constants";
import { Preferences, Ride as RideType } from "../../src/types";
import { getRideDateAndTime } from "./dates";
import { getPreferences } from "./preferences";

const ANONYMISED_NAME = "Log in to see rider's details";

type RideData = Ride & {
  users: (UsersOnRides & {
    user: User;
  })[];
};

export const formatUserName = (name: string | null | undefined): string => {
  if (!name) {
    return "";
  }

  return name
    .replace(".", " ")
    .replace(
      /\w\S*/g,
      (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    );
};

export const formatUser = (
  user: User,
  notes?: string | null,
  isAuth = false
) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id, name, email, image, mobile, emergency, role } = user;
  const preferences = getPreferences(user);

  if (!isAuth) {
    return { id, name: ANONYMISED_NAME, rideNotes: notes };
  }

  return {
    id,
    name: formatUserName(name),
    email,
    image,
    mobile,
    emergency,
    role,
    rideNotes: notes,
    preferences,
  };
};

export const convertToMiles = (kms: number): number => Math.floor(kms / 1.6142);
export const convertToKms = (miles: number): number =>
  Math.ceil(miles * 1.6142);

export const convertDistance = (
  distance: number | null,
  units: string | undefined
) => {
  if (!distance) {
    return null;
  }
  if (units !== DEFAULT_PREFERENCES.units) {
    return `${convertToMiles(distance || 0)} ${units}`;
  }
  return `${distance} ${units}`;
};

export const formatRideData = (
  ride: RideData,
  preferences: Preferences | undefined,
  isAuth = false
) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { date, createdAt, users, distance, speed, ...rest } = ride;
  const { day, time } = getRideDateAndTime(date.toISOString());
  const units = preferences?.units;

  return {
    ...rest,
    date: date.toISOString(),
    day,
    time,
    distance: convertDistance(distance, units),
    speed: convertDistance(speed, units),
    users: users.map(({ user: u, notes }) => ({
      ...formatUser(u, notes, isAuth),
    })),
  };
};

export const formatInitials = (words: string): string => {
  const parts = words.split(" ");
  return parts
    .map((word) => word[0])
    .join("")
    .toUpperCase();
};

export const formatRideBadge = (ride: RideType): string => {
  if (ride.name === "Paceline" || ride.name === "Sunday Ride") {
    return ride.group
      ? ride.group.substring(0, 3) + ride.group.replace(/\D/g, "")
      : ride.name.substring(0, 3);
  }

  const name = formatInitials(ride.name);
  const group = ride.group ? ` ${formatInitials(ride.group)}` : "";
  return `${name}${group}`;
};

// Rides are generated with TBA as route and leader
// Return true if these have not been changed
export const isReady = (ride: RideType): boolean => {
  const { leader, route } = ride;
  return leader !== "TBA" && route !== "TBA";
};
