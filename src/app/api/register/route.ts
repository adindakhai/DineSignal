import { NextResponse } from "next/server";
import { prisma } from "@/lib/prismadb";
import { hash } from "bcryptjs";

export async function POST(req: Request) {
  try {
    // Debugging untuk melihat request body
    const body = await req.json();
    console.log("Request body received:", body);

    const { name, email, password } = body;

    // Validasi input
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Name, email, and password are required" },
        { status: 400 }
      );
    }

    // Cek apakah user sudah ada di database
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      console.log("User with email already exists:", email);
      return NextResponse.json(
        { error: "Email already in use" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await hash(password, 12);
    console.log("Password hashed successfully");

    // Simpan user baru
    const user = await prisma.user.create({
      data: {
        name,
        email,
        hashedPassword,
      },
    });

    console.log("User created successfully:", user);

    // Berikan respons JSON
    return NextResponse.json(
      { message: "User created successfully", user },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Internal server error:", error);

    // Pastikan selalu merespons dalam format JSON
    return NextResponse.json(
      { error: "Internal server error", details: error.message || error },
      { status: 500 }
    );
  }
}
