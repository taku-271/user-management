import { useCreateUser } from "@/features/auths/store";
import {
  Box,
  Text,
  Button,
  FormControl,
  Input,
  Heading,
} from "@yamada-ui/react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";

const SignUp = () => {
  const initUser = {
    name: "",
    email: "",
    password: "",
  };

  const router = useRouter();
  const { error } = router.query;
  const [user, setUser] = useState(initUser);
  const { createUser } = useCreateUser();

  const onChangeUser = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await createUser({
        ...user,
        isAdmin: false,
      });

      await signIn("credentials", {
        email: user.email,
        password: user.password,
        callbackUrl: "/",
      }).then((res) => {
        if (res?.error) {
          console.error(error);
          throw new Error("ログインに失敗しました");
        }
      });
    } catch (error) {
      console.error(error);
      throw new Error("ログインに失敗しました");
    }
  };

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
        <form method="post" onSubmit={(e) => onSubmit(e)}>
          <Heading as="h1" mb="lg">
            新規登録
          </Heading>
          <FormControl label="メールアドレス" mb="md">
            <Input
              name="email"
              type="email"
              variant="flushed"
              value={user.email}
              onChange={(e) => onChangeUser(e)}
            />
          </FormControl>
          <FormControl label="氏名" mb="md">
            <Input
              name="name"
              type="text"
              variant="flushed"
              value={user.name}
              onChange={(e) => onChangeUser(e)}
            />
          </FormControl>
          <FormControl label="パスワード" mb="md">
            <Input
              name="password"
              type="password"
              variant="flushed"
              value={user.password}
              onChange={(e) => onChangeUser(e)}
            />
          </FormControl>
          <Box display="flex" justifyContent="space-between">
            <Button type="submit" mb="md" colorScheme="primary" variant="solid">
              新規登録
            </Button>
            <Button
              type="button"
              mb="md"
              colorScheme="primary"
              variant="outline"
              onClick={() => router.push("/auth/signin")}
            >
              ログイン
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

export default SignUp;
