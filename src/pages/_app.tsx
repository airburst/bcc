/* eslint-disable react/prop-types */
import type { AppType } from "next/app";
import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { Outfit } from "next/font/google";
import { Layout, LayoutEmbedded, ErrorBoundary } from "../components";

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
          <ErrorBoundary>
            <Component {...pageProps} />
          </ErrorBoundary>
        </LayoutEmbedded>
      </div>
    );
  }

  return (
    <SessionProvider session={session}>
      <div className={`${outfit.variable} font-sans`}>
        <Layout>
          <ErrorBoundary>
            <Component {...pageProps} />
          </ErrorBoundary>
        </Layout>
      </div>
      <style>{`
        :root {
          --font-outfit: __Outfit_a14fc5, __Outfit_Fallback_a14fc5
        }
      `}</style>
    </SessionProvider>
  );
};

export default App;
