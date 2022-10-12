import Link from "next/link";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import Image from "next/future/image";
import { UserMenu } from "./UserMenu";
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

export const Header = () => {
  const { status, data: session } = useSession();
  const isAuthenticated = status === "authenticated";
  const role = session?.role as string;
  const router = useRouter();
  const rideId = router.query.id;

  return (
    <div className="fixed z-10 flex h-16 w-full items-center justify-center bg-neutral-100 text-neutral-700 sm:h-24">
      <div className="container flex w-full flex-row justify-between px-2 md:px-4 lg:max-w-[1024px]">
        <div className="flex cursor-pointer items-center gap-4 text-4xl font-bold tracking-wide sm:text-5xl">
          <Link href="/" title="Home">
            <>
              <Image
                className="hidden h-[64px] w-[64px] sm:block"
                src={Logo}
                alt="Bath Cycling Club Logo"
              />
              BCC Rides
            </>
          </Link>
        </div>
        <div className="flex items-center">
          {isAuthenticated ? (
            <UserMenu role={role} rideId={rideId} />
          ) : (
            <LinkButton onClick={() => signIn("auth0")}>Log in</LinkButton>
          )}
        </div>
      </div>
    </div>
  );
};
