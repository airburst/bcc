/* eslint-disable react/prop-types */
import type { AppType } from "next/app";
import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { Layout } from "../components/Layout";

import "@fontsource/prompt/400.css";
import "@fontsource/prompt/500.css";
import "@fontsource/prompt/700.css";
import "../styles/globals.css";

const App: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => (
  <SessionProvider session={session}>
    <Layout>
      <Component {...pageProps} />
    </Layout>
  </SessionProvider>
);

export default App;
