import Link from 'next/link';
import { useSession, signIn, signOut } from "next-auth/react"
import Image from "next/future/image";
import Logo from "public/static/images/bath-cc-logo.svg"
import styles from "./Header.module.css";

export const Header = () => {
  const { status } = useSession();
  const isAuthenticated = status === "authenticated";

  return (
    <div className="container fixed mx-auto flex flex-col items-center justify-center w-full h-16 text-neutral-500">
      <div className="flex flex-row justify-between w-full px-2">
        <div className={styles.left}>
          <Link href="/" title="Home">
            <>
              <Image className={styles.logo} src={Logo} alt="Bath Cycling Club Logo" />
              BCC Rides
            </>
          </Link>
        </div>
        {isAuthenticated
          ? (
            <div className={styles.right} >
              <button className={styles.loginBtn} onClick={() => signOut({ callbackUrl: "http://localhost:3000" })}>Log out</button>
            </div>
          )
          : (
            <div className={styles.right} >
              <button className={styles.loginBtn} onClick={() => signIn("auth0")}>Log in</button>
            </div>
          )
        }
      </div>
    </div>
  );
};

// .left {
//   display: flex;
//   align-items: center;
//   font-size: 2em;
//   font-weight: 700;
//   cursor: pointer;
//   gap: 8px;
// }

// .left > a {
//   display: flex;
//   align-items: center;
//   box-sizing: border-box;
//   color: var(--color-text-mid);
//   text-decoration: none;
//   text-align: left;
// }

// .right {
//   display: flex;
//   align-items: center;
// }

// .logo {
//   display: none;
// }

// .loginBtn {
//   /* height: 48px; */
//   font-size: 1em;
//   color: var(--color-text-lighter);
//   background-color: transparent;
//   border: 0;
//   border-bottom: 3px solid transparent;
//   font-family: var(--font-family);
//   cursor: pointer;
// }

// .loginBtn:hover {
//   color: var(--color-text);
//   border-bottom: 3px solid var(--color-maroon);
// }

// @media (min-width: 620px) {
//   .container {
//     height: 96px;
//   }
//   .left {
//     font-size: 3em;
//   }
//   .loginBtn {
//     font-size: 1.6em;
//   }
//   .logo {
//     display: block;
//     width: 80px;
//     height: 80px;
//     padding-right: 16px;
//   }
// }
