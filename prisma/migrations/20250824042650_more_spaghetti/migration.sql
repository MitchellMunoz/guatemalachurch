/*
  Warnings:

  - You are about to drop the column `createdByRole` on the `Trip` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Trip" (
    "id" TEXT NOT NULL PRIMARY KEY,
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
    CONSTRAINT "Trip_createdByEmail_fkey" FOREIGN KEY ("createdByEmail") REFERENCES "user" ("email") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Trip" ("churchName", "createdAt", "createdByEmail", "description", "endDate", "groupSize", "id", "location", "startDate", "title", "tripId", "updatedAt") SELECT "churchName", "createdAt", "createdByEmail", "description", "endDate", "groupSize", "id", "location", "startDate", "title", "tripId", "updatedAt" FROM "Trip";
DROP TABLE "Trip";
ALTER TABLE "new_Trip" RENAME TO "Trip";
CREATE INDEX "Trip_createdByEmail_idx" ON "Trip"("createdByEmail");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
