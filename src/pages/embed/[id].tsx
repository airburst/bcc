import type { NextPage } from "next";
import Head from "next/head";
import Error from "next/error";
import { useRouter } from "next/router";
import { CLUB_SHORT_NAME } from "constants/theme";
import { useRide } from "../../hooks";
import { RideDetails, RideDetailsSkeleton, BackButton } from "../../components";

const RideDetailsPage: NextPage = () => {
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
        <title>{CLUB_SHORT_NAME} Ride Details</title>
        <meta name="description" content="Bath Cycling Club Ride Details" />
      </Head>

      <RideDetails ride={ride} embedded />
    </>
  );
};

export default RideDetailsPage;
