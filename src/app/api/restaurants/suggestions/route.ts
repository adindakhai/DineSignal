// src/app/api/restaurants/suggestions/route.ts

import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma/prisma";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query")?.trim().toLowerCase();

  if (!query) {
    return NextResponse.json([], { status: 200 });
  }

  try {
    // Fetch matching restaurant names
    const matchingNames = await prisma.restaurants.findMany({
      where: {
        name: {
          contains: query,
          mode: "insensitive",
        },
      },
      select: { name: true },
      take: 5,
    });

    // Fetch matching cities
    const matchingCities = await prisma.restaurants.findMany({
      where: {
        city: {
          contains: query,
          mode: "insensitive",
        },
      },
      select: { city: true },
      distinct: ["city"],
      take: 5,
    });

    // Combine and deduplicate suggestions
    const nameSuggestions = matchingNames.map((item) => item.name);
    const citySuggestions = matchingCities.map((item) => item.city).filter(Boolean);
    const combinedSuggestions = Array.from(new Set([...nameSuggestions, ...citySuggestions])).slice(0, 10);

    return NextResponse.json(combinedSuggestions, { status: 200 });
  } catch (error) {
    console.error("Error fetching suggestions:", error);
    return NextResponse.json({ message: "Failed to fetch suggestions" }, { status: 500 });
  }
}
