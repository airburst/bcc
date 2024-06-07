import { authOptions } from "@api/auth/[...nextauth]";
import { getRepeatingRide } from "@api/repeating-ride";
import type { GetServerSideProps, NextPage } from "next";
import { getServerSession } from "next-auth";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { updateRepeatingRide } from "src/hooks";
import { useSWRConfig } from "swr";
import {
  getFormRideDateAndTime,
  serialiseUser,
} from "../../../../shared/utils";
import { RideForm } from "../../../components";
import { Preferences, RideFormValues, User } from "../../../types";

type Props = {
  data: RideFormValues;
  user: User;
};

const EditRepeatingRide: NextPage<Props> = ({ data, user }: Props) => {
  const preferences = user?.preferences as Preferences;
  const { mutate } = useSWRConfig();
  const router = useRouter();
  const [waiting, setWaiting] = useState(false);

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
    ...data,
    distance: parseInt((data.distance || 1).toString(), 10),
    ...getFormRideDateAndTime(data.date, data.startDate),
  };

  const onSubmit: SubmitHandler<RideFormValues> = async (formData) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { date, time, distance, ...rideData } = formData;
    // Recreate startDate from date and time
    const startDate = `${date}T${time}:00Z`;

    setWaiting(true);
    const results = await mutate("/api/repeating-ride", () =>
      updateRepeatingRide({
        id: defaultValues.id,
        distance: Number(distance),
        ...rideData,
        startDate,
      })
    );

    if (results.error) {
      setWaiting(false);
      // eslint-disable-next-line no-console
      console.error(results.error);
      return;
    }

    if (results.id) {
      router.back();
    }
  };

  return (
    <>
      <Head>
        <title>Edit Repeating Ride</title>
        <meta
          name="description"
          content="Bath Cycling Club - Edit Repeating Ride"
        />
      </Head>

      <div className="w-full text-neutral-800">
        <div className="flex w-full flex-row items-center justify-center bg-primary p-2 font-bold uppercase tracking-wide text-white sm:rounded">
          Edit Repeating Ride
        </div>

        <RideForm
          defaultValues={defaultValues}
          errors={errors}
          register={register}
          handleSubmit={handleSubmit(onSubmit)}
          handleSchedule={handleSubmit(onSubmit)}
          waiting={waiting}
          preferences={preferences}
          isAdmin={isAdmin}
          watch={watch}
          setValue={setValue}
          isRepeating
        />
      </div>
    </>
  );
};

export default EditRepeatingRide;

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

  const { query } = context;
  const data = await getRepeatingRide(query.id);

  return {
    props: {
      data,
      user,
    },
  };
};
