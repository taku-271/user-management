import {
  Box,
  Text,
  Button,
  FormControl,
  Input,
  Heading,
  Loading,
} from "@yamada-ui/react";
import { GetServerSideProps } from "next";
import { getCsrfToken, useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";

type SignInProps = {
  csrfToken?: string;
};

const SignIn = ({ csrfToken }: SignInProps) => {
  const router = useRouter();
  const { error } = router.query;
  const { data: session, status } = useSession();
  const callbackUrl = useSearchParams().get("callbackUrl");

  if (session?.user) {
    router.push(callbackUrl || "/");
  }

  return status === "loading" ? (
    <Loading size="9xl" />
  ) : (
    <Box
      h="50%"
      w="75%"
      border="1px solid"
      borderColor="gray.50"
      padding="4xl"
      borderRadius="2xl"
      display="flex"
      alignItems="center"
    >
      <Box flexGrow="1">
        <form method="post" action="/api/auth/callback/credentials">
          <Input name="csrfToken" type="hidden" defaultValue={csrfToken} />
          <Heading as="h1" mb="lg">
            ログイン
          </Heading>
          <FormControl label="メールアドレス" mb="md">
            <Input
              name="email"
              type="email"
              variant="flushed"
              autoComplete="email"
            />
          </FormControl>
          <FormControl label="パスワード" mb="md">
            <Input
              name="password"
              type="password"
              variant="flushed"
              autoComplete="current-password"
            />
          </FormControl>
          <Box display="flex" justifyContent="space-between">
            <Button type="submit" mb="md" colorScheme="primary" variant="solid">
              ログイン
            </Button>
            <Button
              type="button"
              mb="md"
              colorScheme="primary"
              variant="outline"
              onClick={() => router.push("/auth/signup")}
            >
              新規登録
            </Button>
          </Box>
          {error && (
            <Box>
              <Text color="red">
                メールアドレスまたはパスワードが間違っています。
              </Text>
            </Box>
          )}
        </form>
      </Box>
    </Box>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
};

export default SignIn;
