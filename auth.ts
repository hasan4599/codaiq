import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";
import type { NextAuthOptions } from "next-auth";
import { getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import connectMongo from "./db/mongoose";
import { User } from "./model/user";
import bcrypt from "bcryptjs";

export const config = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectMongo();
        if (!credentials?.email || !credentials.password) return null;

        const user = await User.findOne({ email: credentials.email });
        if (user && await bcrypt.compare(credentials.password, user.password)) {
          return {
            id: user._id.toString(),
            email: user.email,
          };
        }
        return null;
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],

  callbacks: {
    // Save or find user in MongoDB on Google sign in
    async signIn({ user, account }) {
      if (account?.provider === "google" && user?.email) {
        await connectMongo();
        const existingUser = await User.findOne({ email: user.email });

        if (!existingUser) {
          const newUser = await User.create({
            fullName: user.name || "",
            email: user.email,
            password: "",
            role: "user",
            isActive: true,
            company: [],
            createdAt: new Date(),
            updatedAt: new Date(),
            avatarUrl: user.image
          });
          user.id = newUser._id.toString(); // attach MongoDB _id
        } else {
          user.id = existingUser._id.toString(); // attach MongoDB _id
        }
      }

      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id; // Make sure it's MongoDB _id, not Google ID
        token.email = user.email;
      }
      return token;
    },

    async session({ session, token }) {
      return {
        ...session,
        user: {
          id: token.id,       // MongoDB _id here
          email: token.email,
        },
      };
    },

    async redirect({ baseUrl }) {
      return baseUrl;
    },
  },

  pages: {
    signIn: "/auth/signin",
  },
} satisfies NextAuthOptions;

// Use it in server contexts
export function auth(
  ...args:
    | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  return getServerSession(...args, config);
}
