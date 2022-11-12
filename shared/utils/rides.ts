import { Ride, UsersOnRides, User } from "@prisma/client";
import { Ride as RideType } from "../../src/types";
import { getRideDateAndTime } from "./dates";

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
  };
};

export const formatRideData = (ride: RideData, isAuth = false) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { date, createdAt, users, ...rest } = ride;
  const { day, time } = getRideDateAndTime(date.toISOString());

  return {
    ...rest,
    date: date.toISOString(),
    day,
    time,
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
