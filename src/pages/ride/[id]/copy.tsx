import type { NextPage, GetServerSideProps } from "next";
import Head from "next/head";
import { useSession, getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useSWRConfig } from "swr";
import { getRide } from "../../api/ride";
import { addRide } from "../../../hooks";
import {
  makeUtcDate,
  getFormRideDateAndTime,
  getNow,
} from "../../../../shared/utils";
import { RideForm, FormValues } from "../../../components";
import { Preferences } from "../../../types";

type Props = {
  data: FormValues;
};

const CopyRide: NextPage<Props> = ({ data }: Props) => {
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
    ...data,
    ...getFormRideDateAndTime(getNow()),
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
  }) => {
    setWaiting(true);
    // Transform data before sending
    const utcDate = makeUtcDate(date, time);
    const results = await mutate("/api/ride", () =>
      addRide({
        name,
        date: utcDate,
        group,
        meetPoint,
        destination,
        distance: +distance,
        leader,
        route,
        notes,
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

export default CopyRide;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  const role = session && (session.role as string);
  const preferences =
    (session && (session.preferences as Preferences)) || undefined;
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
    },
  };
};
