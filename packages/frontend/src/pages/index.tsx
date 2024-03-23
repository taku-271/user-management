import { Box, Button, Heading } from "@yamada-ui/react";
import { signOut, useSession } from "next-auth/react";
import Head from "next/head";

const Index = () => {
  const { data: session } = useSession();

  return (
    <>
      <Head>
        <title>ユーザー認証</title>
        <meta name="description" content="ユーザー認証認可" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
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
        <Button variant="outline" colorScheme="gray" onClick={() => signOut()}>
          サインアウト
        </Button>
      </main>
    </>
  );
};

export default Index;
