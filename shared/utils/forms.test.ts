import { makeRepeatingRide } from "./forms";

const ride = {
  name: "xxx",
  group: "",
  limit: -1,
  date: "2023-07-25",
  time: "08:30",
  meetPoint: "Brunel Square",
  distance: 123,
  destination: "",
  route: "",
  leader: "Mark Fairhurst",
  notes: "",
};

const weeklyRide = {
  ...ride,
  bymonthday: 25,
  byweekday: 1,
  winterStartTime: "08:30",
  interval: 1,
  freq: 2,
  startDate: "2023-07-25",
  until: "",
};

const monthlyByDay = {
  ...ride,
  bymonthday: 25,
  byweekday: 1,
  winterStartTime: "09:30",
  interval: 1,
  freq: 1,
  startDate: "2023-07-25",
  until: "2023-12-31",
  bymonth: 7,
};

const monthlyByWeek = {
  ...ride,
  byweekday: 1,
  winterStartTime: "09:30",
  byweekno: -1,
  interval: 1,
  freq: 1,
  startDate: "2023-07-25",
  until: "2023-12-31",
};

describe("Forms utility functions", () => {
  describe("Repeating ride forms", () => {
    it("passes through all ride details to repeating payload", () => {
      expect(makeRepeatingRide(weeklyRide)).toEqual({
        schedule:
          "DTSTART:20230725T000000Z\nRRULE:FREQ=WEEKLY;INTERVAL=1;BYDAY=TU",
        name: "xxx",
        group: "",
        limit: -1,
        time: "08:30",
        meetPoint: "Brunel Square",
        distance: 123,
        destination: "",
        route: "",
        leader: "Mark Fairhurst",
        notes: "",
        winterStartTime: "08:30",
        until: "",
      });
    });

    it("correctly transforms a weekly repeating ride payload", () => {
      expect(makeRepeatingRide(weeklyRide).schedule).toEqual(
        "DTSTART:20230725T000000Z\nRRULE:FREQ=WEEKLY;INTERVAL=1;BYDAY=TU"
      );
    });

    it("correctly transforms a monthly repeating ride (by day) payload", () => {
      expect(makeRepeatingRide(monthlyByDay).schedule).toEqual(
        "DTSTART:20230725T000000Z\nRRULE:FREQ=MONTHLY;INTERVAL=1" // TODO: bymonthday???
      );
    });

    it("correctly transforms a monthly repeating ride (by week) payload", () => {
      expect(makeRepeatingRide(monthlyByWeek).schedule).toEqual(
        "DTSTART:20230725T000000Z\nRRULE:FREQ=MONTHLY;INTERVAL=1;BYDAY=TU"
      );
    });
  });
});
