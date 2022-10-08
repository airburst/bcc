import Link from 'next/link';
import { useSession, signIn, signOut } from "next-auth/react"
import Image from "next/future/image";
import Logo from "public/static/images/bath-cc-logo.svg"

type ButtonProps = {
  onClick?: () => void;
  children: string;
}

// TODO: Replace logout button with a hamburger menu
const LinkButton = ({ children, ...props }: ButtonProps) => (
  <button className="flex h-8 bg-transparent text-lg border-0 border-b-4 border-b-transparent hover:border-b-red-500" {...props}>
    {children}
  </button>
)

export const Header = () => {
  const { status } = useSession();
  const isAuthenticated = status === "authenticated";

  return (
    <div className="fixed flex items-center justify-center w-full h-16 sm:h-24 bg-neutral-100 text-neutral-500 z-10">
      <div className="container lg:max-w-[1024px] flex flex-row justify-between w-full px-2 md:px-4" >
        <div className="flex items-center gap-4 text-4xl sm:text-5xl font-bold cursor-pointer tracking-wide">
          <Link href="/" title="Home">
            <>
              <Image className="hidden sm:block w-[64px] h-[64px]" src={Logo} alt="Bath Cycling Club Logo" />
              BCC Rides
            </>
          </Link>
        </div>
        <div className="flex items-center" >
          {
            isAuthenticated
              ? (
                <LinkButton onClick={() => signOut({ callbackUrl: "http://localhost:3000" })}>Log out</LinkButton>
              )
              : (
                <LinkButton onClick={() => signIn("auth0")}>Log in</LinkButton>
              )
          }
        </div>
      </div >
    </div>
  );
};
