export type User = {
  id: string;
  name: string;
  mobile?: string;
};

export type DbResponse<T> = {
  data?: T[];
  error?: string;
  loading?: boolean;
};

export type Ride = {
  id?: string;
  title: string; // Enum sunday | paceline | event
  rideGroup: string;
  date: string;
  destination?: string;
  distance?: number;
  route?: string;
  leader?: string;
  speed?: string;
  riderCount?: number;
  going?: string;
};

export type Riders = {
  name: string;
  mobile?: string;
};

export type Group = {
  [date: string]: {
    [title: string]: Ride[];
  };
};
