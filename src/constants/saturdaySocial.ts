import { PartialRide } from "../types";
import { DAYS } from "./days";

const name = "Saturday Social";
const meetPoint =
  "Car Park of the Dental Implant Surgery on the corner of Newbridge Rd(A4) and Chelsea Rd (https://g.page/thedentalimplantclinicbath?share)";

export const SOCIAL_RIDES: PartialRide[] = [
  {
    group: "Longer",
    distance: 70,
    time: "09:15", // Start time varies per ride?
  },
  {
    group: "Shorter",
    distance: 40,
    time: "09:15",
  },
].map((ride) => ({
  name,
  meetPoint,
  route: "TBA",
  leader: "TBA",
  ...ride,
}));

export const SATURDAY_SOCIAL = {
  day: DAYS.SATURDAY,
  rides: SOCIAL_RIDES,
};
