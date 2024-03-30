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
          <Box
            height="100vh"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Component {...pageProps} />
          </Box>
        </UIProvider>
      </ApolloProvider>
    </SessionProvider>
  );
}
