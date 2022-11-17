/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable prettier/prettier */
import { useState, Fragment, useEffect, ChangeEvent } from "react";
import { Transition, Switch, Combobox } from "@headlessui/react";
import clsx from "clsx";
import { Button } from "./Button";
import { FilterQuery } from "../types";

type Props = {
  isShowing: boolean;
  closeHandler: () => void;
  data: string[];
  queryHandler: (q: FilterQuery) => void;
};

// TODO: use click outside to close

export const Filters = ({
  isShowing,
  closeHandler,
  queryHandler,
  data,
}: Props) => {
  const [onlyJoined, setOnlyJoined] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [query, setQuery] = useState<FilterQuery>({});

  useEffect(() => {
    queryHandler(query);
  }, [query, queryHandler]);

  const handleSwitchChange = () => {
    setOnlyJoined(!onlyJoined);
    setQuery({ ...query, onlyJoined: !query.onlyJoined });
  };
  const switchClass = clsx(
    "relative inline-flex h-6 w-11 items-center rounded-full",
    onlyJoined ? "bg-green-600" : "bg-gray-200"
  );
  const toggleClass = clsx(
    "inline-block h-4 w-4 transform rounded-full bg-white transition",
    onlyJoined ? "translate-x-6" : "translate-x-1"
  );

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSelected = (q: string) => {
    setQuery({ ...query, q });
    setSearch(q);
  };

  const reset = () => {
    setOnlyJoined(false);
    setSearch("");
    setQuery({ onlyJoined: false });
  };

  const filteredData =
    search === ""
      ? data
      : data.filter((item) =>
        item
          .toLowerCase()
          .replace(/\s+/g, "")
          .includes(search.toLowerCase().replace(/\s+/g, ""))
      );

  return (
    <Transition
      show={isShowing}
      enter="transition ease-in-out duration-200 transform"
      enterFrom="-translate-y-full"
      enterTo="-translate-y-0"
      leave="transition ease-in-out duration-200 transform"
      leaveFrom="-translate-y-0"
      leaveTo="-translate-y-full"
      className="fixed z-10 h-64 w-full bg-neutral-900 text-white shadow-xl "
    >
      <div className="container mx-auto flex w-full flex-col p-4 md:px-4 lg:max-w-[1024px]">
        <div className="flex flex-row justify-between">
          <div className="text-3xl">Filters</div>
          <button
            type="button"
            onClick={closeHandler}
            title="Close filters"
            className="flex items-center rounded p-1 text-3xl md:hover:bg-slate-200"
          >
            <i className="fa-solid fa-close" />
          </button>
        </div>

        <div className="my-4 flex flex-row justify-between">
          <div>Only show my rides</div>
          <Switch
            checked={onlyJoined}
            onChange={handleSwitchChange}
            className={switchClass}
          >
            <span className="sr-only">Enable notifications</span>
            <span className={toggleClass} />
          </Switch>
        </div>

        <div>Search</div>
        <div className="flex flex-col gap-4 md:gap-8">
          <Combobox value={search} onChange={handleSelected}>
            <div className="relative mt-1">
              <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                <Combobox.Input
                  className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
                  // @ts-ignore
                  displayValue={(item) => item}
                  onChange={handleSearchChange}
                />
                <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                  <i className="fa-solid fa-chevron-down" />
                </Combobox.Button>
              </div>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {filteredData.length === 0 && query !== "" ? (
                    <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                      Nothing found.
                    </div>
                  ) : (
                    filteredData.map((person) => (
                      <Combobox.Option
                        key={person}
                        className={({ active }) =>
                          `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? "bg-teal-600 text-white" : "text-gray-900"
                          }`
                        }
                        value={person}
                      >
                        {({ selected, active }) => (
                          <>
                            <span
                              className={`block truncate ${selected ? "font-medium" : "font-normal"
                                }`}
                            >
                              {person}
                            </span>
                            {selected ? (
                              <span
                                className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active ? "text-white" : "text-teal-600"
                                  }`}
                              >
                                <i className="fa-solid fa-check" />
                              </span>
                            ) : null}
                          </>
                        )}
                      </Combobox.Option>
                    ))
                  )}
                </Combobox.Options>
              </Transition>
            </div>
          </Combobox>
        </div>

        <div className="mt-6 flex flex-row justify-between">
          <div />
          <Button
            onClick={reset}
            title="Reset filters"
            className="flex items-center rounded p-1 md:hover:bg-slate-200"
          >
            <span>Reset</span>
          </Button>
        </div>
      </div>
    </Transition>
  );
};
