export type Preferences = {
  units: "km" | "miles";
};

export type User = {
  id: string;
  name: string;
  email: string;
  mobile?: string | null;
  emergency?: string | null;
  image?: string | null; // url
  role: string;
  preferences?: Preferences;
  rideNotes?: string;
};

export type DbResponse<T> = {
  data?: T[];
  error?: string;
  loading?: boolean;
};

export type Ride = {
  id?: string;
  name: string; // Enum sunday | paceline | event
  date: string;
  day: string;
  time: string;
  destination?: string | null;
  group?: string | null;
  distance?: number | null;
  meetPoint?: string | null;
  route?: string | null;
  leader?: string | null;
  speed?: number | null;
  notes?: string | null;
  cancelled?: boolean;
  limit?: number;
  users?: User[];
};

export type PartialRide = Omit<Ride, "day" | "date" | "time"> & {
  time?: string;
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

export type StartTime = {
  hour: number;
  minute: number;
};

export type SeasonStartTime = {
  winter: StartTime;
  summer: StartTime;
};

export type FilterQuery = {
  onlyJoined?: boolean;
  q?: string;
  weeksAhead?: string;
};
