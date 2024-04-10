import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { authenticateUser } from "@/utils/actions";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "Cecilio",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const data = await authenticateUser({
            username: credentials?.username,
            password: credentials?.password,
          });

          if (!data) {
            throw new Error("Login failed");
          } else {
            return {
              jwt: data.token,
              email: credentials?.username,
              name: credentials?.username,
            };
          }
        } catch (error) {
          console.log(error);
          throw new Error("Login failed");
        }
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        return {
          ...token,
          jwt: user.jwt,
        };
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (token) {
        session.jwt = token.jwt;
      }
      return session;
    },
  },

  pages: {
    signIn: "/login",
  },
};
export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
