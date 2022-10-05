import type { NextPage } from "next";
import Head from "next/head";
import Script from "next/script";
import { useSession } from "next-auth/react"
import { useState } from "react";
import { useQuery } from '@tanstack/react-query'
import { RideGroup, RideModal } from "../components";
import { getNextWeek, groupRides, formatDate } from "../../shared/utils"
import { Ride, User } from "../types"
import styles from "./index.module.css";

type Props = {
  data: Ride[];
}

const nextDate = getNextWeek();

const fetchRides = async () => {
  const res = await fetch("/api/rides");
  const data = await res.json();
  return data;
}

const Home: NextPage<Props> = () => {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRide, setSelectedRide] = useState<Ride | null>(null);
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

  const handleRidePress = (ride: Ride) => {
    setSelectedRide(ride);
    setIsOpen(true);
  }

  const groupedRides = groupRides(data, user?.id);
  const ridesFound = groupedRides.length > 0;

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
                <RideGroup key={`group-${index}`} group={group} user={user} onPress={handleRidePress} />
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

// export async function getServerSideProps() {
//   const data = await getRides();

//   return { props: { data } }
// }