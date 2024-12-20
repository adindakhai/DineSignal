import { NextResponse } from "next/server";
import { prisma } from "@/lib/prismadb";
import { getSession } from "next-auth/react";

export async function GET() {
  try {
    const session = await getSession(); // Retrieves the session
    console.log("SESSION", session);

    const userId = "";

    // Fetch user data from the database
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { name: true }, // Only fetch the name field
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Return the user's name
    return NextResponse.json({ name: user.name }, { status: 200 });
  } catch (error: unknown) {
    console.error("Error fetching user data:", error);

    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";

    return NextResponse.json(
      { error: "Internal server error", details: errorMessage },
      { status: 500 }
    );
  }
}
