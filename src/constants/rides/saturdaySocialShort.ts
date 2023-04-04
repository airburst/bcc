import { PartialRide, SeasonStartTime } from "../../types";
import { DAYS } from "../days";

export const SOCIAL_SHORT_START_TIME: SeasonStartTime = {
  summer: {
    hour: 9,
    minute: 15,
  },
  winter: {
    hour: 9,
    minute: 15,
  },
};

const name = "Saturday Social";
const meetPoint =
  "Car Park of the Dental Implant Surgery on the corner of Newbridge Rd(A4) and Chelsea Rd";

export const SOCIAL_RIDE_SHORT: PartialRide[] = [
  {
    group: "Shorter",
    distance: 40,
    route: "https://www.bathcc.net/ride/saturday-easy-ride/",
  },
].map((ride) => ({
  name,
  meetPoint,
  leader: "TBA",
  ...ride,
}));

export const SATURDAY_SOCIAL_SHORT = {
  day: DAYS.SATURDAY,
  rides: SOCIAL_RIDE_SHORT,
  startTime: SOCIAL_SHORT_START_TIME,
};
