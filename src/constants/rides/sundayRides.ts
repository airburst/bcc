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
    notes: `Our Average Speed is 24km/hr to 27km/hr depending on route, weather and how we all feel.

It is very important that we don't drop anyone and get back to Bath togther

The distance we ride depends on the time of year (shorter in the winter) and the route (less climbing more kms).  Weather permitting I will try to organise the routes to different compass points each week.  The routes will use the lanes in the summer but fewer in the winter, when they can get muddy`,
    leader: "David Oliver",
  },
  {
    group: "Americano",
    distance: 90,
    notes: "Approx. pace is 22km/h",
  },
  {
    group: "Double Shot Latte",
    distance: 82,
    notes: "Approx. pace is 22/24 km/h depending on route",
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
