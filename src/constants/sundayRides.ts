import { Ride } from "../types";

type SundayStub = Omit<Ride, "day" | "date" | "time">;

const name = "Sunday Ride";
const meetPoint = "Brunel Square";

// Saturday socials
export const SUNDAY_RIDES: SundayStub[] = [
  {
    group: "DE",
    distance: 110,
    notes: "Approx. pace is 29 - 31km/h",
  },
  {
    group: "E",
    distance: 96,
    notes: "Approx. pace is 24km/h",
  },
  {
    group: "A",
    distance: 90,
    notes: "Approx. pace is 22km/h",
  },
  {
    group: "DSL",
    distance: 82,
    notes: "Approx. pace is 21km/h",
  },
  {
    group: "C",
    distance: 67,
    notes: "Approx. pace is 20km/h",
  },
  {
    name: "Mystery Ride",
    distance: 100,
  },
].map((ride) => ({
  name,
  meetPoint,
  route: "TBA",
  leader: "TBA",
  ...ride,
}));
