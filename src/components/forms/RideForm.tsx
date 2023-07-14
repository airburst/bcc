/* eslint-disable jsx-a11y/label-has-associated-control */
import { FormEventHandler, useState } from "react";
import { UseFormRegister, FieldErrorsImpl } from "react-hook-form";
import { Switch } from "@headlessui/react";
import clsx from "clsx";
import { RIDER_LIMIT_OPTIONS } from "../../constants";
import { getNow } from "../../../shared/utils";
import { Preferences } from "../../types";
import { Button } from "../Button";
import { CancelButton } from "../Button/CancelButton";

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
  bymonth?: number;
  bymonthday?: number;
  byyearday?: number;
};

type RideFormProps = {
  defaultValues: FormValues;
  register: UseFormRegister<FormValues>;
  errors: Partial<FieldErrorsImpl<FormValues>>;
  handleSubmit: FormEventHandler<HTMLFormElement>;
  waiting: boolean;
  preferences: Preferences;
  isAdmin: boolean;
};

export const RideForm = ({
  defaultValues,
  register,
  errors,
  handleSubmit,
  waiting,
  preferences,
  isAdmin,
}: RideFormProps) => {
  const [repeats, setRepeats] = useState<boolean>(true);
  const switchClass = clsx(
    "relative inline-flex h-6 w-11 items-center rounded-full",
    repeats ? "bg-green-600" : "bg-gray-200"
  );
  const toggleClass = clsx(
    "inline-block h-4 w-4 transform rounded-full bg-white transition",
    repeats ? "translate-x-6" : "translate-x-1"
  );

  const handleRepeatsChange = () => setRepeats(!repeats);

  return (
    <form
      className="form-control relative grid w-full grid-cols-1 gap-4 p-2"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col gap-4 md:gap-8">
        <label htmlFor="name" className="flex flex-col gap-1">
          Ride name *
          <input
            id="name"
            type="text"
            className="input"
            defaultValue={defaultValues.name}
            {...register("name", { required: true })}
          />
          {errors.name && (
            <span className="font-normal text-red-500">
              Ride name is required
            </span>
          )}
        </label>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-4 md:gap-8">
          <label htmlFor="group" className="flex flex-col gap-1">
            Group name
            <input
              id="group"
              type="text"
              className="input"
              defaultValue={defaultValues.group}
              {...register("group")}
            />
          </label>
        </div>
        <div className="flex flex-col gap-4 md:gap-8">
          <label htmlFor="limit" className="flex flex-col gap-1">
            Rider limit
            <select
              id="limit"
              className="input"
              defaultValue={defaultValues.limit}
              {...register("limit")}
            >
              <option value="-1">No limit</option>
              {RIDER_LIMIT_OPTIONS.map((val: number) => (
                <option key={`limit-${val}`} value={val}>
                  {val}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-4 md:gap-8">
          <label htmlFor="date" className="flex flex-col gap-1">
            Date *
            <input
              id="date"
              type="date"
              min={today}
              className="input"
              defaultValue={defaultValues.date}
              {...register("date", {
                required: true,
              })}
            />
            {errors.date && (
              <span className="font-normal text-red-500">
                Ride date is required
              </span>
            )}
          </label>
        </div>

        <div className="flex flex-col gap-4 md:gap-8">
          <label htmlFor="time" className="flex flex-col gap-1">
            Start time *
            <input
              id="time"
              type="time"
              className="input"
              defaultValue={defaultValues.time}
              {...register("time", { required: true })}
            />
            {errors.time && (
              <span className="font-normal text-red-500">
                Start time is required
              </span>
            )}
          </label>
        </div>
      </div>

      <div className="flex flex-col gap-4 md:gap-8">
        <label htmlFor="meetPoint" className="flex flex-col gap-1">
          Meeting point
          <input
            id="meetPoint"
            type="text"
            className="input"
            defaultValue={defaultValues.meetPoint}
            {...register("meetPoint", { required: true })}
          />
        </label>
      </div>

      <div className="flex flex-col gap-4 md:gap-8">
        <label htmlFor="distance" className="flex flex-col">
          Distance ({preferences.units}) *
          <input
            id="distance"
            type="number"
            className="input"
            defaultValue={defaultValues.distance}
            {...register("distance", {
              required: {
                value: true,
                message: "You must set a distance",
              },
              min: {
                value: 2,
                message: "Distance must be greater than 1km",
              },
            })}
          />
          {errors.distance && (
            <span className="font-normal text-red-500">
              {errors.distance.message}
            </span>
          )}
        </label>
      </div>

      <div className="flex flex-col gap-4 md:gap-8">
        <label htmlFor="destination" className="flex flex-col">
          Destination
          <input
            id="destination"
            type="text"
            className="input"
            defaultValue={defaultValues.destination}
            {...register("destination")}
          />
        </label>
      </div>

      <div className="flex flex-col gap-4 md:gap-8">
        <label htmlFor="route" className="flex flex-col">
          Route Link
          <input
            id="route"
            type="text"
            className="input"
            defaultValue={defaultValues.route}
            {...register("route")}
          />
        </label>
      </div>

      <div className="flex flex-col gap-4 md:gap-8">
        <label htmlFor="leader" className="flex flex-col">
          Leader
          <input
            id="leader"
            type="text"
            className="input"
            defaultValue={defaultValues.leader}
            {...register("leader")}
          />
        </label>
      </div>

      <div className="flex flex-col gap-4 md:gap-8">
        <label htmlFor="notes" className="flex flex-col">
          Notes
          <textarea
            id="notes"
            className="textarea"
            rows={4}
            defaultValue={defaultValues.notes}
            {...register("notes")}
          />
        </label>
      </div>

      {/* Repeating ride section */}
      {isAdmin && (
        <div className="flex flex-row">
          <div className="pr-8">This ride repeats</div>
          <Switch
            checked={repeats}
            onChange={handleRepeatsChange}
            className={switchClass}
          >
            <span className="sr-only">Enable notifications</span>
            <span className={toggleClass} />
          </Switch>
        </div>
      )}
      {isAdmin && repeats && (
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
          {/* TODO: display relevant list for freq */}
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
          {/* Month */}
          <div className="grid grid-cols-3 gap-4">
            <div className="form-control w-full">
              <label htmlFor="bymonthday">Day</label>
              <select
                id="bymonthday"
                className="select text-lg font-normal"
                defaultValue={defaultValues.bymonthday}
                {...register("bymonthday")}
              >
                {/* TODO: programatically set days in selected month */}
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
                <option value="13">13</option>
                <option value="14">14</option>
                <option value="15">15</option>
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
                <option value="0">January</option>
                <option value="1">Febraury</option>
                <option value="2">March</option>
                <option value="3">April</option>
                <option value="4">May</option>
                <option value="5">June</option>
                <option value="6">July</option>
                <option value="7">August</option>
                <option value="8">September</option>
                <option value="9">October</option>
                <option value="10">November</option>
                <option value="11">December</option>
              </select>
            </div>
          </div>
          {/* Date and time */}
          {/* TODO: Cannot be in past */}
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
                {errors.date && (
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

      <div className="grid w-full grid-cols-2 gap-4 md:gap-8">
        <Button primary loading={waiting} type="submit">
          <div>Save</div>
        </Button>
        <CancelButton />
      </div>
    </form>
  );
};
