import type { NextPage } from "next";
import Head from "next/head";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useForm, SubmitHandler } from "react-hook-form";
import { useSWRConfig } from "swr";
import { addRide } from "../hooks";
import { formatUserName, makeUtcDate } from "../../shared/utils";
import { CancelButton, Button } from "../components";

type FormValues = {
  name: string;
  date: string;
  time: string;
  group: string;
  destination?: string;
  distance: number;
  leader: string;
  route: string;
};

const AddRide: NextPage = () => {
  const { data: session } = useSession();
  const user = session?.user;
  const { mutate } = useSWRConfig();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  if (!user) {
    return null;
  }

  const onSubmit: SubmitHandler<FormValues> = async ({
    name,
    date,
    time,
    group,
    destination,
    distance,
    leader,
    route,
  }) => {
    // Transform data before sending
    const utcDate = makeUtcDate(date, time);
    const results = await mutate("/api/create-ride", () =>
      addRide({
        name,
        date: utcDate,
        group,
        destination,
        distance: +distance,
        leader,
        route,
      })
    );
    if (results.id) {
      router.push("/");
    }
  };

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
            <label htmlFor="date" className="flex flex-col gap-1 font-medium">
              Date *
              <input
                id="date"
                type="date"
                className="rounded font-normal"
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
                defaultValue="08:30"
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

          <div className="grid w-full grid-cols-1 gap-4 md:gap-8">
            <label htmlFor="route" className="flex flex-col">
              Route Link
              <input
                id="route"
                type="text"
                className="rounded"
                {...register("route")}
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
