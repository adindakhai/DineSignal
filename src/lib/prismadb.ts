import { PrismaClient } from "@prisma/client";

// Deklarasikan tipe untuk properti `prisma` di `globalThis`
declare global {
  namespace NodeJS {
    interface Global {
      prisma?: PrismaClient;
    }
  }
}

const globalForPrisma = global as typeof global & { prisma?: PrismaClient };

// Gunakan global instance Prisma untuk menghindari masalah saat pengembangan (Next.js hot reload)
export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
