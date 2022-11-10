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
    group: "Quicker",
    distance: 40,
  },
  {
    group: "Medium",
    distance: 40,
  },
  {
    group: "Steady",
    distance: 40,
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
