import clsx from "clsx";
import { CircleExclamationIcon } from "./Icon";

type Props = {
  cancelled: boolean;
  position?: "top" | "bottom";
};

export const Cancelled = ({ cancelled, position = "top" }: Props) => {
  const classes = clsx(
    "absolute w-full opacity-90 text-xl",
    { "bottom-0": position === "bottom" },
    "badge badge-error rounded gap-4 uppercase py-4"
  );
  return cancelled ? (
    <div className={classes}>
      <CircleExclamationIcon className="fill-white" />
      This ride is Cancelled
      <CircleExclamationIcon className="fill-white" />
    </div>
  ) : null;
};
