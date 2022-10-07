import { useLongPress } from 'use-long-press';
import { isMobile } from "../../shared/utils";
import { JoinButton } from ".";
import { Ride, User } from "../types";

type Props = {
  ride: Ride;
  user?: User;
  onPress: (rideId: string | undefined) => void;
}

export const Card: React.FC<Props> = ({ ride, user, onPress }) => {
  const { id, name, group, destination, distance, users } = ride;
  const details = destination ? `${destination} - ${distance} km` : `${distance} km`;

  const isGoing = user ? users?.map(u => u.id).includes(user.id) : false;
  const riderCount = users?.length;

  const pressHandler = useLongPress(() => onPress(id), {
    threshold: isMobile() ? 400 : 0,
    cancelOnMovement: true,
    filterEvents: event => {
      const target = event.target as Element;
      return target.tagName.toLowerCase() === "div"
    }
  });

  // TODO: Show join button even if user is not signed in
  return (
    <div className="grid grid-cols-[1fr_auto_48px] md:grid-cols-3 gap-2 md:gap-2 w-full box-border md:mx-autotext-neutral-500 rounded bg-white shadow-md hover:shadow-lg hover:text-neutral-700 cursor-pointer" {...pressHandler()}>
      <div className="p-2">
        <div className="font-bold uppercase tracking-wide">
          {name} ({group})
        </div>
        <div>{details}</div>
      </div>
      <div className="flex items-center justify-center text-xl font-bold gap-2 pr-2">
        <i className="fa-solid fa-person-biking"></i>
        <span className="text-3xl">{riderCount}</span>
      </div>
      <div className="justify-self-end">
        {user && (
          <JoinButton className="rounded-r w-12"
            going={isGoing}
            ariaLabel={`Join ${name} ride`}
            rideId={id}
            userId={user.id}
          />
        )}
      </div>
    </div>
  );
};
