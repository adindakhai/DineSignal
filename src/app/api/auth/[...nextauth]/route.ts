// src/app/api/auth/[...nextauth]/route.ts

import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/prismadb";
import { compare } from "bcryptjs";

// Definisikan authOptions di file terpisah jika diperlukan
const authOptions: AuthOptions = {
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
        return user; // Ini akan menyertakan objek user dalam payload JWT
      },
    }),
  ],
  session: {
    strategy: "jwt", // Gunakan JWT untuk penanganan sesi
  },
  callbacks: {
    async jwt({ token, user }) {
      // Tambahkan klaim kustom ke token
      if (user) {
        token.id = user.id; // Tambahkan ID pengguna ke token
        token.name = user.name; // Sertakan nama pengguna
        token.email = user.email; // Sertakan email pengguna
      }
      return token;
    },
    async session({ session, token }) {
      // Lampirkan informasi token ke objek sesi
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
    secret: process.env.JWT_SECRET, // Gunakan kunci rahasia yang aman dari file .env Anda
    maxAge: 60 * 60 * 24 * 7, // Token berlaku selama 7 hari
  },
  debug: true, // Aktifkan mode debug
};

// Inisialisasi handler NextAuth
const handler = NextAuth(authOptions);

// Ekspor hanya metode GET dan POST
export { handler as GET, handler as POST };
