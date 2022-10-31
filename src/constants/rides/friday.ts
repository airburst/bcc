import { PartialRide, SeasonStartTime } from "../../types";
import { DAYS } from "../days";

export const FRIDAY_START_TIME: SeasonStartTime = {
  summer: {
    hour: 9,
    minute: 0,
  },
  winter: {
    hour: 9,
    minute: 0,
  },
};

const name = "Ladies Friday";
const meetPoint = "TBA";

const RIDES: PartialRide[] = [
  {
    group: "Fast",
    distance: 60, // or 40
  },
  {
    group: "Medium",
    distance: 60, // or 40
  },
  {
    group: "Social",
    distance: 60, // or 40
  },
].map((ride) => ({
  name,
  meetPoint,
  leader: "TBA",
  ...ride,
}));

export const FRIDAY_RIDES = {
  day: DAYS.FRIDAY,
  rides: RIDES,
  startTime: FRIDAY_START_TIME,
};
