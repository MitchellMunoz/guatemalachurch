/*
  Warnings:

  - Made the column `tripId` on table `TripRegistration` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_TripRegistration" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "registrationType" TEXT NOT NULL DEFAULT 'INDIVIDUAL',
    "tripId" TEXT NOT NULL,
    CONSTRAINT "TripRegistration_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "Trip" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_TripRegistration" ("createdAt", "id", "registrationType", "tripId", "updatedAt") SELECT "createdAt", "id", "registrationType", "tripId", "updatedAt" FROM "TripRegistration";
DROP TABLE "TripRegistration";
ALTER TABLE "new_TripRegistration" RENAME TO "TripRegistration";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
