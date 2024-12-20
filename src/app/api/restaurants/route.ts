import { NextRequest, NextResponse } from "next/server";
import prisma from "prisma/prisma";

function haversineDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371; // radius bumi dalam km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) *
      Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const cuisine = searchParams.get("cuisine") || undefined;
  const priceRange = searchParams.get("priceRange")?.split("-").map(Number);
  const distance = searchParams.get("distance") ? Number(searchParams.get("distance")) : undefined;
  const userLat = searchParams.get("userLatitude") ? Number(searchParams.get("userLatitude")) : undefined;
  const userLon = searchParams.get("userLongitude") ? Number(searchParams.get("userLongitude")) : undefined;
  const page = parseInt(searchParams.get("page") || "1", 10);
  const searchTerm = searchParams.get("searchTerm") || undefined;

  const limit = 20;

  try {
    // Build where clause
    let whereClause: any = {};

    if (cuisine) {
      whereClause.cuisines = { contains: cuisine, mode: "insensitive" };
    }

    if (priceRange) {
      whereClause.average_cost = { gte: priceRange[0], lte: priceRange[1] };
    }

    // If we have a searchTerm, filter by city OR name
    if (searchTerm) {
      whereClause.OR = [
        { city: { contains: searchTerm, mode: "insensitive" } },
        { name: { contains: searchTerm, mode: "insensitive" } },
      ];
    }

    const allRestaurants = await prisma.restaurants.findMany({
      where: whereClause,
    });

    // Filter by distance if provided
    let filteredRestaurants = allRestaurants;
    if (distance && userLat !== undefined && userLon !== undefined) {
      filteredRestaurants = allRestaurants.filter((resto) => {
        if (resto.latitude == null || resto.longitude == null) return false;
        const dist = haversineDistance(userLat, userLon, resto.latitude, resto.longitude);
        return dist <= distance;
      });
    }

    const totalCount = filteredRestaurants.length;
    const totalPages = Math.ceil(totalCount / limit);

    // Pagination
    const offset = (page - 1) * limit;
    const paginatedRestaurants = filteredRestaurants.slice(offset, offset + limit);

    return NextResponse.json(
      {
        restaurants: paginatedRestaurants,
        totalPages: totalPages,
        currentPage: page,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    return NextResponse.json({ message: "Failed to fetch restaurants" }, { status: 500 });
  }
}
