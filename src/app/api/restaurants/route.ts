import { NextRequest, NextResponse } from "next/server";
import prisma from "prisma/prisma";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const cuisine = searchParams.get("cuisine") || undefined;
  const priceRange = searchParams.get("priceRange")?.split("-").map(Number);
  const city = searchParams.get("city") || undefined;
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = 20;
  const offset = (page - 1) * limit;

  try {
    // Fetching filtered restaurants with pagination
    const restaurants = await prisma.restaurants.findMany({
      where: {
        cuisines: cuisine ? { contains: cuisine, mode: "insensitive" } : undefined,
        average_cost: priceRange
          ? { gte: priceRange[0], lte: priceRange[1] }
          : undefined,
        city: city ? { contains: city, mode: "insensitive" } : undefined,
      },
      skip: offset,
      take: limit,
    });

    // Counting the total restaurants that match the filters
    const totalCount = await prisma.restaurants.count({
      where: {
        cuisines: cuisine ? { contains: cuisine, mode: "insensitive" } : undefined,
        average_cost: priceRange
          ? { gte: priceRange[0], lte: priceRange[1] }
          : undefined,
        city: city ? { contains: city, mode: "insensitive" } : undefined,
      },
    });

    // Returning the filtered data
    return NextResponse.json(
      {
        restaurants,
        totalPages: Math.ceil(totalCount / limit),
        currentPage: page,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    return NextResponse.json(
      { message: "Failed to fetch restaurants" },
      { status: 500 }
    );
  }
}
