// File: src/app/api/profile/route.ts

import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../prisma/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import { hash } from "bcryptjs";

export async function PATCH(req: NextRequest) {
  // Authenticate the request
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.email) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const { name, email, password } = await req.json();

    // Validate input
    if (!name || !email) {
      return NextResponse.json(
        { message: "Name and email are required" },
        { status: 400 }
      );
    }

    // Check if the new email is already in use by another user
    if (email !== session.user.email) {
      const emailExists = await prisma.user.findUnique({
        where: { email },
      });

      if (emailExists) {
        return NextResponse.json(
          { message: "Email is already in use" },
          { status: 400 }
        );
      }
    }

    // Prepare data to update
    const dataToUpdate: any = {
      name,
      email,
    };

    if (password) {
      const hashedPassword = await hash(password, 12);
      dataToUpdate.hashedPassword = hashedPassword;
    }

    // Update the user in the database
    const updatedUser = await prisma.user.update({
      where: { email: session.user.email },
      data: dataToUpdate,
    });

    return NextResponse.json(
      { message: "Profile updated successfully", user: updatedUser },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error updating profile:", error);

    // Handle Prisma unique constraint violation for email
    if (error.code === "P2002" && error.meta?.target?.includes("email")) {
      return NextResponse.json(
        { message: "Email is already in use" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "Failed to update profile" },
      { status: 500 }
    );
  }
}
