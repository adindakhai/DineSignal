import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/prismadb";
import { compare } from "bcryptjs";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log("Incoming login request:", credentials);

        if (!credentials?.email || !credentials?.password) {
          console.log("Missing email or password");
          throw new Error("Email dan password dibutuhkan");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) {
          console.log("User not found:", credentials.email);
          throw new Error("User tidak ditemukan");
        }

        const isPasswordCorrect = await compare(
          credentials.password,
          user.hashedPassword || ""
        );

        if (!isPasswordCorrect) {
          console.log("Password mismatch for user:", credentials.email);
          throw new Error("Password salah");
        }

        console.log("User logged in successfully:", user);
        return user; // This will include the user object in the JWT payload
      },
    }),
  ],
  session: {
    strategy: "jwt", // Use JWT for session handling
  },
  callbacks: {
    async jwt({ token, user }) {
      // Add custom claims to the token
      if (user) {
        token.id = user.id; // Add the user ID to the token
        token.name = user.name; // Include the user's name
        token.email = user.email; // Include the user's email
      }
      return token;
    },
    async session({ session, token }) {
      // Attach the token's information to the session object
      if (token) {
        session.user = {
          name: token.name,
          email: token.email,
        };
      }
      return session;
    },
  },
  jwt: {
    secret: process.env.JWT_SECRET, // Use a secure secret key from your .env file
    maxAge: 60 * 60 * 24 * 7, // Token valid for 7 days
  },
  debug: true, // Enable debug mode
};

// Handler untuk App Router
import { NextApiHandler } from "next";

const handler: NextApiHandler = NextAuth(authOptions);

// Ekspor handler untuk metode HTTP
export const GET = handler;
export const POST = handler;
