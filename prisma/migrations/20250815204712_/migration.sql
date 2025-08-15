/*
  Warnings:

  - You are about to drop the `Registration` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `password` on the `Trips` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Registration_email_idx";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Registration";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Profile" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "email" TEXT NOT NULL,
    "fName" TEXT,
    "lName" TEXT,
    "churchName" TEXT,
    "dob" DATETIME,
    "street" TEXT,
    "city" TEXT,
    "state" TEXT,
    "postal" TEXT,
    "phone" TEXT
);

-- CreateTable
CREATE TABLE "TripRegistration" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "registrationType" TEXT NOT NULL DEFAULT 'INDIVIDUAL'
);

-- CreateTable
CREATE TABLE "_ProfileTripRegistration" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_ProfileTripRegistration_A_fkey" FOREIGN KEY ("A") REFERENCES "Profile" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_ProfileTripRegistration_B_fkey" FOREIGN KEY ("B") REFERENCES "TripRegistration" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Trips" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "fName" TEXT,
    "lName" TEXT,
    "dob" DATETIME,
    "street" TEXT,
    "city" TEXT,
    "state" TEXT,
    "postal" TEXT,
    "phone" TEXT,
    "cName" TEXT,
    "pName" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Trips" ("cName", "city", "createdAt", "dob", "email", "fName", "id", "lName", "pName", "phone", "postal", "state", "street", "updatedAt") SELECT "cName", "city", "createdAt", "dob", "email", "fName", "id", "lName", "pName", "phone", "postal", "state", "street", "updatedAt" FROM "Trips";
DROP TABLE "Trips";
ALTER TABLE "new_Trips" RENAME TO "Trips";
CREATE INDEX "Trips_email_idx" ON "Trips"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "_ProfileTripRegistration_AB_unique" ON "_ProfileTripRegistration"("A", "B");

-- CreateIndex
CREATE INDEX "_ProfileTripRegistration_B_index" ON "_ProfileTripRegistration"("B");
