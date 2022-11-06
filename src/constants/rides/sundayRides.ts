import { PartialRide, SeasonStartTime } from "../../types";
import { DAYS } from "../days";

export const SUNDAY_START_TIME: SeasonStartTime = {
  summer: {
    hour: 8,
    minute: 30,
  },
  winter: {
    hour: 9,
    minute: 0,
  },
};

const name = "Sunday Ride";
const meetPoint = "Brunel Square";

export const SUNDAY_RIDES: PartialRide[] = [
  {
    group: "Double Espresso",
    distance: 110,
    notes: "Approx. pace is 29 - 31km/h",
  },
  {
    group: "Espresso",
    distance: 96,
    notes: "Approx. pace is 24km/h",
  },
  {
    group: "Americano",
    distance: 90,
    notes: "Approx. pace is 22km/h",
  },
  {
    group: "Double Shot Latte",
    distance: 82,
    notes: "Approx. pace is 21km/h",
  },
  {
    group: "Cappuccino",
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
  leader: "TBA",
  ...ride,
}));

export const SUNDAY = {
  day: DAYS.SUNDAY,
  rides: SUNDAY_RIDES,
  startTime: SUNDAY_START_TIME,
};
