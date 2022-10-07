import type { NextPage } from "next";
import Head from "next/head";
import Script from "next/script";
import { useSession } from "next-auth/react"
import { useState } from "react";
import { dehydrate, DehydratedState, QueryClient, useQuery } from '@tanstack/react-query';
import { getRides } from "./api/rides";
import { RideGroup, RideModal } from "../components";
import { getNextWeek, groupRides, formatDate } from "../../shared/utils"
import { Ride, User } from "../types"
import styles from "./index.module.css";

type Props = {
  data: Ride[];
  dehydratedState: DehydratedState;
}

const nextDate = getNextWeek();

export const fetchRides = async () => {
  const res = await fetch("/api/rides");
  const data = await res.json();
  return data;
};

const Home: NextPage<Props> = () => {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRideId, setSelectedRideId] = useState<string | null>(null);
  // Use CSR data fetching so we can refetch when users join/unjoin
  const { status, data, error } = useQuery(['rides'], fetchRides)

  if (status === 'loading') {
    return <span>Loading...</span>
  }

  if (status === 'error') {
    const err = error as Error;
    return <span>Error: {err.message}</span>
  }

  // Get user id from session
  const user = session?.user as User;

  const handleRidePress = (rideId: string | undefined) => {
    if (rideId) {
      setSelectedRideId(rideId);
      setIsOpen(true);
    }
  }

  const groupedRides = groupRides(data, user?.id);
  const ridesFound = groupedRides.length > 0;
  const selectedRide = data.filter((ride: Ride) => ride.id === selectedRideId)[0];

  // .grid {
  //   display: grid;
  //   grid-template-columns: 1fr;
  //   gap: 16px;
  //   width: 100%;
  //   height: 100%;
  // }

  // .noRides {
  //   display: flex;
  //   align-items: center;
  //   height: 100%;
  //   font-size: 2em;
  //   line-height: 1.4em;
  //   color: var(--color-text-lighter);
  // }

  // @media (min-width: 920px) {
  //   .grid {
  //     max-width: var(--max-width);
  //     gap: 32px;
  //   }
  // }


  return (
    <>
      <Head>
        <title>BCC Rides</title>
        <meta name="description" content="Bath Cycling Club Ride Planner" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Script
        id="fontawesome"
        src="https://kit.fontawesome.com/329fae5f95.js"
        defer
      />

      <div className={styles.grid}>
        {ridesFound
          ? (
            <>
              {groupedRides.map((group, index) => (
                <RideGroup
                  key={`group-${index}`}
                  group={group}
                  user={user}
                  onPress={handleRidePress} />
              ))}
            </>
          )
          : (
            <div className={styles.noRides}>
              No planned rides before{' '}
              {formatDate(nextDate)}
            </div>
          )
        }
        {isOpen && <RideModal ride={selectedRide} user={user} setIsOpen={setIsOpen} />}
      </div>
    </>
  )
};

export default Home;

export async function getServerSideProps() {
  const queryClient = new QueryClient();

  // prefetch data on the server
  await queryClient.fetchQuery(['rides'], getRides);

  return {
    props: {
      // dehydrate query cache
      dehydratedState: dehydrate(queryClient),
    },
  }
}