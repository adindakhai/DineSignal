import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma/prisma";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const restaurant = await prisma.restaurants.findUnique({
      where: { id: parseInt(params.id, 10) },
    });

    if (!restaurant) {
      return NextResponse.json({ message: "Restaurant not found" }, { status: 404 });
    }

    return NextResponse.json(restaurant, { status: 200 });
  } catch (error) {
    console.error("Error fetching restaurant:", error);
    return NextResponse.json({ message: "Failed to fetch restaurant" }, { status: 500 });
  }
}
