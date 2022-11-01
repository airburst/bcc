import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useSWRConfig } from "swr";
import { addAnonymousUser } from "../../../hooks";
import { AnonymousUserForm, AnonymousUserValues } from "../../../components";
import { flattenQuery } from "../../../../shared/utils";

const JoinRidePage: NextPage = () => {
  const { mutate } = useSWRConfig();
  const router = useRouter();
  const {
    query: { id: rideId },
  } = router;
  const [waiting, setWaiting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<AnonymousUserValues>();

  // Initial state for form: set name, leader and time
  const defaultValues = {
    name: "",
    mobile: "",
    emergency: "",
    rideId: "",
  };

  const onSubmit: SubmitHandler<AnonymousUserValues> = async ({
    name,
    mobile,
    emergency,
  }) => {
    setWaiting(true);
    // Transform data before sending
    const results = await mutate(`/api/ride/${rideId}`, () =>
      addAnonymousUser({
        name,
        mobile,
        emergency,
        rideId: flattenQuery(rideId),
      })
    );
    if (results.userId) {
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

        <div className="m-2 italic text-neutral-700">
          <p>
            Note: if you sign in to this app you will only have to provide your
            details once and can then join and leave rides with one click.
          </p>
        </div>
      </div>
    </>
  );
};

export default JoinRidePage;
