// import { useAuth0 } from "@auth0/auth0-react";
import Link from 'next/link';
import Image from "next/future/image";
import Logo from "public/static/images/bath-cc-logo.svg"
import styles from "./Header.module.css";

export const Header = () => {
  // const { loginWithRedirect, isAuthenticated, logout } = useAuth0();
  const isAuthenticated = false; // FIXME:

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
              <button className={styles.loginBtn} onClick={() => console.log("LOGOUT")}>Log out</button>
            </div>
          )
          : (
            <div className={styles.right} >
              <button className={styles.loginBtn} onClick={() => console.log("LOGIN")}>Log in</button>
            </div>
          )
        }
      </div>
    </div>
  );
};
