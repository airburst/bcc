import type { NextPage, GetServerSideProps } from "next";
import Head from "next/head";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useSWRConfig } from "swr";
import { getProfile } from "./api/user";
import { updateUser } from "../hooks";
import { UserProfileForm, UserProfileValues } from "../components";
import { User } from "../types";

type Props = {
  user: User;
};

const Profile: NextPage<Props> = ({ user }: Props) => {
  const { mutate } = useSWRConfig();
  const router = useRouter();
  const [waiting, setWaiting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserProfileValues>();

  if (!user) {
    return null;
  }

  // Initial state for form: set name, leader and time
  const defaultValues = {
    id: user.id,
    name: user.name,
    email: user.email,
    mobile: user.mobile,
    role: user.role,
  };

  const onSubmit: SubmitHandler<UserProfileValues> = async ({
    id,
    name,
    mobile,
  }) => {
    console.log("submitting", id, name, mobile);
    // setWaiting(true);
    // const results = await mutate("/api/user", () =>
    //   updateUser({
    //     id,
    //     name,
    //     mobile,
    //   })
    // );
    // if (results.id) {
    //   router.push("/");
    // }
  };

  return (
    <>
      <Head>
        <title>PROFILE</title>
        <meta name="description" content="Bath Cycling Club - Create Ride" />
      </Head>

      <div className="w-full text-neutral-800">
        <div className="flex w-full flex-row items-center justify-center bg-blue-900 p-2 font-bold uppercase tracking-wide text-white sm:rounded">
          Add Ride
        </div>

        <UserProfileForm
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

export default Profile;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const user = await getProfile(session.user as User);

  return {
    props: {
      user,
    },
  };
};
