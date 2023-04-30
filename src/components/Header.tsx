import Router, { useRouter } from "next/router";
import Image from "next/image";
import { useAtom } from "jotai";
import { showFilterAtom, filterQueryAtom } from "../store";
import { UserMenu } from "./UserMenu";
import { getNow, flattenQuery } from "../../shared/utils";
import Logo from "../../public/static/images/bath-cc-logo.svg";
import { FilterIcon, FilterSelectedIcon } from "./Icon";

const goHome = () => Router.push("/");

type Props = {
  isAuthenticated: boolean;
  role: string;
};

export const Header = ({ isAuthenticated, role }: Props) => {
  const [, setShowFilterMenu] = useAtom(showFilterAtom);
  const [filterQuery] = useAtom(filterQueryAtom);
  const router = useRouter();
  const rideId = router.query.id;
  const rideDate = router.query.date;
  const isRidesPage = router.pathname === "/";
  const isHistoric = flattenQuery(rideDate) < getNow();

  const showFilters = () => setShowFilterMenu(true);

  const hasFiltersApplied = !!(filterQuery.onlyJoined || filterQuery.q);

  return (
    <div className="fixed -mt-16 sm:-mt-24 z-10 flex h-16 w-full items-center justify-center bg-blue-900  text-white sm:h-24 md:bg-slate-100 md:text-neutral-700">
      <div className="container flex w-full flex-row justify-between px-2 md:px-4 lg:max-w-[1024px]">
        <div className=" text-4xl tracking-wide sm:text-5xl">
          <button
            type="button"
            onClick={goHome}
            title="Home"
            aria-label="Back to rides page"
            className="flex items-center gap-4"
          >
            <Image
              className="hidden h-[64px] w-[64px] sm:block"
              src={Logo}
              alt="Bath Cycling Club Logo"
            />
            BCC Rides
          </button>
        </div>

        <div className="flex items-center gap-4">
          {isRidesPage && (
            <button
              type="button"
              onClick={showFilters}
              title="Filter results"
              aria-label="Filter results"
              className="flex items-center rounded p-1 text-3xl md:hover:bg-slate-200"
            >
              {hasFiltersApplied ? (
                <FilterSelectedIcon className="fill-white sm:fill-neutral-700 w-6 h-6" />
              ) : (
                <FilterIcon className="fill-white sm:fill-neutral-700 w-6 h-6" />
              )}
            </button>
          )}

          <UserMenu
            isAuthenticated={isAuthenticated}
            role={role}
            rideId={rideId}
            isHistoric={isHistoric}
          />
        </div>
      </div>
    </div>
  );
};
