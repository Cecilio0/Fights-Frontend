import NextAuth, { type DefaultSession } from "next-auth";
import { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authenticateUser } from "./utils/actions";
import jwt from "jsonwebtoken";

declare module "next-auth" {
  interface User {
    username: string;
    jwt: string;
  }

  interface Session {
    accessToken: string;
    expires: Date;
    isExpired: boolean;
    user: {
      username: string;
      accessToken: string;
    } & DefaultSession["user"];
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        const decodedJwt = jwt.decode(user.jwt);
        if (decodedJwt && typeof decodedJwt !== "string") {
          token.exp = decodedJwt.exp;
        }
        return {
          ...token,
          accessToken: user.jwt,
        };
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (token) {
        session.accessToken = token.accessToken;
        const decodedJwt = jwt.decode(session.accessToken);
        if (decodedJwt && typeof decodedJwt !== "string") {
          session.expires = decodedJwt.exp
            ? new Date(decodedJwt.exp * 1000)
            : new Date();
        }

        if (Date.now() >= session.expires) {
          session.isExpired = true;
        }
      }
      return {
        ...session,
        user: {
          ...session.user,
        },
      };
    },
  },

  providers: [
    Credentials({
      credentials: {
        username: {},
        password: {},
      },
      authorize: async (credentials) => {
        try {
          const data = await authenticateUser({
            username: credentials?.username as string,
            password: credentials?.password as string,
          });

          if (!data) {
            throw new CredentialsSignin("Authentication failed");
          } else {
            return {
              jwt: data.token,
              name: credentials?.username as string,
            };
          }
        } catch (error) {
          throw new CredentialsSignin("Authentication failed");
        }
      },
    }),
  ],

  pages: {
    signIn: "/login",
  },

  session: {
    strategy: "jwt",
  },
});
