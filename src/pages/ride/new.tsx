/* eslint-disable @typescript-eslint/no-unused-vars */
import type { NextPage, GetServerSideProps } from "next";
import Head from "next/head";
import { getServerSession } from "next-auth";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useSWRConfig } from "swr";
import { authOptions } from "@api/auth/[...nextauth]";
import { addRepeatingRide } from "@api/repeating-ride/create";
import { RideForm } from "../../components";
import { addRide } from "../../hooks";
import {
  formatUserName,
  flattenQuery,
  serialiseUser,
  rruleDay,
  formatFormDate,
  makeRide,
  makeRepeatingRide,
} from "../../../shared/utils";
import { Preferences, RideFormValues, User } from "../../types";

type Props = {
  user: User;
};

const AddRide: NextPage<Props> = ({ user }: Props) => {
  const preferences = user?.preferences as Preferences;
  const { mutate } = useSWRConfig();
  const router = useRouter();
  const {
    query: { date: queryDate },
  } = router;
  const [waiting, setWaiting] = useState(false);
  const dateString = flattenQuery(queryDate);
  const defaultFrequency = 2; // Weekly

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<RideFormValues>();

  if (!user) {
    return null;
  }

  const isAdmin = user.role === "ADMIN";

  // Initial state for form: set name, leader and time
  const defaultValues = {
    name: "",
    date: dateString,
    time: "08:30",
    group: "",
    destination: "",
    meetPoint: "Brunel Square",
    distance: 0,
    leader: formatUserName(user.name),
    route: "",
    notes: "",
    // Repeats
    interval: 1,
    freq: defaultFrequency,
    startDate: formatFormDate(),
    until: undefined,
    winterStartTime: "08:30", // Update when time changes
    byweekday: rruleDay(), // Only set if displayed!
    byweekno: rruleDay(), // Only set if displayed!
    bymonth: new Date().getMonth() + 1, // Only set if displayed!
    bymonthday: undefined, // Only set if displayed!
  };

  const createRide: SubmitHandler<RideFormValues> = async (formData) => {
    setWaiting(true);

    const payload = makeRide(formData);
    const results = await mutate("/api/ride", () => addRide(payload));
    if (results.id) {
      router.push("/");
    }
  };

  // const createRepeatingRide: SubmitHandler<RideFormValues> = async (
  //   formData
  // ) => {
  //   setWaiting(true);

  //   const payload = makeRepeatingRide(formData);
  //   console.log("🚀 ~ file: new.tsx:92 ~ payload:", payload);

  //   const results = await mutate("/api/repeating-ride", () =>
  //     addRepeatingRide(payload)
  //   );
  //   if (results?.id) {
  //     router.push("/");
  //   }
  // };

  return (
    <>
      <Head>
        <title>Add Ride</title>
        <meta name="description" content="Bath Cycling Club - Create Ride" />
      </Head>

      <div className="w-full text-neutral-800">
        <div className="flex w-full flex-row items-center justify-center bg-primary p-2 font-bold uppercase tracking-wide text-white sm:rounded">
          Add Ride
        </div>

        <RideForm
          defaultValues={defaultValues}
          errors={errors}
          register={register}
          handleSubmit={handleSubmit(createRide)}
          waiting={waiting}
          preferences={preferences}
          isAdmin={isAdmin}
          watch={watch}
          setValue={setValue}
        />
      </div>
    </>
  );
};

export default AddRide;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore session user complains
  const user = serialiseUser(session?.user);
  const role = user?.role;
  const isAuthorised = !!session && role && ["LEADER", "ADMIN"].includes(role);

  if (!isAuthorised) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      user,
    },
  };
};
