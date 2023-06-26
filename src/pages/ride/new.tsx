import type { NextPage, GetServerSideProps } from "next";
import Head from "next/head";
import { getServerSession } from "next-auth";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useSWRConfig } from "swr";
import { authOptions } from "@/api/auth/[...nextauth]";
import { RideForm, FormValues } from "../../components";
import { addRide } from "../../hooks";
import {
  formatUserName,
  makeUtcDate,
  flattenQuery,
  serialiseUser,
} from "../../../shared/utils";
import { Preferences, User } from "../../types";

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
  const dateString = flattenQuery(queryDate);

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
      addRide({
        name,
        date: utcDate,
        group,
        destination,
        distance: +distance,
        leader,
        route,
        meetPoint,
        notes,
        limit,
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
