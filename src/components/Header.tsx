import { useSession, signIn } from "next-auth/react";
import Router, { useRouter } from "next/router";
import Image from "next/future/image";
import { useAtom } from "jotai";
import { showFilterAtom, filterQueryAtom } from "../store";
import { UserMenu } from "./UserMenu";
import { getNow, flattenQuery } from "../../shared/utils";
import Logo from "../../public/static/images/bath-cc-logo.svg";

type ButtonProps = {
  onClick?: () => void;
  children: string;
};

const LinkButton = ({ children, ...props }: ButtonProps) => (
  <button
    type="button"
    className="flex h-8 border-0 border-b-4 border-b-transparent bg-transparent text-lg hover:border-b-red-500"
    {...props}
  >
    {children}
  </button>
);

const goHome = () => Router.push("/");

export const Header = () => {
  const [, setShowFilterMenu] = useAtom(showFilterAtom);
  const [filterQuery] = useAtom(filterQueryAtom);
  const { status, data: session } = useSession();
  const isAuthenticated = status === "authenticated";
  const role = session?.role as string;
  const router = useRouter();
  const rideId = router.query.id;
  const rideDate = router.query.date;
  const isRidesPage = router.pathname === "/";
  const isHistoric = flattenQuery(rideDate) < getNow();

  const showFilters = () => setShowFilterMenu(true);

  const hasFiltersApplied = !!(filterQuery.onlyJoined || filterQuery.q);

  return (
    <div className="fixed z-10 flex h-16 w-full items-center justify-center bg-blue-900  text-white sm:h-24 md:bg-slate-100 md:text-neutral-700">
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
                <i className="fa-solid fa-filter-circle-xmark" />
              ) : (
                <i className="fa-solid fa-filter" />
              )}
            </button>
          )}

          {isAuthenticated ? (
            <UserMenu role={role} rideId={rideId} isHistoric={isHistoric} />
          ) : (
            <LinkButton onClick={() => signIn("auth0")}>Log in</LinkButton>
          )}
        </div>
      </div>
    </div>
  );
};
