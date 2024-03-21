import { Box, Text, Button, FormControl, Input } from "@yamada-ui/react";
import { GetServerSideProps } from "next";
import { getCsrfToken } from "next-auth/react";
import { useRouter } from "next/router";

type SignInProps = {
  csrfToken?: string;
};

export default function SignIn({ csrfToken }: SignInProps) {
  const router = useRouter();
  const { error } = router.query;

  return (
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
          <FormControl label="メールアドレス" mb="md">
            <Input name="email" type="email" variant="flushed" />
          </FormControl>
          <FormControl label="パスワード" mb="md">
            <Input name="password" type="password" variant="flushed" />
          </FormControl>
          <Button type="submit" mb="md" colorScheme="primary" variant="outline">
            サインイン
          </Button>
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
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
};
