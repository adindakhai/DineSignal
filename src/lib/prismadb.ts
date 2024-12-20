import { PrismaClient } from "@prisma/client";

// Deklarasikan tipe untuk properti `prisma` di `globalThis`
declare global {
  var prisma: PrismaClient | undefined;
}

// Gunakan global instance Prisma untuk menghindari masalah saat pengembangan (Next.js hot reload)
export const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") global.prisma = prisma;
