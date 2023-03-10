import Link from "next/link";
import { useRouter } from "next/router";
import { signOut } from "next-auth/react";
import { useState, useRef } from "react";
import { useSWRConfig } from "swr";
import useOnClickOutside from "use-onclickoutside";
import copy from "copy-to-clipboard";
import { Confirm } from "./Confirm";
import { deleteRide } from "../hooks";
import {
  BarsIcon,
  CalendarIcon,
  CopyIcon,
  DeleteIcon,
  EditIcon,
  LinkIcon,
  LogoutIcon,
  PlusIcon,
  SettingsIcon,
} from "./Icon";
import pkg from "../../package.json";

type MenuProps = {
  role: string | null;
  rideId?: string | string[];
  isHistoric: boolean;
};

export const UserMenu = ({ role, rideId, isHistoric }: MenuProps) => {
  const ref = useRef(null);
  const [show, setShow] = useState<boolean>(false);
  const [showConfirm, setShowConfirm] = useState<boolean>(false);
  const isLeader = role && ["ADMIN", "LEADER"].includes(role);
  const showEditAndDelete = isLeader && rideId && !isHistoric;
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

  const copyLink = () => copy(window.location.href);

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

  useOnClickOutside(ref, closeMenu);

  return (
    <div ref={ref} className="relative">
      <div className="h-10 cursor-pointer rounded p-1 text-3xl md:hover:bg-slate-200">
        <button
          type="button"
          aria-label="Menu"
          onClick={toggleMenu}
          onKeyDown={toggleMenu}
        >
          <BarsIcon className="fill-white sm:fill-neutral-700 w-6 h-6" />
        </button>
      </div>

      {show && (
        <div className="absolute right-0 top-12 grid w-48 grid-cols-1 rounded bg-white text-neutral-700 shadow-xl">
          <Link href="/ride/planner">
            <div className="cursor-pointer border-b-[1px] border-b-neutral-100 p-2 hover:bg-neutral-200 hover:text-neutral-900">
              <button
                type="button"
                className="items-centert grid w-full grid-cols-[20px_1fr] items-center gap-2"
                onClick={closeMenu}
              >
                <CalendarIcon className="fill-neutral-700" />
                <span className="justify-self-start">Calendar</span>
              </button>
            </div>
          </Link>

          {isLeader && (
            <Link href="/ride/new">
              <div className="cursor-pointer border-b-[1px] border-b-neutral-100 p-2 hover:bg-neutral-200 hover:text-neutral-900">
                <button
                  type="button"
                  className="items-centert grid w-full grid-cols-[20px_1fr] items-center gap-2"
                  onClick={closeMenu}
                >
                  <PlusIcon className="fill-neutral-700" />
                  <span className="justify-self-start">Add Ride</span>
                </button>
              </div>
            </Link>
          )}

          {isLeader && rideId && (
            <Link href={`/ride/${rideId}/copy`}>
              <div className="cursor-pointer border-b-[1px] border-b-neutral-100 p-2 hover:bg-neutral-200 hover:text-neutral-900">
                <button
                  type="button"
                  className="items-centert grid w-full grid-cols-[20px_1fr] items-center gap-2"
                  onClick={closeMenu}
                >
                  <CopyIcon className="fill-neutral-700" />
                  <span className="justify-self-start">Copy Ride</span>
                </button>
              </div>
            </Link>
          )}

          {showEditAndDelete && (
            <>
              <Link href={`/ride/${rideId}/edit`}>
                <div className="cursor-pointer border-b-[1px] border-b-neutral-100 p-2 hover:bg-neutral-200 hover:text-neutral-900">
                  <button
                    type="button"
                    className="items-centert grid w-full grid-cols-[20px_1fr] items-center gap-2"
                    onClick={closeMenu}
                  >
                    <EditIcon className="fill-neutral-700" />
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
                  <DeleteIcon className="fill-neutral-700" />
                  <span className="justify-self-start">Delete Ride</span>
                </button>
              </div>

              <div className="cursor-pointer border-b-[1px] border-b-neutral-100 p-2 hover:bg-neutral-200 hover:text-neutral-900">
                <button
                  type="button"
                  className="items-centert grid w-full grid-cols-[20px_1fr] items-center gap-2"
                  onClick={copyLink}
                >
                  <LinkIcon className="fill-neutral-700" />
                  <span className="justify-self-start">Copy Ride Link</span>
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
                <SettingsIcon className="fill-neutral-700" />
                <span className="justify-self-start">Settings</span>
              </button>
            </div>
          </Link>

          <button
            type="button"
            className="items-centert grid w-full grid-cols-[20px_1fr] items-center gap-2 border-b-[1px] border-b-neutral-100 p-2 hover:bg-neutral-200 hover:text-neutral-900 "
            onClick={handleSignout}
          >
            <LogoutIcon className="fill-neutral-700" />
            <span className="justify-self-start">Log out</span>
          </button>

          <div className="flex h-6 items-center justify-between px-2 pl-2 text-xs text-neutral-400">
            Version {pkg.version}
            <a
              href="https://github.com/airburst/bcc/blob/main/CHANGELOG.md"
              title="Release notes"
              target="_blank"
              rel="noreferrer"
              className="text-xs text-blue-500 underline"
            >
              Notes
            </a>
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
