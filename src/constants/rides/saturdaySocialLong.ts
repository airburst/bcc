import { PartialRide, SeasonStartTime } from "../../types";
import { DAYS } from "../days";

export const SOCIAL_LONG_START_TIME: SeasonStartTime = {
  summer: {
    hour: 9,
    minute: 0,
  },
  winter: {
    hour: 9,
    minute: 0,
  },
};

const name = "Saturday Social";
const meetPoint =
  "Car Park of the Dental Implant Surgery on the corner of Newbridge Rd(A4) and Chelsea Rd";

export const SOCIAL_RIDE_LONG: PartialRide[] = [
  {
    group: "Longer",
    distance: 70,
  },
].map((ride) => ({
  name,
  meetPoint,
  leader: "TBA",
  ...ride,
}));

export const SATURDAY_SOCIAL_LONG = {
  day: DAYS.SATURDAY,
  rides: SOCIAL_RIDE_LONG,
  startTime: SOCIAL_LONG_START_TIME,
};
