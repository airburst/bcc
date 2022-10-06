import { useState } from "react";
import type { AppType } from "next/app";
import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { Hydrate, DehydratedState, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Layout } from '../components/Layout';

import "../styles/globals.css";
import "@fontsource/prompt/400.css";
import "@fontsource/prompt/500.css";
import "@fontsource/prompt/700.css";

const MyApp: AppType<{ session: Session | null, dehydratedState: DehydratedState | null }> = ({
  Component,
  pageProps: { session, dehydratedState, ...pageProps },
}) => {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={dehydratedState}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Hydrate>
      </QueryClientProvider>
    </SessionProvider>
  );
};

export default MyApp;
