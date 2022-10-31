import { PartialRide, SeasonStartTime } from "../../types";
import { DAYS } from "../days";

const WEDNESDAY_START_TIME: SeasonStartTime = {
  summer: {
    hour: 18,
    minute: 0,
  },
  winter: {
    hour: 18,
    minute: 0,
  },
};

const name = "Wednesday Hills";
const meetPoint = "Cadence";

const RIDES: PartialRide[] = [
  {
    distance: 20,
  },
].map((ride) => ({
  name,
  meetPoint,
  leader: "TBA",
  ...ride,
}));

export const WEDNESDAY_HILLS = {
  day: DAYS.WEDNESDAY,
  rides: RIDES,
  startTime: WEDNESDAY_START_TIME,
};
