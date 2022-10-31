import { PartialRide, SeasonStartTime } from "../../types";
import { DAYS } from "../days";

const WEDNESDAY_START_TIME: SeasonStartTime = {
  summer: {
    hour: 9,
    minute: 0,
  },
  winter: {
    hour: 9,
    minute: 0,
  },
};

const name = "Wednesday Slackers";
const meetPoint = "TBA";

const RIDES: PartialRide[] = [
  {
    distance: 100,
  },
].map((ride) => ({
  name,
  meetPoint,
  leader: "TBA",
  ...ride,
}));

export const WEDNESDAY_RIDES = {
  day: DAYS.WEDNESDAY,
  rides: RIDES,
  startTime: WEDNESDAY_START_TIME,
};
