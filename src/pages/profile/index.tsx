import type { NextPage, GetServerSideProps } from "next";
import Head from "next/head";
import { getServerSession } from "next-auth";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useSWRConfig } from "swr";
import { authOptions } from "../api/auth/[...nextauth]";
import { getProfile } from "../api/user";
import { updateUser } from "../../hooks";
import { UserProfileForm, UserProfileValues } from "../../components";
import { User } from "../../types";

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
    formState: { errors, isDirty },
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
    emergency: user.emergency,
    preferences: user.preferences,
  };

  const onSubmit: SubmitHandler<UserProfileValues> = async ({
    name,
    mobile,
    emergency,
    preferences,
  }) => {
    setWaiting(true);
    await mutate("/api/rides", async () => {
      const userRecord = await updateUser({
        id: user.id,
        name,
        mobile,
        emergency,
        preferences,
      });

      if (userRecord?.id) {
        router.push("/");
      }
      setWaiting(false);
    });
  };

  return (
    <>
      <Head>
        <title>Profile</title>
        <meta name="description" content="Bath Cycling Club - User Profile" />
      </Head>

      <div className="w-full text-neutral-800">
        <div className="flex w-full flex-row items-center justify-center bg-primary p-2 font-bold uppercase tracking-wide text-white sm:rounded">
          Profile
        </div>

        <UserProfileForm
          defaultValues={defaultValues}
          errors={errors}
          isDirty={isDirty}
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
  const session = await getServerSession(context.req, context.res, authOptions);

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
