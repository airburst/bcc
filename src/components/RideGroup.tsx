import { Card } from ".";
import { ungroupRides } from "../../shared/utils"
import { Group, User } from "../types"

type Props = {
  group: Group;
  user?: User;
}


export const RideGroup: React.FC<Props> = ({ group, user }) => {
  const rideData = ungroupRides(group);
  const date = rideData.map(({ date }) => date)[0];
  const types = rideData.map(({ rides }) => ({ rides }));

  return (
    <div className="flex flex-col items-start w-full gap-2">
      <div className="flex justify-center w-full p-2 text-white bg-blue-900 font-bold uppercase tracking-widest">
        <div>{date}</div>
      </div>

      {types.map(({ rides }) => rides.map(ride => (
        <div key={ride.id} className="w-full px-2 md:px-0">
          <Card ride={ride} user={user} />
        </div>
      )))}
    </div>
  );
};

