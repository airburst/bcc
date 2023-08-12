import { listRepeatingRides } from "@api/repeating-ride/list";
import { RepeatingRideCard } from "@components/RepeatingRideCard";
import type { GetServerSideProps, NextPage } from "next";
import { getServerSession } from "next-auth";
import Head from "next/head";
import { ChangeEvent, useState } from "react";
import { RepeatingRide } from "../../types";
import { authOptions } from "../api/auth/[...nextauth]";

type Props = {
  repeatingRides: RepeatingRide[];
};

const RepeatingRidesList: NextPage<Props> = ({ repeatingRides }: Props) => {
  const [searchText, setSearchText] = useState<string | null>(null);

  if (!repeatingRides) {
    return null; // Redirect? or error
  }

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.currentTarget.value);
  };

  const filteredRides = searchText
    ? repeatingRides.filter(({ name }) =>
        `${name}`.toLowerCase().includes(searchText.toLowerCase())
      )
    : repeatingRides;

  return (
    <>
      <Head>
        <title>Repeating Rides</title>
        <meta name="description" content="Bath Cycling Club - Users" />
      </Head>

      <div className="w-full text-neutral-800">
        <div className="flex w-full flex-row items-center justify-center bg-primary p-2 font-bold uppercase tracking-wide text-white sm:rounded mb-4">
          Repeating Rides
        </div>
      </div>

      <div className="w-full px-2 sm:px-0">
        <input
          type="text"
          className="input input-bordered input-lg w-full mb-4"
          placeholder="Search by ride name"
          onChange={handleSearch}
        />
      </div>

      <div className="grid w-full grid-cols-1 gap-2 md:gap-2 px-2 sm:px-0">
        {filteredRides.map((ride) => (
          <RepeatingRideCard key={ride.id} ride={ride} />
        ))}
      </div>
    </>
  );
};

export default RepeatingRidesList;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getServerSession(req, res, authOptions);

  if (!session || (session && session.user?.role !== "ADMIN")) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  // Do not cache
  res.setHeader("Cache-Control", "no-store");

  const repeatingRides = await listRepeatingRides();

  return {
    props: {
      repeatingRides,
    },
  };
};
