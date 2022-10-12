import Image from "next/future/image";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { useState } from "react";
import HamburgerIcon from "../../public/static/images/hamburger-50.png";
// import { User } from "../types";

type MenuProps = {
  // user: User | null;
  role: string | null;
  rideId?: string | string[];
};

export const UserMenu = ({ role, rideId }: MenuProps) => {
  const [show, setShow] = useState<boolean>(false);
  const isLeader = role && ["ADMIN", "LEADER"].includes(role);

  const toggleMenu = () => setShow(!show);

  const closeMenu = () => setShow(false);

  const handleSignout = () => {
    signOut({ callbackUrl: "http://localhost:3000" });
    closeMenu();
  };

  return (
    <div className="relative">
      <div className="cursor-pointer rounded p-1 hover:bg-neutral-200">
        <button type="button" onClick={toggleMenu} onKeyDown={toggleMenu}>
          <Image
            src={HamburgerIcon}
            width={32}
            height={32}
            alt="Click to open user menu"
          />
        </button>
      </div>

      {show && (
        <div className="absolute right-0 top-12 grid w-48 grid-cols-1 rounded bg-white shadow-lg">
          {isLeader && (
            <Link href="/ride/new">
              <button
                type="button"
                className="flex w-full justify-self-start border-b-[1px] border-b-neutral-100 p-2 hover:bg-neutral-200 hover:text-neutral-900"
                onClick={closeMenu}
              >
                Add Ride
              </button>
            </Link>
          )}

          {isLeader && rideId && (
            <>
              <Link href={`/ride/${rideId}/edit`}>
                <button
                  type="button"
                  className="flex w-full justify-self-start border-b-[1px] border-b-neutral-100 p-2 hover:bg-neutral-200 hover:text-neutral-900"
                  onClick={closeMenu}
                >
                  Edit Ride
                </button>
              </Link>
              <Link href={`/ride/${rideId}/delete`}>
                <button
                  type="button"
                  className="flex w-full justify-self-start border-b-[1px] border-b-neutral-100 p-2 hover:bg-neutral-200 hover:text-neutral-900"
                  onClick={closeMenu}
                >
                  Delete Ride
                </button>
              </Link>
            </>
          )}

          <button
            type="button"
            className="flex border-0 border-b-4 border-b-transparent bg-transparent p-2 hover:bg-neutral-200 hover:text-neutral-900"
            onClick={handleSignout}
          >
            Log out
          </button>
        </div>
      )}
    </div>
  );
};
