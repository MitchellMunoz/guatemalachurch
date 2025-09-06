/*
  Warnings:

  - You are about to drop the column `createdAt` on the `TripRegistration` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `TripRegistration` table. All the data in the column will be lost.
  - Added the required column `code` to the `Trip` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Trip" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "code" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "title" TEXT NOT NULL,
    "churchName" TEXT,
    "location" TEXT,
    "startDate" DATETIME NOT NULL,
    "endDate" DATETIME NOT NULL,
    "groupSize" INTEGER,
    "description" TEXT,
    "tripId" TEXT NOT NULL,
    "createdByEmail" TEXT NOT NULL,
    "createdByRole" TEXT NOT NULL DEFAULT 'PARTICIPANT',
    CONSTRAINT "Trip_createdByEmail_fkey" FOREIGN KEY ("createdByEmail") REFERENCES "user" ("email") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Trip" ("churchName", "createdAt", "createdByEmail", "createdByRole", "description", "endDate", "groupSize", "id", "location", "startDate", "title", "tripId", "updatedAt") SELECT "churchName", "createdAt", "createdByEmail", "createdByRole", "description", "endDate", "groupSize", "id", "location", "startDate", "title", "tripId", "updatedAt" FROM "Trip";
DROP TABLE "Trip";
ALTER TABLE "new_Trip" RENAME TO "Trip";
CREATE UNIQUE INDEX "Trip_code_key" ON "Trip"("code");
CREATE INDEX "Trip_createdByEmail_idx" ON "Trip"("createdByEmail");
CREATE TABLE "new_TripRegistration" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "registrationType" TEXT NOT NULL DEFAULT 'PARTICIPANT',
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
INSERT INTO "new_TripRegistration" ("city", "dob", "id", "phone", "postal", "primaryContact", "registrantId", "registrationType", "state", "street", "tripId") SELECT "city", "dob", "id", "phone", "postal", "primaryContact", "registrantId", "registrationType", "state", "street", "tripId" FROM "TripRegistration";
DROP TABLE "TripRegistration";
ALTER TABLE "new_TripRegistration" RENAME TO "TripRegistration";
CREATE INDEX "TripRegistration_tripId_idx" ON "TripRegistration"("tripId");
CREATE INDEX "TripRegistration_registrantId_idx" ON "TripRegistration"("registrantId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
