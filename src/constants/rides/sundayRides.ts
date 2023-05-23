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
const notes =
  "What to expect on this ride: https://www.bathcc.net/ride/sunday-club-run";

export const SUNDAY_RIDES: PartialRide[] = [
  {
    group: "Fast",
    distance: 120,
  },
  {
    group: "Double Espresso",
    distance: 110,
  },
  {
    group: "Espresso",
    distance: 96,
    leader: "David Oliver",
  },
  {
    group: "Americano",
    distance: 90,
  },
  // {
  //   name: "Long Americano",
  //   distance: 100,
  // },
  {
    group: "Double Shot Latte",
    distance: 82,
  },
  {
    group: "Social",
    distance: 65,
  },
].map((ride) => ({
  name,
  meetPoint,
  leader: "TBA",
  notes,
  ...ride,
}));

export const SUNDAY = {
  day: DAYS.SUNDAY,
  rides: SUNDAY_RIDES,
  startTime: SUNDAY_START_TIME,
};
