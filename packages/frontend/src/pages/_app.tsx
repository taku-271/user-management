import { Header } from "@/features/headers";
import { client } from "@/libs/graphql-client";
import { ApolloProvider } from "@apollo/client";
import { Box, UIProvider } from "@yamada-ui/react";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <ApolloProvider client={client}>
        <UIProvider>
          <Box height="100vh">
            <Header height="8%" />
            <Box display="flex" justifyContent="center" height="92%">
              <Component {...pageProps} />
            </Box>
          </Box>
        </UIProvider>
      </ApolloProvider>
    </SessionProvider>
  );
}
