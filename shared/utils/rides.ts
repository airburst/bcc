import { Ride, UsersOnRides, User } from "@prisma/client";
import { nanoid } from "nanoid";
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

export const formatUser = (user: User, isAuth = false) => {
  const { id, name, email, image, mobile, role } = user;

  if (!isAuth) {
    return { id: nanoid(), name: ANONYMISED_NAME };
  }

  return {
    id,
    name: formatUserName(name),
    email,
    image,
    mobile,
    role,
  };
};

export const formatRideData = (ride: RideData, isAuth = false) => {
  const { date, users, ...rest } = ride;
  const { day, time } = getRideDateAndTime(date.toISOString());

  return {
    ...rest,
    date: date.toString(),
    day,
    time,
    users: users.map(({ user: u }) => ({
      ...formatUser(u, isAuth),
    })),
  };
};
