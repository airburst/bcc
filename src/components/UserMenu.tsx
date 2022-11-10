import Image from "next/future/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { signOut } from "next-auth/react";
import { useState } from "react";
import { useSWRConfig } from "swr";
import HamburgerIcon from "../../public/static/images/hamburger-50.png";
import { Confirm } from "./Confirm";
import { deleteRide, useClickOutside } from "../hooks";
import pkg from "../../package.json";

type MenuProps = {
  // user: User | null;
  role: string | null;
  rideId?: string | string[];
};

export const UserMenu = ({ role, rideId }: MenuProps) => {
  const [show, setShow] = useState<boolean>(false);
  const [showConfirm, setShowConfirm] = useState<boolean>(false);
  const isLeader = role && ["ADMIN", "LEADER"].includes(role);
  const router = useRouter();
  const { mutate } = useSWRConfig();

  const toggleMenu = () => {
    setShow(!show);
    if (show) {
      setShowConfirm(false);
    }
  };

  const closeMenu = () => {
    setShow(false);
    setShowConfirm(false);
  };

  const handleSignout = () => {
    signOut({ callbackUrl: "http://localhost:3000" });
    closeMenu();
  };

  const handleDelete = async (cb: (flag: boolean) => void) => {
    if (rideId) {
      mutate("/api/ride", async () => {
        const results = await deleteRide(rideId);
        if (results.id) {
          closeMenu();
          router.back();
          cb(true);
        } else {
          cb(false);
        }
      });
    } else {
      cb(false);
    }
  };

  const confirmDelete = () => setShowConfirm(true);

  const ref = useClickOutside(closeMenu);

  return (
    <div className="relative">
      <div className="h-10 cursor-pointer rounded p-1 hover:bg-neutral-200">
        <button
          ref={ref}
          type="button"
          onClick={toggleMenu}
          onKeyDown={toggleMenu}
        >
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
            <>
              <Link href="/ride/new">
                <div className="cursor-pointer border-b-[1px] border-b-neutral-100 p-2 hover:bg-neutral-200 hover:text-neutral-900">
                  <button
                    type="button"
                    className="items-centert grid w-full grid-cols-[20px_1fr] items-center gap-2"
                    onClick={closeMenu}
                  >
                    <i className="fa-solid fa-plus" />
                    <span className="justify-self-start">Add Ride</span>
                  </button>
                </div>
              </Link>

              <Link href="/ride/planner">
                <div className="cursor-pointer border-b-[1px] border-b-neutral-100 p-2 hover:bg-neutral-200 hover:text-neutral-900">
                  <button
                    type="button"
                    className="items-centert grid w-full grid-cols-[20px_1fr] items-center gap-2"
                    onClick={closeMenu}
                  >
                    <i className="fa-regular fa-calendar" />
                    <span className="justify-self-start">Calendar</span>
                  </button>
                </div>
              </Link>
            </>
          )}

          {isLeader && rideId && (
            <>
              <Link href={`/ride/${rideId}/edit`}>
                <div className="cursor-pointer border-b-[1px] border-b-neutral-100 p-2 hover:bg-neutral-200 hover:text-neutral-900">
                  <button
                    type="button"
                    className="items-centert grid w-full grid-cols-[20px_1fr] items-center gap-2"
                    onClick={closeMenu}
                  >
                    <i className="fa-solid fa-pen-to-square" />
                    <span className="justify-self-start">Edit Ride</span>
                  </button>
                </div>
              </Link>

              <div className="cursor-pointer border-b-[1px] border-b-neutral-100 p-2 hover:bg-neutral-200 hover:text-neutral-900">
                <button
                  type="button"
                  className="items-centert grid w-full grid-cols-[20px_1fr] items-center gap-2"
                  onClick={confirmDelete}
                >
                  <i className="fa-solid fa-trash" />
                  <span className="justify-self-start">Delete Ride</span>
                </button>
              </div>
            </>
          )}

          <Link href="/profile">
            <div className="cursor-pointer border-b-[1px] border-b-neutral-100 p-2 hover:bg-neutral-200 hover:text-neutral-900">
              <button
                type="button"
                className="items-centert grid w-full grid-cols-[20px_1fr] items-center gap-2"
                onClick={closeMenu}
              >
                <i className="fa-solid fa-user" />
                <span className="justify-self-start">Profile</span>
              </button>
            </div>
          </Link>

          <button
            type="button"
            className="items-centert grid w-full grid-cols-[20px_1fr] items-center gap-2 border-b-[1px] border-b-neutral-100 p-2 hover:bg-neutral-200 hover:text-neutral-900 "
            onClick={handleSignout}
          >
            <i className="fa-solid fa-right-from-bracket" />
            <span className="justify-self-start">Log out</span>
          </button>

          <div className="flex h-6 items-center pl-2 text-xs text-neutral-400">
            Version {pkg.version}
          </div>
        </div>
      )}

      <Confirm
        open={showConfirm}
        closeHandler={closeMenu}
        heading="Are you sure you want to delete this ride?"
        onYes={(callback) => handleDelete(callback)}
      />
    </div>
  );
};
