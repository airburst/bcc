/* eslint-disable jsx-a11y/label-has-associated-control */
import { UseFormRegister, FieldErrorsImpl } from "react-hook-form";
import { useState } from "react";
import { getNow, rruleDaysInMonth } from "../../../shared/utils";

const today = getNow().split("T")[0] || "";

export type FormValues = {
  id?: string;
  name: string;
  date: string;
  time: string;
  group?: string;
  destination?: string;
  meetPoint?: string;
  notes?: string;
  distance: number;
  leader: string;
  route: string;
  limit?: number;
  // Repeating ride
  interval?: number;
  freq?: number;
  startDate?: string;
  winterStartTime?: string;
  byweekday?: number;
  byweekno?: number;
  bymonth?: number;
  bymonthday?: number;
};

type RepeatingRideFormProps = {
  defaultValues: FormValues;
  register: UseFormRegister<FormValues>;
  errors: Partial<FieldErrorsImpl<FormValues>>;
  repeats: boolean;
  repeatFreq?: number;
  selectedMonth?: number;
};

export const RepeatingRideForm = ({
  defaultValues,
  register,
  errors,
  repeats,
  repeatFreq,
  selectedMonth,
}: RepeatingRideFormProps) => {
  const [monthType, setMonthType] = useState<string>("byday");
  // Repeating rule chosen frequency
  const isYearly = repeatFreq === 0;
  const isMonthly = repeatFreq === 1;
  const isWeekly = repeatFreq === 2;
  const daysArray = Array.from(
    Array(rruleDaysInMonth(selectedMonth || 1)).keys()
  ).map((n) => n + 1);

  return (
    <>
      {/* Repeating ride section */}
      {repeats && (
        <>
          <div className="grid grid-cols-3 gap-4">
            <div className="form-control w-full">
              <label htmlFor="interval">Every</label>
              <select
                id="interval"
                className="select text-lg font-normal"
                defaultValue={defaultValues.interval}
                {...register("interval")}
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
            </div>

            <div className="col-span-2 form-control w-full">
              <label htmlFor="freq">Frequency</label>
              <select
                id="freq"
                aria-label="Repeating schedule freqency"
                className="select text-lg font-normal"
                defaultValue={defaultValues.freq}
                {...register("freq")}
              >
                <option value="2">Weeks</option>
                <option value="1">Months</option>
                <option value="0">Years</option>
              </select>
            </div>
          </div>

          {isWeekly && (
            <div className="flex">
              <div className="col-span-2 form-control w-full">
                <label htmlFor="byweekday">On</label>
                <select
                  id="byweekday"
                  aria-label="Repeating schedule freqency"
                  className="select text-lg font-normal"
                  defaultValue={defaultValues.byweekday}
                  {...register("byweekday")}
                >
                  <option value="0">Monday</option>
                  <option value="1">Tuesday</option>
                  <option value="2">Wednesday</option>
                  <option value="3">Thursday</option>
                  <option value="4">Friday</option>
                  <option value="5">Saturday</option>
                  <option value="6">Sunday</option>
                </select>
              </div>
            </div>
          )}

          {isMonthly && (
            <div className="grid grid-cols-5 gap-4">
              <div className="form-control col-span-2 w-full">
                <label htmlFor="repeat-type">Repeat type</label>
                <select
                  id="repeat-type"
                  className="select text-lg font-normal"
                  defaultValue={monthType}
                  onChange={(e) => setMonthType(e.target.value)}
                >
                  <option value="byday">By day</option>
                  <option value="byweek">By week</option>
                </select>
              </div>

              <div className="form-control w-full">
                <label htmlFor="bymonthday">Day</label>
                <select
                  id="bymonthday"
                  className="select text-lg font-normal"
                  defaultValue={defaultValues.bymonthday}
                  {...register("bymonthday")}
                >
                  {daysArray.map((day) => (
                    <option key={day} value={day}>
                      {day}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-span-2 form-control w-full">
                <label htmlFor="bymonth">Month</label>
                <select
                  id="bymonth"
                  aria-label="Repeating schedule freqency"
                  className="select text-lg font-normal"
                  defaultValue={defaultValues.bymonth}
                  {...register("bymonth")}
                >
                  <option value="1">January</option>
                  <option value="2">February</option>
                  <option value="3">March</option>
                  <option value="4">April</option>
                  <option value="5">May</option>
                  <option value="6">June</option>
                  <option value="7">July</option>
                  <option value="8">August</option>
                  <option value="9">September</option>
                  <option value="10">October</option>
                  <option value="11">November</option>
                  <option value="12">December</option>
                </select>
              </div>
            </div>
          )}
          {isYearly && <div>TODO</div>}

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-4 md:gap-8">
              <label htmlFor="startDate" className="flex flex-col gap-1">
                Start Date
                <input
                  id="startDate"
                  type="date"
                  min={today}
                  className="input"
                  defaultValue={defaultValues.startDate}
                  {...register("startDate", {
                    required: true,
                  })}
                />
                {errors.startDate && (
                  <span className="font-normal text-red-500">
                    Start date is required
                  </span>
                )}
              </label>
            </div>

            <div className="flex flex-col gap-4 md:gap-8">
              <label htmlFor="winterStartTime" className="flex flex-col gap-1">
                Winter Start
                <input
                  id="winterStartTime"
                  type="time"
                  className="input"
                  defaultValue={defaultValues.winterStartTime}
                  {...register("winterStartTime")}
                />
              </label>
            </div>
          </div>
        </>
      )}
    </>
  );
};
