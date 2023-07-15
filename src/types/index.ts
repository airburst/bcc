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
  name: string;
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

export type RepeatingRide = {
  id?: string;
  name: string;
  freq: number;
  interval?: number;
  byweekday?: number | number[];
  byweekno?: number | number[];
  bymonth?: number | number[];
  bymonthday?: number | number[];
  // byyearday, number | number[]
  startDate: string;
  winterStartTime?: string | null;
  endDate?: string | null;
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
};

export type RepeatingRideDb = Omit<
  RepeatingRide,
  "freq" | "interval" | "startDate" | "endDate" | "byweekday"
> & {
  schedule: string;
};

export type PartialRide = Omit<Ride, "day" | "date" | "time"> & {
  time?: string;
};

export type TemplateRide = PartialRide & {
  date: string;
  scheduleId?: string;
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

//  Forms
export type RideFormValues = {
  id?: string;
  name: string;
  date: string;
  time: string;
  group?: string;
  destination?: string;
  meetPoint?: string;
  notes?: string;
  distance: number;
  leader: string;
  route: string;
  limit?: number;
  // Repeating ride
  interval?: number;
  freq: number;
  startDate: string;
  until?: string;
  winterStartTime?: string;
  byweekday?: number;
  byweekno?: number;
  bymonth?: number;
  bymonthday?: number;
};
