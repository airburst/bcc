/* eslint-disable @typescript-eslint/ban-ts-comment */
import type { NextPage, GetServerSideProps } from "next";
import Head from "next/head";
import { useSession } from "next-auth/react";
import { dehydrate, DehydratedState, QueryClient, useQuery } from '@tanstack/react-query';
import { getRide } from "../api/ride"
import { JoinButton, Badge, BackButton } from "../../components";
import { User, Ride } from "../../types";

type Props = {
  data: string;
  dehydratedState: DehydratedState;
}

export const fetchRide = async (id: string | string[]) => {
  const res = await fetch(`/api/ride?id=${id}`);
  const data = await res.json();
  return data;
};

const RideDetails: NextPage<Props> = ({ data: rideId }) => {
  const { data: session } = useSession();
  const user = session?.user as User;
  // Use CSR data fetching so we can refetch when users join/unjoin
  const { status, data, error } = useQuery(['ride'], () => fetchRide(rideId))

  if (!data || status === 'loading') {
    return <span>Loading...</span>
  }

  if (status === 'error') {
    const err = error as Error;
    return <span>Error: {err.message}</span>
  }

  const {
    id,
    name,
    group,
    destination,
    distance,
    leader,
    route,
    speed,
    users
  } = data as Ride;

  const hasRiders = users && users?.length > 0;
  const isGoing = users ? users?.map((u: User) => u.id).includes(user?.id) : false;

  type RowProps = {
    children: JSX.Element | JSX.Element[] | null | undefined;
  }

  const Row = ({ children }: RowProps) => (
    <div className="flex flex-row md:grid md:grid-cols-[160px_1fr] items-center justify-between md:justify-start md:gap-4 w-full font-medium px-2">{children}</div>
  );

  const Heading = ({ children }: RowProps) => (
    <div className="flex flex-row items-center justify-between w-full bg-blue-900 text-white p-2 font-bold uppercase tracking-wide sm:rounded">{children}</div>
  );

  return (
    <>
      <Head>
        <title>BCC Ride Details</title>
        <meta name="description" content="Bath Cycling Club Ride Planner" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex flex-col gap-2 w-full">
        <Heading><>{name} ({group})</></Heading>

        <div className="flex w-full px-2 sm:px-0">
          <div className="flex flex-col gap-2 w-full bg-white rounded shadow-md py-2">
            {destination && (<Row><div>Destination</div><div>{destination}</div></Row>)}
            {distance && (<Row><div>Distance</div><div>{distance} km</div></Row>)}
            {speed && (<Row><div>Average Speed</div><div>{speed} km/h</div></Row>)}
            {route && (<Row>
              <div>Route</div>
              <a className="text-blue-500 underline hover:text-blue-600" href={route} target="_blank" rel="noreferrer">{route}</a>
            </Row>)}
            {leader && (<Row><div>Leader</div><div>{leader}</div></Row>)}
          </div>
        </div>

        <Heading><div className="flex items-center gap-4">Going<Badge text={users?.length} /></div></Heading>

        <div className="flex w-full px-2 sm:px-0">
          {hasRiders && (
            <div className="flex flex-col gap-2 w-full bg-white rounded shadow-md py-2">
              {users?.map(({ name, mobile }) => (
                <Row key={name}>
                  <div>{name}</div>
                  <div className="flex items-center gap-2">
                    {mobile && <i className="fa-solid fa-phone"></i>}
                    <span>{mobile}</span>
                  </div>
                </Row>
              ))}
            </div>)}
        </div>

        <div className="flex flex-row justify-between h-4 pt-8 px-2 sm:px-0">
          <BackButton />
          <JoinButton className="rounded flex items-center justify-center w-24 p-5"
            going={isGoing}
            ariaLabel={`Join ${name} ride`}
            rideId={id}
            userId={user?.id}
          />
        </div>
      </div>
    </>
  );
}

export default RideDetails;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context?.params?.id;
  const queryClient = new QueryClient();

  // prefetch data on the server
  // @ts-ignore
  await queryClient.fetchQuery(["ride"], () => getRide(id));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      data: id
    },
  }
}