import Image from "next/future/image";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import {
  ArchiveActiveIcon,
  ArchiveInactiveIcon,
  EditActiveIcon,
  EditInactiveIcon,
  DuplicateActiveIcon,
  DuplicateInactiveIcon,
  DeleteActiveIcon,
  DeleteInactiveIcon,
} from "./Icons";
import HamburgerIcon from "../../../public/static/images/hamburger-50.png";

export const UserMenu2 = () => (
  <div className="cursor-pointer rounded p-1 hover:bg-neutral-200">
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="">
          <Image
            src={HamburgerIcon}
            width={32}
            height={32}
            alt="Click to open user menu"
          />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-1 py-1 ">
            <Menu.Item>
              {({ active }) => (
                <button
                  type="button"
                  className="group
                     flex w-full items-center rounded-md px-2 py-2 text-sm text-gray-900 hover:bg-neutral-200"
                >
                  {active ? (
                    <EditActiveIcon className="mr-2 h-5 w-5" />
                  ) : (
                    <EditInactiveIcon className="mr-2 h-5 w-5" />
                  )}
                  Edit
                </button>
              )}
            </Menu.Item>
          </div>
          <div className="px-1 py-1 ">
            <Menu.Item>
              {({ active }) => (
                <button
                  type="button"
                  className="group flex w-full items-center rounded-md px-2 py-2 text-sm text-gray-900"
                >
                  {active ? (
                    <DuplicateActiveIcon className="mr-2 h-5 w-5" />
                  ) : (
                    <DuplicateInactiveIcon className="mr-2 h-5 w-5" />
                  )}
                  Duplicate
                </button>
              )}
            </Menu.Item>
          </div>
          <div className="px-1 py-1">
            <Menu.Item>
              {({ active }) => (
                <button
                  type="button"
                  className="group flex w-full items-center rounded-md px-2 py-2 text-sm text-gray-900"
                >
                  {active ? (
                    <ArchiveActiveIcon className="mr-2 h-5 w-5" />
                  ) : (
                    <ArchiveInactiveIcon className="mr-2 h-5 w-5" />
                  )}
                  Archive
                </button>
              )}
            </Menu.Item>
          </div>
          <div className="px-1 py-1">
            <Menu.Item>
              {({ active }) => (
                <button
                  type="button"
                  className="group flex w-full items-center rounded-md px-2 py-2 text-sm text-gray-900"
                >
                  {active ? (
                    <DeleteActiveIcon className="mr-2 h-5 w-5 text-violet-400" />
                  ) : (
                    <DeleteInactiveIcon className="mr-2 h-5 w-5 text-violet-400" />
                  )}
                  Delete
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  </div>
);
