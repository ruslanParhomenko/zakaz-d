import GoogleProvider from "next-auth/providers/google";
import type { NextAuthOptions } from "next-auth";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const USER_EMAIL = process.env.USER_EMAIL;
const USER_TEST_EMAIL = process.env.USER_TEST_EMAIL;

function getRole(email?: string | null): "ADMIN" | "USER" | null {
  if (!email) return null;
  if (email === ADMIN_EMAIL) return "ADMIN";
  if (email === USER_EMAIL) return "USER";
  if (email === USER_TEST_EMAIL) return "USER";
  return null;
}

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],

  session: { strategy: "jwt" },

  pages: { signIn: "/signin" },

  callbacks: {
    // async signIn({ profile }) {
    //   const p = profile as
    //     | { email?: string; email_verified?: boolean }
    //     | undefined;
    //   if (!p?.email_verified) return false;
    //   return getRole(p.email) !== null;
    // },

    async jwt({ token, account, profile }) {
      if (account && profile) {
        token.role = getRole(profile.email) ?? undefined;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as "ADMIN" | "USER" | undefined;
      }
      return session;
    },
  },
};
