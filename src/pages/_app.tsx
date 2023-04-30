/* eslint-disable react/prop-types */
import type { AppType } from "next/app";
import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { Outfit } from "next/font/google";
import { Layout } from "../components/Layout";
import { LayoutEmbedded } from "../components/LayoutEmbedded";

import "../styles/globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

const App: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
  router,
}) => {
  if (router.pathname.startsWith("/embed")) {
    return (
      <div className={`${outfit.variable} font-sans`}>
        <LayoutEmbedded>
          <Component {...pageProps} />
        </LayoutEmbedded>
      </div>
    );
  }

  return (
    <SessionProvider session={session}>
      <div className={`${outfit.variable} font-sans`}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </div>
    </SessionProvider>
  );
};

export default App;
