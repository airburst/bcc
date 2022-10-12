import { FormEventHandler } from "react";
import { UseFormRegister, FieldErrorsImpl } from "react-hook-form";
import { Button } from "../Button";
import { CancelButton } from "../Button/CancelButton";

export type FormValues = {
  id?: string;
  name: string;
  date: string;
  time: string;
  group: string;
  destination?: string;
  distance: number;
  leader: string;
  route: string;
};

type RideFormProps = {
  defaultValues: FormValues;
  register: UseFormRegister<FormValues>;
  errors: Partial<FieldErrorsImpl<FormValues>>;
  handleSubmit: FormEventHandler<HTMLFormElement>;
  waiting: boolean;
};

export const RideForm = ({
  defaultValues,
  register,
  errors,
  handleSubmit,
  waiting,
}: RideFormProps) => (
  <form
    className="relative grid w-full grid-cols-1 gap-4 p-2"
    onSubmit={handleSubmit}
  >
    <div className="grid w-full grid-cols-1 gap-4 md:gap-8">
      <label htmlFor="name" className="flex flex-col gap-1 font-medium">
        Type of ride *
        <input
          id="name"
          type="text"
          className="rounded font-normal"
          defaultValue={defaultValues.name}
          {...register("name", { required: true })}
        />
        {errors.name && (
          <span className="font-normal text-red-500">
            Ride type is required
          </span>
        )}
      </label>
    </div>

    <div className="grid w-full grid-cols-1 gap-4 md:gap-8">
      <label htmlFor="date" className="flex flex-col gap-1 font-medium">
        Date *
        <input
          id="date"
          type="date"
          className="rounded font-normal"
          defaultValue={defaultValues.date}
          {...register("date", { required: true })}
        />
        {errors.date && (
          <span className="font-normal text-red-500">
            Ride date is required
          </span>
        )}
      </label>
    </div>

    <div className="grid w-full grid-cols-1 gap-4 md:gap-8">
      <label htmlFor="time" className="flex flex-col gap-1 font-medium">
        Start time *
        <input
          id="time"
          type="time"
          className="rounded font-normal"
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

    <div className="grid w-full grid-cols-1 gap-4 md:gap-8">
      <label htmlFor="group" className="flex flex-col gap-1 font-medium">
        Group name *
        <input
          id="group"
          type="text"
          className="rounded font-normal"
          defaultValue={defaultValues.group}
          {...register("group", { required: true })}
        />
        {errors.group && (
          <span className="font-normal text-red-500">
            Group name is required
          </span>
        )}
      </label>
    </div>

    <div className="grid w-full grid-cols-1 gap-4 md:gap-8">
      <label htmlFor="destination" className="flex flex-col">
        Destination
        <input
          id="destination"
          type="text"
          className="rounded"
          defaultValue={defaultValues.destination}
          {...register("destination")}
        />
      </label>
    </div>

    <div className="grid w-full grid-cols-1 gap-4 md:gap-8">
      <label htmlFor="distance" className="flex flex-col">
        Distance (km) *
        <input
          id="distance"
          type="number"
          className="rounded"
          defaultValue={defaultValues.distance}
          {...register("distance", { required: true })}
        />
        {errors.distance && (
          <span className="font-normal text-red-500">Distance is required</span>
        )}
      </label>
    </div>

    <div className="grid w-full grid-cols-1 gap-4 md:gap-8">
      <label htmlFor="leader" className="flex flex-col">
        Leader
        <input
          id="leader"
          type="text"
          className="rounded"
          defaultValue={defaultValues.leader}
          {...register("leader")}
        />
      </label>
    </div>

    <div className="grid w-full grid-cols-1 gap-4 md:gap-8">
      <label htmlFor="route" className="flex flex-col">
        Route Link
        <input
          id="route"
          type="text"
          className="rounded"
          defaultValue={defaultValues.route}
          {...register("route")}
        />
      </label>
    </div>

    <div className="grid w-full grid-cols-2 gap-4 md:gap-8">
      <Button loading={waiting} type="submit">
        <div>Submit</div>
      </Button>
      <CancelButton />
    </div>
  </form>
);
