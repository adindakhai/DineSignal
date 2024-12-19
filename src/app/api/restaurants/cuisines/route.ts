import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma/prisma";

export async function GET(req: NextRequest) {
  try {
    const cuisines = await prisma.restaurants.findMany({
      select: { cuisines: true },
      distinct: ["cuisines"], // Mengambil nilai unik
    });

    // Membersihkan hasil untuk memastikan tidak ada nilai kosong atau null
    const filteredCuisines = cuisines
      .map((item) => item.cuisines)
      .filter((cuisine) => cuisine !== null && cuisine !== undefined);

    return NextResponse.json(filteredCuisines, { status: 200 });
  } catch (error) {
    console.error("Error fetching cuisines:", error);
    return NextResponse.json({ message: "Failed to fetch cuisines" }, { status: 500 });
  }
}
