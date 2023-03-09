import Link from "next/link";
import { useState } from "react";
import { Button } from "../Button";
import { BackButton } from "../Button/BackButton";
import { JoinButton } from "../Button/JoinButton";
import { Badge } from "../Badge";
import { useLocalStorage } from "../../hooks";
import { User, Ride, AnonymousUser } from "../../types";
import { isJoinable } from "../../../shared/utils";
import { RideInfo } from "./RideInfo";
import { RidersGoing } from "./RidersGoing";
import { RideNotes } from "./RideNotes";

type RowProps = {
  children: JSX.Element | JSX.Element[] | null | undefined;
};

const Heading = ({ children }: RowProps) => (
  <div className="flex w-full flex-row items-center justify-center bg-blue-900 p-2 font-bold uppercase tracking-wide text-white sm:rounded">
    {children}
  </div>
);

type Props = {
  ride: Ride;
  user?: User;
  role?: string;
  embedded?: boolean;
};

export const RideDetails = ({ ride, user, role, embedded }: Props) => {
  const [showNotesForm, setShowNotesForm] = useState<boolean>(false);
  const [anonRider] = useLocalStorage<AnonymousUser>("bcc-user", {});
  const { id, name, date, day, users } = ride;

  const hasRiders = users && users?.length > 0;
  const isGoingAnonymously = !!(
    anonRider?.id && users?.map((u: User) => u.id).includes(anonRider?.id)
  );
  const isGoing =
    users && user ? users?.map((u: User) => u.id).includes(user?.id) : false;
  const isLeader = ["ADMIN", "LEADER"].includes(role || "");
  const canJoin = isJoinable(date);
  const rideNotes =
    (users && user && users?.find((u: User) => u.id === user.id)?.rideNotes) ||
    (anonRider?.id &&
      users?.find((u: User) => u.id === anonRider.id)?.rideNotes);

  const openNotes = () => setShowNotesForm(true);
  const closeNotes = () => setShowNotesForm(false);

  return (
    <div className="flex w-full flex-col gap-2">
      <Heading>
        <div>{day}</div>
      </Heading>

      <RideInfo ride={ride} />

      <Heading>
        <div className="flex items-center gap-4">
          Going
          <Badge text={users?.length} />
        </div>
      </Heading>

      {embedded ? (
        <div className="flex h-4 flex-row justify-between px-2 pt-2 sm:px-0">
          <BackButton url="/embed" />
        </div>
      ) : (
        <>
          <RidersGoing
            user={user}
            users={users}
            hasRiders={hasRiders}
            isLeader={isLeader}
            isGoingAnonymously={isGoingAnonymously}
          />

          <div className="flex h-4 flex-row justify-between px-2 pt-2 sm:px-0">
            <BackButton url={`/#${id}`} />

            {(isGoing || isGoingAnonymously) && (
              <Button variant="accent" onClick={openNotes}>
                <i className="fa-solid fa-pen-to-square" />
                Message
              </Button>
            )}

            {user && canJoin && (
              <JoinButton
                going={isGoing}
                ariaLabel={`Join ${name} ride`}
                rideId={id}
                userId={user?.id}
              />
            )}
            {!user && !isGoingAnonymously && canJoin && (
              <Link href={`/ride/${id}/join`}>
                <div className="flex h-10">
                  <Button variant="join">
                    <i className="fa-solid fa-plus" />
                    Join
                  </Button>
                </div>
              </Link>
            )}
          </div>
        </>
      )}

      <RideNotes
        userId={user?.id || anonRider?.id}
        rideId={id}
        rideNotes={rideNotes}
        showNotesForm={showNotesForm}
        closeHandler={closeNotes}
      />
    </div>
  );
};
