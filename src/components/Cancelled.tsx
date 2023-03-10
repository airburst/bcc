import clsx from "clsx";
import { CircleExclamationIcon } from "./Icon";

type Props = {
  cancelled: boolean;
  position?: "top" | "bottom";
};

export const Cancelled = ({ cancelled, position = "top" }: Props) => {
  const classes = clsx(
    "absolute",
    { "bottom-0": position === "bottom" },
    "m-1 badge badge-error rounded gap-2 uppercase py-4"
  );
  return cancelled ? (
    <div className={classes}>
      <CircleExclamationIcon className="fill-white" />
      Cancelled
    </div>
  ) : null;
};
