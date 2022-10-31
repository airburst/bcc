import { PartialRide, SeasonStartTime } from "../../types";
import { DAYS } from "../days";

export const SOCIAL_START_TIME: SeasonStartTime = {
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

export const SOCIAL_RIDES: PartialRide[] = [
  {
    group: "Longer",
    distance: 70,
  },
  {
    group: "Shorter",
    distance: 40,
  },
].map((ride) => ({
  name,
  meetPoint,
  leader: "TBA",
  ...ride,
}));

export const SATURDAY_SOCIAL = {
  day: DAYS.SATURDAY,
  rides: SOCIAL_RIDES,
  startTime: SOCIAL_START_TIME,
};
