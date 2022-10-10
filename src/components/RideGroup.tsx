import { Card } from "./Card";
import { ungroupRides } from "../../shared/utils";
import { Group, User } from "../types";

type Props = {
  group: Group;
  user?: User;
};

export const RideGroup: React.FC<Props> = ({ group, user }: Props) => {
  const rideData = ungroupRides(group);
  const rideDate = rideData.map(({ date }) => date)[0];
  const types = rideData.map(({ rides }) => ({ rides }));

  return (
    <div className="flex w-full flex-col items-start gap-2">
      <div className="flex w-full justify-center bg-blue-900 p-2 font-bold uppercase tracking-widest text-white">
        <div>{rideDate}</div>
      </div>

      {types.map(({ rides }) =>
        rides.map((ride) => (
          <div key={ride.id} className="w-full px-2 md:px-0">
            <Card ride={ride} user={user} />
          </div>
        ))
      )}
    </div>
  );
};
