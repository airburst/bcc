import { User } from "../../types";

type Props = {
  user?: User;
  isGoingAnonymously?: boolean;
};

export const RidersGoing = ({ user, isGoingAnonymously }: Props) => {
  console.log(
    "🚀 ~ file: RideNotes.tsx ~ line 9 ~ RidersGoing ~ isGoingAnonymously",
    isGoingAnonymously
  );
  console.log("🚀 ~ file: RideNotes.tsx ~ line 9 ~ RidersGoing ~ user", user);

  return <div className="flex w-full px-2 sm:px-0">NOTES</div>;
};
