import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import * as bcrypt from "bcrypt";
import { getSdk } from "@/graphql/graphql";
import { getGraphqlClient } from "@/libs/graphql-client";

export default NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: {
          label: "email",
          type: "email",
          placeholder: "メールアドレスを入力してください",
        },
        password: { label: "password", type: "password" },
      },

      async authorize(credentials) {
        const { email, password } = credentials;

        const user = (
          await getSdk(await getGraphqlClient()).getUserByEmail({
            email,
          })
        ).getUserByEmail;

        if (user && (await bcrypt.compare(password, user.password))) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },

  callbacks: {
    jwt: async ({ token, user, account }) => {
      if (user) {
        const { _password, userWithOutPassword } = user;
        token.user = userWithOutPassword;
        token.id = user.id;
      }
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    session: ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
        },
      };
    },
  },
});
