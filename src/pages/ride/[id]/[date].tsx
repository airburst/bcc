import type { NextPage, GetServerSideProps } from "next";
import Head from "next/head";
import Error from "next/error";
import { useRouter } from "next/router";
import { getServerSession } from "next-auth";
import { authOptions } from "@/api/auth/[...nextauth]";
import { useRide } from "../../../hooks";
import {
  RideDetails,
  RideDetailsSkeleton,
  BackButton,
} from "../../../components";
import { serialiseUser } from "../../../../shared/utils";
import { User } from "../../../types";

type Props = {
  user: User;
};

const RideDetailsPage: NextPage<Props> = ({ user }: Props) => {
  const role = user?.role as string;

  const router = useRouter();
  const { ride, loading, error } = useRide(router.query.id);

  if (loading) {
    return <RideDetailsSkeleton />;
  }

  if (error) {
    return <Error statusCode={500} />;
  }

  if (!ride.id) {
    return (
      <>
        <div className="flex h-64 w-full items-center justify-center text-2xl">
          This ride is no longer available
        </div>
        <div className="flex h-4 flex-row justify-between px-2 pt-8 sm:px-0">
          <BackButton />
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>BCC Ride Details</title>
        <meta name="description" content="Bath Cycling Club Ride Details" />
      </Head>

      <RideDetails ride={ride} user={user} role={role} />
    </>
  );
};

export default RideDetailsPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore session user complains
  const user = serialiseUser(session?.user);

  return {
    props: {
      user,
    },
  };
};
