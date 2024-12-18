import { NextResponse } from "next/server";
import { prisma } from "@/lib/prismadb";
import { getSession } from "next-auth/react"

export async function GET(req: Request, res: Response) {
  try {
    const session = await getSession(); // Retrieves the session
    console.log("SESSION", session)

    // if (!token) {
    //   return NextResponse.json(
    //     { error: "Unauthorized, token missing" },
    //     { status: 401 }
    //   );
    // }

    // // Extract user ID from the token payload
    // const { sub: userId } = token; // `sub` contains the user ID in NextAuth tokens
    // if (!userId) {
    //   return NextResponse.json(
    //     { error: "Invalid token payload" },
    //     { status: 401 }
    //   );
    // }
    const userId = ""

    // Fetch user data from the database
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { name: true }, // Only fetch the name field
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Return the user's name
    return NextResponse.json({ name: user.name }, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching user data:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error.message || error },
      { status: 500 }
    );
  }
}
