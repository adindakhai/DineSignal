-- CreateTable
CREATE TABLE "restaurants" (
    "id" SERIAL NOT NULL,
    "restaurant_id" INTEGER NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "city" VARCHAR(100),
    "address" TEXT,
    "locality" VARCHAR(100),
    "longitude" DOUBLE PRECISION,
    "latitude" DOUBLE PRECISION,
    "cuisines" VARCHAR(255),
    "average_cost" INTEGER,
    "aggregate_rating" DOUBLE PRECISION,
    "votes" INTEGER,

    CONSTRAINT "restaurants_pkey" PRIMARY KEY ("id")
);
