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
        return user;
      },
    }),
  ],
  debug: true, // Aktifkan debug mode
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
