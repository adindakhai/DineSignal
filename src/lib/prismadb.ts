import { PrismaClient } from "@prisma/client";

// Tambahkan tipe ke globalThis
interface CustomNodeJsGlobal {
  prisma: PrismaClient | undefined;
}

declare const globalThis: CustomNodeJsGlobal;

// Gunakan prisma instance tunggal
const prisma = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = prisma;
}

export { prisma };
