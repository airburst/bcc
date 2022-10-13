import type { NextPage } from "next";
import Head from "next/head";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useSWRConfig } from "swr";
import { addRide } from "../../hooks";
import { formatUserName, makeUtcDate } from "../../../shared/utils";
import { RideForm, FormValues } from "../../components";

const AddRide: NextPage = () => {
  const { data: session } = useSession();
  const user = session?.user;
  const { mutate } = useSWRConfig();
  const router = useRouter();
  const [waiting, setWaiting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  if (!user) {
    return null;
  }

  // Initial state for form: set name, leader and time
  const defaultValues = {
    name: "Sunday Ride",
    date: "",
    time: "08:30",
    group: "",
    destination: "",
    distance: 0,
    leader: formatUserName(user.name),
    route: "",
  };

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
    setWaiting(true);
    // Transform data before sending
    const utcDate = makeUtcDate(date, time);
    const results = await mutate("/api/ride", () =>
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

        <RideForm
          defaultValues={defaultValues}
          errors={errors}
          register={register}
          handleSubmit={handleSubmit(onSubmit)}
          waiting={waiting}
        />
      </div>
    </>
  );
};

export default AddRide;
