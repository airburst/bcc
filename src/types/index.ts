export type User = {
  id: string;
  name: string;
  email: string;
  mobile?: string | null;
  image?: string | null; // url
  role: string; // USER | ADMIN
};

export type DbResponse<T> = {
  data?: T[];
  error?: string;
  loading?: boolean;
};

export type Ride = {
  id?: string;
  name: string; // Enum sunday | paceline | event
  group: string;
  date: string;
  day: string;
  time: string;
  destination?: string | null;
  distance?: number | null;
  route?: string | null;
  leader?: string | null;
  speed?: number | null;
  users?: User[];
};

export type Riders = {
  name: string;
  mobile?: string;
};

export type Group = {
  [date: string]: {
    [name: string]: Ride[];
  };
};
