import { RiderDetails } from "./RiderDetails";
import { User } from "../../types";

type Props = {
  user?: User;
  users?: User[];
  isLeader: boolean;
  hasRiders?: boolean;
  isGoingAnonymously?: boolean;
  rideNotes?: string;
};

export const RidersGoing = ({
  user,
  users,
  hasRiders,
  isLeader,
  isGoingAnonymously,
  rideNotes,
}: Props) => {
  if (!hasRiders) {
    return null;
  }

  return (
    <div className="flex w-full px-2 sm:px-0">
      <div className="flex w-full flex-col gap-2 rounded bg-white py-2 shadow-md">
        {user ? (
          users?.map((u) => (
            <RiderDetails
              key={u.id}
              user={u}
              isLeader={isLeader}
              sessionUser={user?.id}
            />
          ))
        ) : (
          <div className="flex flex-col gap-2 px-2">
            {isGoingAnonymously && (
              <div className="text-red-700">You are going</div>
            )}
            {rideNotes && <div>Note: {rideNotes}</div>}
            <div>Please log in to see other rider details</div>
          </div>
        )}
      </div>
    </div>
  );
};
