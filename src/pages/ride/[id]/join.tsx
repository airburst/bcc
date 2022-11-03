import type { NextPage, GetServerSideProps } from "next";
import Head from "next/head";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useSWRConfig } from "swr";
import { addAnonymousUser, useLocalStorage } from "../../../hooks";
import { AnonymousUserForm, AnonymousUserValues } from "../../../components";
import { flattenQuery } from "../../../../shared/utils";
import { AnonymousUser } from "../../../types";

// TODO: redirect if user in session

const JoinRidePage: NextPage = () => {
  const { mutate } = useSWRConfig();
  const router = useRouter();
  const {
    query: { id: rideId },
  } = router;
  const [rider, setRider] = useLocalStorage<AnonymousUser>("bcc-user", {});
  const [waiting, setWaiting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<AnonymousUserValues>();

  // Initial state for form: set name, leader and time
  const defaultValues = {
    id: rider.id || null,
    name: rider.name || "",
    mobile: rider.mobile || "",
    emergency: rider.emergency || "",
    rideId: "",
  };

  const onSubmit: SubmitHandler<AnonymousUserValues> = async (user) => {
    setWaiting(true);
    // Transform data before sending
    const results = await mutate(`/api/ride/${rideId}`, () =>
      addAnonymousUser({
        ...user,
        rideId: flattenQuery(rideId),
      })
    );
    if (results.userId) {
      // Store detail in localStorage
      setRider({ id: results.userId, ...user });
      router.back();
    }
  };

  return (
    <>
      <Head>
        <title>Join BCC Ride</title>
        <meta name="description" content="Join Bath Cycling Club Ride" />
      </Head>
      <div className="w-full text-neutral-800">
        <div className="flex w-full flex-row items-center justify-center bg-blue-900 p-2 font-bold uppercase tracking-wide text-white sm:rounded">
          Join Ride
        </div>

        <div className="m-2">
          <p>
            Please provide some contact details (Non Bath CC members only). If
            you are not a member and want to join please visit the{" "}
            <a
              className="cursor-pointer text-blue-600 underline"
              href="https://www.bathcc.net/join"
            >
              Bath CC website
            </a>
            .
          </p>
        </div>

        <AnonymousUserForm
          defaultValues={defaultValues}
          errors={errors}
          isDirty={isDirty}
          register={register}
          handleSubmit={handleSubmit(onSubmit)}
          waiting={waiting}
        />

        <div className="m-2 flex flex-row items-center gap-2 rounded border-2 border-blue-200 bg-blue-100 p-2 text-neutral-700">
          <div className="px-2 text-3xl text-blue-500">
            <i className="fa-solid fa-circle-info" />
          </div>
          <p>
            If you sign up to use this app you will only have to provide your
            details once and can then join and leave rides with one click,
            across multiple devices.
          </p>
        </div>
      </div>
    </>
  );
};

export default JoinRidePage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  const { id } = context.query;

  // Redirect user back to ride if they are aleready logged in
  if (session) {
    return {
      redirect: {
        destination: `/ride/${id}`,
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
