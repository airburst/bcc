import { useState } from "react";
import { Switch } from "@headlessui/react";
import clsx from "clsx";
import { User } from "../types";

type Props = {
  user: User;
  isLeader: boolean;
};

export const RiderDetails = ({ user, isLeader }: Props) => {
  const [showEmergency, setShowEmergency] = useState<boolean>(false);
  const { id: userId, name: userName, mobile, emergency } = user;

  const switchClass = clsx(
    "relative inline-flex h-6 w-11 items-center rounded-full",
    showEmergency ? "bg-red-600" : "bg-gray-200"
  );

  const toggleClass = clsx(
    "inline-block h-4 w-4 transform rounded-full bg-white transition",
    showEmergency ? "translate-x-6" : "translate-x-1"
  );

  return (
    <div
      className="flex w-full flex-row items-center justify-between px-2 font-medium md:grid md:grid-cols-[220px_1fr] md:justify-start md:gap-4"
      key={userId}
    >
      <div>{userName}</div>

      {isLeader && (
        <div className="flex flex-row items-end gap-2 md:justify-between">
          {!showEmergency && (
            <div className="flex items-center gap-2">
              {mobile && <i className="fa-solid fa-phone" />}
              <span>{mobile}</span>
            </div>
          )}
          {showEmergency && (
            <div className="flex items-center gap-2 truncate text-red-700">
              {emergency && <i className="fa-solid fa-phone" />}
              <span>{emergency}</span>
            </div>
          )}

          <Switch
            checked={showEmergency}
            onChange={setShowEmergency}
            className={switchClass}
          >
            <span className="sr-only">Enable notifications</span>
            <span className={toggleClass} />
          </Switch>
        </div>
      )}
    </div>
  );
};
