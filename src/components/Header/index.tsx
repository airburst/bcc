import Link from 'next/link';
import { useSession, signIn, signOut } from "next-auth/react"
import Image from "next/future/image";
import Logo from "public/static/images/bath-cc-logo.svg"
import styles from "./Header.module.css";

export const Header = () => {
  const { status } = useSession();
  // const { data: session, status } = useSession();
  const isAuthenticated = status === "authenticated";

  return (
    <div className={styles.container}>
      <div className={styles.inner}>
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
