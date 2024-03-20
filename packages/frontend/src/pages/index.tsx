import { Heading } from "@yamada-ui/react";
import Head from "next/head";

const Index = () => {
  return (
    <>
      <Head>
        <title>ユーザー認証</title>
        <meta name="description" content="ユーザー認証認可" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        <Heading as="h1" size="4xl">
          Hello World!
        </Heading>
      </main>
    </>
  );
};

export default Index;
