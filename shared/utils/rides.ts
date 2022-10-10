import { Ride, UsersOnRides, User } from "@prisma/client";
import { getRideDateAndTime } from "./dates";

type RideData = Ride & {
  users: (UsersOnRides & {
    user: User;
  })[];
};

export const formatUserName = (name: string | null): string => {
  if (!name) {
    return "";
  }

  return name.replace(".", " ").replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};

export const formatUser = (user: User) => {
  const { id, name, email, image, mobile, role } = user;
  return {
    id,
    name: formatUserName(name),
    email,
    image,
    mobile,
    role
  };
};

export const formatRideData = (ride: RideData) => {
  const { date, users, ...rest } = ride;
  const { day, time } = getRideDateAndTime(date.toISOString());

  return {
    ...rest,
    date: date.toString(),
    day,
    time,
    users: users.map(({ user: u }) => ({
      ...formatUser(u)
    }))
  };
};
