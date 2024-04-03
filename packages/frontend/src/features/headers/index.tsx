import {
  Box,
  Button,
  Heading,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
} from "@yamada-ui/react";
import { Icon as FontAwesomeIcon } from "@yamada-ui/fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";

type HeaderPropsType = {
  height: string;
};

export const Header = ({ height }: HeaderPropsType) => {
  const { status } = useSession();
  const router = useRouter();

  return (
    <header style={{ height }}>
      <Box
        h="100%"
        py="md"
        px="lg"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        borderBottom=".5px solid #bbb"
      >
        <Heading as="h1" fontWeight="normal" fontSize="2xl">
          ユーザー認証
        </Heading>
        <Menu>
          <MenuButton
            as={IconButton}
            icon={<FontAwesomeIcon icon={faBars}></FontAwesomeIcon>}
            variant="ghost"
            size="lg"
          />
          <MenuList>
            {status === "authenticated" && (
              <>
                <MenuGroup title="link">
                  <MenuItem py="0">
                    <Button
                      p="0"
                      w="100%"
                      variant="unstyled"
                      onClick={() => router.push("/")}
                      fontWeight="normal"
                    >
                      ホーム
                    </Button>
                  </MenuItem>
                  <MenuItem py="0">
                    <Button
                      p="0"
                      w="100%"
                      variant="unstyled"
                      onClick={() => {
                        location.href = "http://localhost:3002/";
                      }}
                      fontWeight="normal"
                    >
                      家計簿
                    </Button>
                  </MenuItem>
                </MenuGroup>

                <MenuDivider />

                <MenuGroup title="account">
                  <MenuItem py="0">
                    <Button
                      p="0"
                      w="100%"
                      variant="unstyled"
                      colorScheme="gray"
                      onClick={() => signOut()}
                      fontWeight="normal"
                    >
                      サインアウト
                    </Button>
                  </MenuItem>
                </MenuGroup>
              </>
            )}
            {status === "unauthenticated" && (
              <>
                <MenuGroup title="account">
                  <MenuItem py="0">
                    <Button
                      p="0"
                      w="100%"
                      variant="unstyled"
                      onClick={() => router.push("/auth/signin")}
                      fontWeight="normal"
                    >
                      ログイン
                    </Button>
                  </MenuItem>
                  <MenuItem py="0">
                    <Button
                      p="0"
                      w="100%"
                      variant="unstyled"
                      onClick={() => router.push("/auth/signup")}
                      fontWeight="normal"
                    >
                      新規登録
                    </Button>
                  </MenuItem>
                </MenuGroup>
              </>
            )}
          </MenuList>
        </Menu>
      </Box>
    </header>
  );
};
