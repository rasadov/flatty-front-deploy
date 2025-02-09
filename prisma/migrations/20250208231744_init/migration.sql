-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "mobile" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "confirmPassword" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "serialNumber" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Agent" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "experience" TEXT NOT NULL,
    "specializations" TEXT[],
    "agency" TEXT NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL,
    "votes" INTEGER NOT NULL,
    "profileImage" TEXT NOT NULL,
    "agencyProfileLink" TEXT NOT NULL,

    CONSTRAINT "Agent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Apartment" (
    "id" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "rooms" INTEGER NOT NULL,
    "area" INTEGER NOT NULL,
    "currFloor" INTEGER NOT NULL,
    "building" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "images" TEXT[],
    "location" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "renovation" TEXT,
    "ceilingHeight" TEXT,
    "bathroom" TEXT,
    "furniture" TEXT[],
    "updated" TIMESTAMP(3),

    CONSTRAINT "Apartment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FeaturedProperty" (
    "id" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "images" TEXT[],
    "rooms" INTEGER NOT NULL,
    "area" INTEGER NOT NULL,
    "currFloor" INTEGER NOT NULL,
    "building" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "renovation" TEXT,
    "ceilingHeight" TEXT,
    "bathroom" TEXT,
    "furniture" TEXT[],
    "updated" TIMESTAMP(3),

    CONSTRAINT "FeaturedProperty_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PopularProperty" (
    "id" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "images" TEXT[],
    "rooms" INTEGER NOT NULL,
    "area" INTEGER NOT NULL,
    "currFloor" INTEGER NOT NULL,
    "building" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "renovation" TEXT,
    "ceilingHeight" TEXT,
    "bathroom" TEXT,
    "furniture" TEXT[],
    "updated" TIMESTAMP(3),

    CONSTRAINT "PopularProperty_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ComplexDetail" (
    "id" INTEGER NOT NULL,
    "category" TEXT,
    "buildingArea" TEXT,
    "livingArea" TEXT,
    "objects" INTEGER,
    "installment" TEXT,
    "completionYear" INTEGER,
    "propertyDescription" TEXT,
    "propertyUpdated" TIMESTAMP(3),
    "address" TEXT,
    "images" TEXT[],
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,

    CONSTRAINT "ComplexDetail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Post" (
    "id" SERIAL NOT NULL,
    "title" TEXT,
    "content" TEXT,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);
