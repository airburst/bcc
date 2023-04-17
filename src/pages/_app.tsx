/* eslint-disable react/prop-types */
import type { AppType } from "next/app";
import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { Layout } from "../components/Layout";
import { LayoutEmbedded } from "../components/LayoutEmbedded";

import "../styles/globals.css";

const App: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
  router,
}) => {
  if (router.pathname.startsWith("/embed")) {
    return (
      <LayoutEmbedded>
        <Component {...pageProps} />
      </LayoutEmbedded>
    );
  }

  return (
    <SessionProvider session={session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
};

export default App;
