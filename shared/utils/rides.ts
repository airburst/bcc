import { Ride, UsersOnRides, User } from "@prisma/client";

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

  return {
    ...rest,
    date: date.toString(),
    users: users.map(({ user: u }) => ({
      ...formatUser(u)
    }))
  };
};
