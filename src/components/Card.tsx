import { useRouter } from "next/router";
import Image from "next/future/image";
import { useState } from "react";
import Skeleton from "react-loading-skeleton";
import { Ride, User } from "../types";
import "react-loading-skeleton/dist/skeleton.css";

type Props = {
  ride: Ride;
  user?: User;
};

export const Card: React.FC<Props> = ({ ride, user }: Props) => {
  const [isSwiping, setSwiping] = useState(false);
  const router = useRouter();
  const { id, name, time, group, destination, distance, users } = ride;

  const details = destination
    ? `${destination} - ${distance} km`
    : `${distance} km`;

  const onPress = () => router.push(`/ride/${id}`);

  if (!id) {
    return null;
  }

  const isGoing = user ? users?.map((u) => u.id).includes(user.id) : false;
  const riderCount = users?.length;

  return (
    <div
      role="presentation"
      className="md:mx-autotext-neutral-500 box-border flex w-full cursor-pointer gap-2 rounded bg-white shadow-md hover:text-neutral-700 hover:shadow-lg md:gap-2"
      onMouseDown={() => setSwiping(false)}
      onMouseMove={() => setSwiping(true)}
      onMouseUp={(e) => {
        if (!isSwiping && e.button === 0) {
          onPress();
        }
        setSwiping(false);
      }}
      onTouchStart={() => setSwiping(false)}
      onTouchMove={() => setSwiping(true)}
      onTouchEnd={(e) => {
        if (e.cancelable) e.preventDefault();
        if (!isSwiping) {
          onPress();
        }
        setSwiping(false);
      }}
    >
      <div className="grid w-full grid-cols-[auto_1fr_68px] pl-1">
        <div className="col-span-2 p-1 font-bold uppercase tracking-wide">
          {name} {group ? `- ${group}` : ""}
        </div>
        <div className="justify-self-center">
          {isGoing && (
            <div className="rounded-tr-md bg-green-700 p-1 px-2 font-bold tracking-wide text-white">
              GOING
            </div>
          )}
        </div>

        <div className="p-1 font-bold tracking-wide text-neutral-600">
          {time}
        </div>
        <div className="p-1">{details}</div>
        <div className="flex flex-row items-center justify-center gap-1 p-1">
          <Image
            src="/static/images/biking-neutral-500-64.png"
            width={16}
            height={16}
            alt="Number of riders"
          />
          <span className="text-xl font-bold">{riderCount}</span>
        </div>
      </div>
    </div>
  );
};

export const CardSkeleton = () => (
  <div className="md:mx-autotext-neutral-500 box-border flex w-full cursor-pointer gap-2 rounded bg-white shadow-md hover:text-neutral-700 hover:shadow-lg md:gap-2">
    <div className="grid w-full grid-cols-[auto_1fr_68px] pl-1">
      <div className="col-span-2 p-1 font-bold uppercase tracking-wide">
        <Skeleton />
      </div>
      <div className="justify-self-center" />

      <div className="p-1 font-bold tracking-wide text-neutral-600">00:00</div>
      <div className="p-1">
        <Skeleton />{" "}
      </div>
      <div className="flex flex-row items-center justify-center gap-1 p-1">
        <Image
          src="/static/images/biking-neutral-500-64.png"
          width={16}
          height={16}
          alt="Number of riders"
        />
        <span className="text-xl font-bold">0</span>
      </div>
    </div>
  </div>
);
