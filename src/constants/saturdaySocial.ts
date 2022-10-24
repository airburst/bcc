import { Ride } from "../types";

type SocialStub = Omit<Ride, "day" | "date">;

const name = "Saturday Social";
const meetPoint =
  "Car Park of the Dental Implant Surgery on the corner of Newbridge Rd(A4) and Chelsea Rd (https://g.page/thedentalimplantclinicbath?share)";

// Saturday socials
export const SOCIAL_RIDES: SocialStub[] = [
  {
    group: "Longer",
    distance: 70,
    time: "09:15",
  },
  {
    group: "Shorter",
    speed: 40,
    time: "09:15",
  },
].map((ride) => ({
  name,
  meetPoint,
  route: "TBA",
  leader: "TBA",
  ...ride,
}));
