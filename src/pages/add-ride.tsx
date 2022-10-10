import type { NextPage } from "next";
import Head from "next/head";
import { useSession } from "next-auth/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { formatUserName } from "../../shared/utils";
import { CancelButton, Button } from "../components";

type FormValues = {
  name: string;
  group?: string;
  destination?: string;
  distance: string;
  leader: string;
};

// TODO: Add datepicker and time picker

const AddRide: NextPage = () => {
  const { data: session } = useSession();
  const user = session?.user;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  if (!user) {
    return null;
  }

  const onSubmit: SubmitHandler<FormValues> = (data) =>
    // eslint-disable-next-line no-alert
    alert(JSON.stringify(data, null, 2));

  return (
    <>
      <Head>
        <title>Add Ride</title>
        <meta name="description" content="Bath Cycling Club - Create Ride" />
      </Head>

      <div className="w-full text-neutral-800">
        <div className="flex w-full flex-row items-center justify-center bg-blue-900 p-2 font-bold uppercase tracking-wide text-white sm:rounded">
          Add Ride
        </div>

        <form
          className="grid w-full grid-cols-1 gap-4 p-2"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="grid w-full grid-cols-1 gap-4 md:gap-8">
            <label htmlFor="name" className="flex flex-col gap-1 font-medium">
              Type of ride *
              <input
                id="name"
                type="text"
                className="rounded font-normal"
                defaultValue="Sunday Ride"
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
            <label htmlFor="group" className="flex flex-col gap-1 font-medium">
              Group name
              <input
                id="group"
                type="text"
                className="rounded font-normal"
                {...register("group")}
              />
            </label>
          </div>

          <div className="grid w-full grid-cols-1 gap-4 md:gap-8">
            <label htmlFor="destination" className="flex flex-col">
              Destination
              <input
                id="destination"
                type="text"
                className="rounded"
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
                {...register("distance", { required: true })}
              />
              {errors.distance && (
                <span className="font-normal text-red-500">
                  Distance is required
                </span>
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
                defaultValue={formatUserName(user.name)}
                {...register("leader")}
              />
            </label>
          </div>

          <div className="grid w-full grid-cols-2 gap-4 md:gap-8">
            <Button type="submit">
              <div>Submit</div>
            </Button>
            <CancelButton />
          </div>
        </form>
      </div>
    </>
  );
};

export default AddRide;
