import { useRouter } from 'next/router';
import { useLongPress } from 'use-long-press';
import { getRideDateAndTime } from "../../shared/utils";
import { isMobile } from "../../shared/utils"; import { Ride, User } from "../types";

type Props = {
  ride: Ride;
  user?: User;
}

export const Card: React.FC<Props> = ({ ride, user }) => {
  const router = useRouter();
  const { id, name, date, group, destination, distance, users } = ride;

  const details = destination ? `${destination} - ${distance} km` : `${distance} km`;
  const { time } = getRideDateAndTime(date);

  const pressHandler = useLongPress(() => router.push(`/ride/${id}`), {
    threshold: isMobile() ? 400 : 0,
    cancelOnMovement: true,
    filterEvents: event => {
      const target = event.target as Element;
      return target.tagName.toLowerCase() === "div"
    }
  });

  if (!id) {
    return null;
  }

  const isGoing = user ? users?.map(u => u.id).includes(user.id) : false;
  const riderCount = users?.length;

  return (
    <div className="flex gap-2 md:gap-2 w-full box-border md:mx-autotext-neutral-500 rounded bg-white shadow-md hover:shadow-lg hover:text-neutral-700 cursor-pointer" {...pressHandler()}>

      <div className="w-full grid grid-cols-[auto_1fr_68px] pl-1">
        <div className="font-bold uppercase tracking-wide p-1 col-span-2">
          {name} - {group}
        </div>
        <div className="justify-self-center">
          {isGoing && (
            <div className="bg-green-500 text-white p-1 px-2 font-bold tracking-wide rounded-tr-md">GOING</div>
          )}
        </div>

        <div className="font-bold tracking-wide text-neutral-600 p-1">{time}</div>
        <div className="p-1">{details}</div>
        <div className="flex flex-row items-center justify-center p-1 gap-1">
          <i className="fa-solid fa-person-biking text-xs"></i>
          <span className="font-bold text-xl">{riderCount}</span>
        </div>
      </div>

      {/* <div className="flex flex-col items-center justify-center p-2">
        <div>going</div>
        <div className="flex flex-row">
          <i className="fa-solid fa-person-biking"></i>
          <span className="text-xl">{riderCount}</span>
        </div>
      </div> */}

    </div>
  );
};
