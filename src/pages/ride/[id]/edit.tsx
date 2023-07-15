import type { NextPage, GetServerSideProps } from "next";
import Head from "next/head";
import { getServerSession } from "next-auth";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useSWRConfig } from "swr";
import { authOptions } from "@api/auth/[...nextauth]";
import { getRide } from "../../api/ride";
import { updateRide } from "../../../hooks";
import {
  makeUtcDate,
  getFormRideDateAndTime,
  serialiseUser,
} from "../../../../shared/utils";
import { RideForm, FormValues } from "../../../components";
import { Preferences, User } from "../../../types";

type Props = {
  data: FormValues;
  user: User;
};

const EditRide: NextPage<Props> = ({ data, user }: Props) => {
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
  } = useForm<FormValues>();

  if (!user) {
    return null;
  }

  const isAdmin = user.role === "ADMIN";

  // Initial state for form: set name, leader and time
  const defaultValues = {
    ...data,
    distance: parseInt(data.distance.toString(), 10),
    ...getFormRideDateAndTime(data.date),
  };

  const onSubmit: SubmitHandler<FormValues> = async ({
    name,
    date,
    time,
    group,
    meetPoint,
    destination,
    distance,
    leader,
    route,
    notes,
    limit,
  }) => {
    setWaiting(true);
    // Transform data before sending
    const utcDate = makeUtcDate(date, time);
    const results = await mutate("/api/ride", () =>
      updateRide({
        id: data.id,
        name,
        date: utcDate,
        group,
        meetPoint,
        destination,
        distance: +distance,
        leader,
        route,
        notes,
        limit,
      })
    );
    if (results.id) {
      router.back();
    }
  };

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
          handleSubmit={handleSubmit(onSubmit)}
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

export default EditRide;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore session user complains
  const user = serialiseUser(session?.user);
  const role = user?.role;
  const preferences =
    (session && (session.user?.preferences as Preferences)) || undefined;
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
  const data = await getRide(query.id, preferences, !!session);

  return {
    props: {
      data,
      user,
    },
  };
};
