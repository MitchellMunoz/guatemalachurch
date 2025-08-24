/*
  Warnings:

  - You are about to drop the `Trips` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `fName` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `lName` on the `Profile` table. All the data in the column will be lost.
  - Added the required column `createdByEmail` to the `Trip` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdByRole` to the `Trip` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Trip` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tripId` to the `Trip` table without a default value. This is not possible if the table is not empty.
  - Added the required column `primaryContact` to the `TripRegistration` table without a default value. This is not possible if the table is not empty.
  - Added the required column `registrantId` to the `TripRegistration` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Trips_email_idx";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Trips";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Profile" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "email" TEXT NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "churchName" TEXT,
    "dob" DATETIME,
    "street" TEXT,
    "city" TEXT,
    "state" TEXT,
    "postal" TEXT,
    "phone" TEXT
);
INSERT INTO "new_Profile" ("churchName", "city", "createdAt", "dob", "email", "id", "phone", "postal", "state", "street", "updatedAt") SELECT "churchName", "city", "createdAt", "dob", "email", "id", "phone", "postal", "state", "street", "updatedAt" FROM "Profile";
DROP TABLE "Profile";
ALTER TABLE "new_Profile" RENAME TO "Profile";
CREATE TABLE "new_Trip" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "title" TEXT NOT NULL,
    "churchName" TEXT,
    "location" TEXT,
    "startDate" DATETIME NOT NULL,
    "endDate" DATETIME NOT NULL,
    "groupSize" INTEGER NOT NULL,
    "description" TEXT,
    "tripId" TEXT NOT NULL,
    "createdByRole" TEXT NOT NULL,
    "createdByEmail" TEXT NOT NULL,
    CONSTRAINT "Trip_createdByEmail_fkey" FOREIGN KEY ("createdByEmail") REFERENCES "user" ("email") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Trip" ("createdAt", "endDate", "groupSize", "id", "startDate", "updatedAt") SELECT "createdAt", "endDate", "groupSize", "id", "startDate", "updatedAt" FROM "Trip";
DROP TABLE "Trip";
ALTER TABLE "new_Trip" RENAME TO "Trip";
CREATE INDEX "Trip_createdByEmail_idx" ON "Trip"("createdByEmail");
CREATE INDEX "Trip_createdByRole_idx" ON "Trip"("createdByRole");
CREATE TABLE "new_TripRegistration" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "registrationType" TEXT NOT NULL DEFAULT 'INDIVIDUAL',
    "tripId" TEXT NOT NULL,
    "registrantId" TEXT NOT NULL,
    "primaryContact" TEXT NOT NULL,
    "dob" DATETIME,
    "street" TEXT,
    "city" TEXT,
    "state" TEXT,
    "postal" TEXT,
    "phone" TEXT,
    CONSTRAINT "TripRegistration_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "Trip" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "TripRegistration_registrantId_fkey" FOREIGN KEY ("registrantId") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_TripRegistration" ("createdAt", "id", "registrationType", "tripId", "updatedAt") SELECT "createdAt", "id", "registrationType", "tripId", "updatedAt" FROM "TripRegistration";
DROP TABLE "TripRegistration";
ALTER TABLE "new_TripRegistration" RENAME TO "TripRegistration";
CREATE INDEX "TripRegistration_tripId_idx" ON "TripRegistration"("tripId");
CREATE INDEX "TripRegistration_registrantId_idx" ON "TripRegistration"("registrantId");
CREATE TABLE "new_user" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT,
    "firstName" TEXT,
    "lastName" TEXT,
    "email" TEXT NOT NULL,
    "emailVerified" BOOLEAN NOT NULL,
    "image" TEXT,
    "role" TEXT NOT NULL DEFAULT 'COORDINATOR',
    "createdAt" DATETIME NOT NULL,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_user" ("createdAt", "email", "emailVerified", "firstName", "id", "image", "lastName", "name", "role", "updatedAt") SELECT "createdAt", "email", "emailVerified", "firstName", "id", "image", "lastName", "name", "role", "updatedAt" FROM "user";
DROP TABLE "user";
ALTER TABLE "new_user" RENAME TO "user";
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
