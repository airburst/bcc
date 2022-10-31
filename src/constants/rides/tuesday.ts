import { PartialRide, SeasonStartTime } from "../../types";
import { DAYS } from "../days";

export const TUESDAY_START_TIME: SeasonStartTime = {
  summer: {
    hour: 9,
    minute: 0,
  },
  winter: {
    hour: 9,
    minute: 0,
  },
};

const name = "Tuesday Ride";
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

export const TUESDAY_RIDES = {
  day: DAYS.TUESDAY,
  rides: RIDES,
  startTime: TUESDAY_START_TIME,
};
