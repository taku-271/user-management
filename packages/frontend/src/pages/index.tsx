import { Box, Button, Heading, Loading } from "@yamada-ui/react";
import { signOut, useSession } from "next-auth/react";
import Head from "next/head";

const Index = () => {
  const { data: session, status } = useSession();

  return (
    <>
      <Head>
        <title>ユーザー認証</title>
        <meta name="description" content="ユーザー認証" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        {status === "loading" ? (
          <Loading size="9xl" />
        ) : (
          <Box>
            <Heading as="h1" size="4xl">
              Hello {session?.user?.name}!
            </Heading>
            <Box>
              <Button
                onClick={() => {
                  location.href = "http://localhost:3002/";
                }}
              >
                家計簿アプリ
              </Button>
            </Box>
          </Box>
        )}
      </main>
    </>
  );
};

export default Index;
