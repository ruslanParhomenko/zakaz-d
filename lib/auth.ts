import GoogleProvider from "next-auth/providers/google";
import type { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],

  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/signin",
  },

  debug: true,

  callbacks: {
    async jwt({ token, account, profile }) {
      if (account && profile) {
        const users = ["parhomenkogm@gmail.com"];

        const dbUser = users.find((u) => u === profile.email);

        if (dbUser) {
          token.role = "ADMIN";
        } else {
          token.role = "OBSERVER";
        }
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        (session.user as any).role = token.role || "OBSERVER";
      }
      return session;
    },
  },
};
