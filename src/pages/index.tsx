import type { NextPage } from "next";
import Head from "next/head";
import Script from "next/script";
import { useState } from "react";
import { getRides } from "./api/rides"
// import { useGetRides } from "../services/PlanetScaleService/hooks";
import { RideGroup, RideModal } from "../components";
import { getNextWeek, groupRides, formatDate } from "../../shared/utils"
import { Ride } from "../types"
import styles from "./index.module.css";

type Props = {
  data: Ride[];
}

let nextDate = getNextWeek();
nextDate = "2022-10-09 23:59:59";

const Home: NextPage<Props> = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRide, setSelectedRide] = useState<Ride | null>(null);

  // if (loading) {
  //   return (
  //     <Loading text="Fetching rides..." />
  //   )
  // }

  const handleRidePress = (ride: Ride) => {
    setSelectedRide(ride);
    setIsOpen(true);
  }

  const groupedRides = groupRides(data);
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
                <RideGroup key={`group-${index}`} group={group} onPress={handleRidePress} />
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
        {isOpen && <RideModal ride={selectedRide} setIsOpen={setIsOpen} />}
      </div>
    </>
  )
};

export default Home;

export async function getServerSideProps() {
  const data = await getRides();

  return { props: { data } }
}